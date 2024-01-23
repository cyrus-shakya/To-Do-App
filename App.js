// Author : Cyrus Shakya
// Student ID : 1157720

import styles from "./src/styles/main";
import uuid from "react-uuid";
import { useState , useEffect } from "react";
import Header from "./src/components/Header/Header";
import Tasks from "./src/components/Tasks/Tasks";
import Form from "./src/components/Form/Form";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import AppLoader from "./src/components/AppLoader";
import * as Notifications from "expo-notifications";

//icon import
import { Entypo } from "@expo/vector-icons";
// import navigation 
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { store } from "./src/redux/store";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      description: "Walk the dog",
      done: true,
    },
    {
      id: uuid(),
      description: "Wash the car",
      done: false,
    },
    {
      id: uuid(),
      description: "Finish the lab",
      done: false,
    },
  ]);

  const handleAddTask = (taskDescription, taskDone) => {
    const updatedTasks = [...tasks];
    updatedTasks.push({
      id: uuid(),
      description: taskDescription,
      done: taskDone,
    });
    setTasks(updatedTasks);
  };

  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleTaskRemoval = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  return (

      <Provider store={store}>
        <NavigationContainer style={styles.container}>
          <Header />
          <StatusBar style="auto" />

          <AppLoader>
          </AppLoader>

        </NavigationContainer>
      </Provider>
  
  );
}
