import bcrypt from "bcryptjs";
import Users from "../models/Users.js";

export const createAdminIfNotExists = async () => {
  const email = "admin@gmail.com";

  const existing = await Users.findOne({ email });
  if (existing) return;

  const hashedPassword = await bcrypt.hash("1234", 10);

  await Users.create({
    username: "admin",
    email,
    password: hashedPassword,
  });

  console.log("Admin created");
};