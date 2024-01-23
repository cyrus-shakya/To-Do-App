import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, Button } from "react-native";
import * as Notifications from "expo-notifications";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    if (isEnabled) {
      // User unchecked the switch, cancel the notification
      cancelDailyNotification();
    } else {
      // User enabled the switch, request permissions and schedule the notification
      const permissions = await Notifications.getPermissionsAsync();
      if (!permissions.granted) {
        const request = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });

        console.log("request", request);
        if (!request.granted) {

          return;
        }
      }

      scheduleDailyNotification();
    }

    setIsEnabled((previousState) => !previousState);
  };

  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Reminder",
        body: "Don’t forget to complete your tasks today!",
      },
      trigger: { seconds: 5 },
    });
  };

  const cancelDailyNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return (
  <View>
    <Text style={styles.header}>Notifications:</Text>
    <View style={styles.container}>

   
      <Text style={styles.label}>Set Daily Reminder</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  }, 
   header: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft : 15
  },
});

export default Settings;