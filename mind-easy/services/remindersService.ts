import { scheduleDailyNotification } from '@/utils/notifications';
import Constants from 'expo-constants';

type ExpoNotificationsModule = typeof import('expo-notifications');

function isExpoGo() {
  return Constants.appOwnership === 'expo';
}

async function getNotificationsModule() {
  if (isExpoGo()) {
    if (__DEV__) {
      console.warn(
        'expo-notifications is disabled in Expo Go. Use a development build to test notifications.'
      );
    }
    return null;
  }

  return (await import('expo-notifications')) as ExpoNotificationsModule;
}

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

export async function syncReminders(
  notificationsEnabled: boolean,
  reminders: string[]
) {
  const Notifications = await getNotificationsModule();
  if (!Notifications) return;

  if (!notificationsEnabled) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const reminder of reminders) {
    const config = REMINDERS[reminder];
    if (!config) continue;

    await scheduleDailyNotification(
      config.key,
      config.title,
      config.body,
      config.hour,
      config.minute
    );
  }
}
