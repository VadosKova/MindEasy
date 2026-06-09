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

export interface Reminder {
  id: string;
  title: string;
  hour: number;
  minute: number;
  enabled: boolean;
}

export async function requestNotificationPermission() {
  const Notifications = await getNotificationsModule();
  if (!Notifications) return false;

  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const { status: newStatus } =
      await Notifications.requestPermissionsAsync();

    return newStatus === 'granted';
  }

  return true;
}

export async function scheduleDailyNotification(
  reminder: Reminder
) {
  const Notifications = await getNotificationsModule();
  if (!Notifications) return;

  await Notifications.cancelScheduledNotificationAsync(reminder.id);

  if (!reminder.enabled) return;

  await Notifications.scheduleNotificationAsync({
    identifier: reminder.id,
    content: {
      title: 'MindEasy',
      body: reminder.title,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: reminder.hour,
      minute: reminder.minute,
      repeats: true,
    },
  });
}

export async function syncReminders(
  notificationsEnabled: boolean,
  reminders: Reminder[]
) {
  const Notifications = await getNotificationsModule();
  if (!Notifications) return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  if (!notificationsEnabled) return;

  for (const reminder of reminders) {
    await scheduleDailyNotification(reminder);
  }
}

export async function cancelAllNotifications() {
  const Notifications = await getNotificationsModule();
  if (!Notifications) return;

  await Notifications.cancelAllScheduledNotificationsAsync();
}
