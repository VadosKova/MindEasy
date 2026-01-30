import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
