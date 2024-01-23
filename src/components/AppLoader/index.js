import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostAction } from "../../redux/postSlice";
import * as database from "../../database";
import Tasks from "../Tasks/Tasks";
import Form from "../Form/Form";
//icon import
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../Settings/Settings";

const Tab = createBottomTabNavigator();

const AppLoader = () => {

  const { post, } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const readData = async () => {
    const result = await database.load();
    dispatch(getPostAction(result));
  };   
  useEffect(() => {
    readData();
  }, []);
  return  (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "List") {
        iconName = 'text-document'
      } else if (route.name === "Add") {
        iconName = 'add-to-list'
      }
      else if (route.name === "Settings") {
        iconName = 'bell'
      }
      // Add icons for other screens

      return <Entypo name={iconName} size={size} color={color} />;

    },
    headerShown: false,
  })}
>
  <Tab.Screen name="List">
    {(props) => (
      <Tasks
        {...props}
        tasks={post}
      
      />
    )}
  </Tab.Screen>
  <Tab.Screen name="Add">
    {(props) => <Form {...props}  />}
  </Tab.Screen>
  {/* Add other screens as needed */}

  {/* lab5 */}
  <Tab.Screen name="Settings">
    {(props) => <Settings {...props}  />}
  </Tab.Screen>

</Tab.Navigator>);
};

export default AppLoader;
