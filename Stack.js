import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import MusicPlayer from './MusicPlayer';

const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#800080' }, // Purple color
        headerTintColor: '#FFFFFF', // White color
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Nightingale' }}
      />
      <Stack.Screen
        name="MusicPlayer"
        component={MusicPlayer}
        options={{
          title: 'Music Player',
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
