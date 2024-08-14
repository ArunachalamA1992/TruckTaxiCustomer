import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, {Component} from 'react';
// import { PushNotificationIOS } from "react-native";
import PushNotification from 'react-native-push-notification';
// var PushNotification = require("react-native-push-notification");
import messaging from '@react-native-firebase/messaging';
import {notificationListener} from './pushnotification_helper';

export const LocalNotification = () => {
  PushNotification.createChannel(
    {
      channelId: 'my-channel', // (required)
      channelName: 'My channel', // (required)
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );
  PushNotification.localNotification({
    channelId: 'my-channel',
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    date: new Date(new Date().getTime() + 3000),
  });
};
export default class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    notificationListener();
  }

  render() {
    return null;
  }
}
