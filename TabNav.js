import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import FavoritedScreen from "./FavoritedScreen";

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#800080" },
        headerTintColor: "#FFFFFF",
        tabBarActiveTintColor: "purple",
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Ionicons name="home" color="purple" size={size} />
            // You can replace "home" with the name of your desired icon
          ),
        }}
      />
      <Tab.Screen
        name="FavoritedScreen"
        component={FavoritedScreen}
        options={{
          title: "Favorite",
          tabBarIcon: ({ size }) => (
            <Ionicons name="bookmark" color="purple" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
