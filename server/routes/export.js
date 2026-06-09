import express from "express";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import User from "../models/Users.js";
import Mood from "../models/Mood.js";
import JournalEntry from "../models/JournalEntry.js";
import Meditation from "../models/Meditation.js";
import ReportAnalysis from "../models/ReportAnalysis.js";
import nodemailer from "nodemailer";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/report", authMiddleware, async (req, res) => {
  try {
    const { recipientEmail, fromDate, toDate } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({ error: "recipientEmail is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const from = fromDate ? new Date(fromDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const to = toDate ? new Date(toDate) : new Date();

    const moods = await Mood.find({ userId: user._id, date: { $gte: from, $lte: to } }).sort({ date: 1 }).lean();
    const journals = await JournalEntry.find({ user: user._id, createdAt: { $gte: from, $lte: to } }).sort({ createdAt: 1 }).lean();
    const meditations = await Meditation.find({ user: user._id, createdAt: { $gte: from, $lte: to } }).lean();


    const reportsDir = path.resolve("uploads", "reports");
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

    const filename = `${user._id.toString()}-${Date.now()}.pdf`;
    const filepath = path.join(reportsDir, filename);

    const doc = new PDFDocument({ autoFirstPage: false });
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    doc.addPage({ size: 'A4', margin: 50 });
    doc.fontSize(20).text('Clinical Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Patient: ${user.username} <${user.email}>`, { align: 'center' });
    doc.moveDown();
    doc.text(`Report period: ${from.toDateString()} — ${to.toDateString()}`, { align: 'center' });

    const scores = moods.map(m => m.score || 0);
    const avg = scores.length ? (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(2) : 'N/A';
    doc.moveDown();
    doc.fontSize(14).text(`Average mood score: ${avg}`, { align: 'center' });

    const drawHeatmap = (doc, moods, from, to) => {
      const byDate = {};
      moods.forEach(m => { const d = new Date(m.date).toISOString().slice(0,10); byDate[d] = m.score || 0; });

      const colorFor = (score) => {
        switch (score) {
          case 1: return '#d73027';
          case 2: return '#fc8d59';
          case 3: return '#fee08b';
          case 4: return '#d9ef8b';
          case 5: return '#1a9850';
          default: return '#eeeeee';
        }
      };

      let cur = new Date(from.getFullYear(), from.getMonth(), 1);
      const end = new Date(to.getFullYear(), to.getMonth(), 1);
      while (cur <= end) {
        doc.addPage({ size: 'A4', margin: 50 });
        doc.fontSize(16).fillColor('black').text(`Mood Heatmap - ${cur.toLocaleString('default', { month: 'long', year: 'numeric' })}`, { underline: true });
        doc.moveDown(0.5);

        const cellSize = 18;
        const gap = 6;
        const startX = doc.page.margins.left;
        let x = startX;
        let y = doc.y + 10;

        const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        weekdays.forEach((wd, i) => {
          doc.fontSize(9).fillColor('#444').text(wd, x + i * (cellSize + gap), y - 12);
        });

        const year = cur.getFullYear();
        const month = cur.getMonth();
        const firstDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month+1, 0).getDate();

        let week = 0;
        for (let d = 1; d <= daysInMonth; d++) {
          const date = new Date(year, month, d);
          const col = date.getDay();
          const row = Math.floor((d + firstDay.getDay() - 1) / 7);
          const px = startX + col * (cellSize + gap);
          const py = y + row * (cellSize + gap);

          const key = date.toISOString().slice(0,10);
          const score = byDate[key] || 0;
          doc.rect(px, py, cellSize, cellSize).fill(colorFor(score));
          doc.fillColor('#000').fontSize(7).text(String(d), px+2, py+2);
          week = Math.max(week, row);
        }

        cur.setMonth(cur.getMonth()+1);
      }
    };

    drawHeatmap(doc, moods, from, to);

    const moodCounts = moods.reduce((acc, cur) => { acc[cur.mood] = (acc[cur.mood]||0)+1; return acc; }, {});
    doc.addPage({ size: 'A4', margin: 50 });
    doc.fontSize(16).fillColor('black').text('Trigger Analysis', { underline: true });
    doc.moveDown(0.5);
    Object.keys(moodCounts).forEach(k => {
      doc.fontSize(12).fillColor('black').text(`${k}: ${moodCounts[k]} occurrences`);
    });

    const analysis = await ReportAnalysis.findOne({ user: user._id }).sort({ createdAt: -1 }).lean();
    if (analysis && analysis.results) {
      doc.addPage({ size: 'A4', margin: 50 });
      doc.fontSize(16).fillColor('black').text('AI Journal Analysis (stored)', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).fillColor('black').text(`Journals analyzed: ${analysis.results.journalsCount || 0}`);
      doc.moveDown(0.3);
      doc.fontSize(12).text('Top tags:');
      const entries = Object.entries(analysis.results.tagCounts || {}).sort((a,b)=>b[1]-a[1]).slice(0,20);
      entries.forEach(([tag,count]) => {
        doc.fontSize(11).text(`- ${tag}: ${count}`);
      });
    }

    doc.addPage({ size: 'A4', margin: 50 });
    doc.fontSize(16).text('Journal Logs (strong emotions)', { underline: true });
    doc.moveDown(0.5);
    const strong = journals.filter(j => j.mood === 'low' || j.mood === 'great');
    if (strong.length === 0) {
      doc.fontSize(12).text('No high-intensity entries in the selected period.');
    } else {
      strong.forEach(entry => {
        doc.fontSize(12).text(`${new Date(entry.createdAt).toLocaleString()} — mood: ${entry.mood}`);
        if (entry.text) doc.fontSize(11).text(entry.text, { indent: 10 });
        doc.moveDown(0.3);
      });
    }

    doc.addPage({ size: 'A4', margin: 50 });
    doc.fontSize(16).text('Behavioral Metrics', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Completed meditations: ${meditations.length}`);
    doc.fontSize(11).fillColor('gray').text('Pomodoro sessions: data not available', { oblique: true });

    doc.addPage({ size: 'A4', margin: 50 });
    doc.fontSize(16).text("Therapist Notes", { underline: true });
    doc.moveDown(1);
    for (let i = 0; i < 12; i++) {
      doc.moveDown(0.5);
      doc.text('______________________________________________________________________');
    }

    doc.end();

    stream.on('finish', async () => {
      const downloadUrl = `${req.protocol}://${req.get('host')}/uploads/reports/${filename}`;

      const smtpHost = process.env.SMTP_HOST;
      if (smtpHost && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.FROM_EMAIL) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: recipientEmail,
            subject: 'MindEasy Clinical Report',
            text: 'Attached is the requested clinical report.',
            attachments: [
              { filename, path: filepath }
            ],
          });
        } catch (err) {
          console.error('Failed to send email:', err);
        }
      }

      return res.json({ url: downloadUrl, filename });
    });

    stream.on('error', err => {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create PDF' });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/dates', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const dates = await Mood.find({ userId: user._id }).distinct('date');
    const uniq = Array.from(new Set(dates.map(d => new Date(d).toISOString().slice(0,10)))).sort();
    return res.json({ dates: uniq });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
