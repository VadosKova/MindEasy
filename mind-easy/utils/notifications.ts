import * as Notifications from 'expo-notifications';

export interface Reminder {
  id: string;
  title: string;
  hour: number;
  minute: number;
  enabled: boolean;
}

export async function requestNotificationPermission() {
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
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (!notificationsEnabled) return;

  for (const reminder of reminders) {
    await scheduleDailyNotification(reminder);
  }
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}