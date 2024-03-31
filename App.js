import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './TabNav';
import { FavoritedTracksProvider } from './FavoritedContext';

export default function App() {
  return (
    <FavoritedTracksProvider>
    <NavigationContainer>
      <TabNav/>
    </NavigationContainer>
    </FavoritedTracksProvider>
  );
}
