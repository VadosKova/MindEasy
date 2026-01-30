import * as Notifications from 'expo-notifications';
import { scheduleDailyNotification } from '@/utils/notifications';

interface ReminderConfig {
  key: string;
  title: string;
  body: string;
  hour: number;
  minute: number;
}

const REMINDERS: Record<string, ReminderConfig> = {
  "Daily check-in": {
    key: 'daily-checkin',
    title: 'Daily check-in 🌿',
    body: 'How are you feeling today?',
    hour: 9,
    minute: 0,
  },
  "Meditation reminder": {
    key: 'meditation',
    title: 'Meditation time 🧘',
    body: 'Take a few minutes for yourself',
    hour: 20,
    minute: 0,
  },
};