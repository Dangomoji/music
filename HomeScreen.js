import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { musicTracks } from './MusicTrack';
import MusicPlayer from './MusicPlayer';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const navigateToMusicPlayer = (trackIndex) => {
    navigation.navigate('MusicPlayer', { trackIndex });
  };

  const filteredTracks = musicTracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tracks"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <ScrollView contentContainerStyle={styles.tracksContainer}>
        {filteredTracks.map((track, index) => (
          <TouchableOpacity
            key={index}
            style={styles.trackButton}
            onPress={() => navigateToMusicPlayer(index)}
          >
            <View style={styles.trackBox}>
              <Image style={styles.trackImage} source={track.image} />
              <Text style={styles.trackTitle}>{track.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tracksContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  trackButton: {
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
  },
  trackImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  }
});


function HomeScreenWrapper() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#800080' },
        headerTintColor: '#FFFFFF',
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

export default function SearchScreenWrapper() {
  return <HomeScreenWrapper  />;
}