import * as Notifications from 'expo-notifications';

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
  id: string,
  title: string,
  body: string,
  hour: number,
  minute: number
) {
  await Notifications.cancelScheduledNotificationAsync(id);

  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title,
      body,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour,
      minute,
      repeats: true,
    },
  });
}

export async function syncReminders(
  enabled: boolean,
  reminders: string[]
) {
  for (const reminder of reminders) {
    await Notifications.cancelScheduledNotificationAsync(reminder);
  }

  if (!enabled) return;

  const reminderTimeMap: Record<string, { hour: number; minute: number }> = {
    Morning: { hour: 9, minute: 0 },
    Afternoon: { hour: 14, minute: 0 },
    Evening: { hour: 20, minute: 0 },
  };

  for (const reminder of reminders) {
    const time = reminderTimeMap[reminder];
    if (!time) continue;

    await scheduleDailyNotification(
      reminder,
      'MindEasy',
      `Time for your ${reminder.toLowerCase()} reminder 🌱`,
      time.hour,
      time.minute
    );
  }
}