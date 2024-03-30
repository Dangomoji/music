import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MusicPlayer from './MusicPlayer';
import { musicTracks } from './MusicTrack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const navigateToMusicPlayer = (trackIndex) => {
    navigation.navigate('MusicPlayer', { trackIndex }); // Pass trackIndex as part of the route object
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {musicTracks.map((track, index) => (
        <TouchableOpacity
          key={index}
          style={styles.trackButton}
          onPress={() => navigateToMusicPlayer(index)} // Pass the index here
        >
          <View style={styles.trackBox}>
            <Image style={styles.trackImage} source={track.image} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Nightingale' }} component={HomeScreen} />
        <Stack.Screen name="MusicPlayer" options={{ title: 'Music Player',headerLeft: ()=> null, }} component={MusicPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  trackButton: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  trackBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'cover'
  },
  trackImage: {
    width: 120,
    height: 125,
  }
});
