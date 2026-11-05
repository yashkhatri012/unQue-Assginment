import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';


import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { useEffect } from "react";
import { connectSocket, socket } from "../services/socket";



export default function HomeScreen() {
  useEffect(() => {
  connectSocket();
  socket.on("new-lead", (lead) => {
  console.log("New lead received:", lead);
});
  return () => {
    socket.off("new-lead");
    socket.disconnect();
  };
}, []);
  return (
    <ThemedView >
      <ThemedText type="title">Welcome to unQue Leads!</ThemedText>
      <ThemedText  themeColor="textSecondary">
        This is a starter app for building React Native apps with Expo.
      </ThemedText>
      <ThemedText themeColor="textSecondary">
        Device: {Device.modelName} ({Platform.OS})
      </ThemedText>
    </ThemedView>
  );
}

