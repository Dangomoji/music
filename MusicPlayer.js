import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { musicTracks } from './MusicTrack';

export default function MusicPlayer({ route, navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    if (route.params && route.params.trackIndex !== undefined) {
      setCurrentTrackIndex(route.params.trackIndex);
    }
  }, [route.params]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); 
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      sound.unloadAsync();
    }
    loadSound();
  }, [currentTrackIndex]);

  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        musicTracks[currentTrackIndex].uri
      );
      setSound(sound);
    } catch (error) {
      console.error('Failed to load the sound', error);
    }
  };

  const playSound = async () => {
    if (sound === null) {
      await loadSound();
    }
    if (sound !== null) {
      try {
        await sound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error('Failed to play the sound', error);
      }
    }
  };

  const pauseSound = async () => {
    if (sound !== null) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error('Failed to pause the sound', error);
      }
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < musicTracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (sound) {
        sound.stopAsync(); // Stop sound when leaving the screen
      }
    });

    return unsubscribe;
  }, [navigation]);

  const stopMusicAndNavigateHome = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
    navigation.navigate('Home'); 
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={stopMusicAndNavigateHome} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={{width: 250, height:300}} source={musicTracks[currentTrackIndex].image}></Image>
      <Text style={styles.trackTitle}>{musicTracks[currentTrackIndex].title}</Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={previousTrack}>
          <Text>Previous</Text>
        </TouchableOpacity>
        {isPlaying ? (
          <TouchableOpacity style={styles.controlButton} onPress={pauseSound}>
            <Text>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.controlButton} onPress={playSound}>
            <Text>Play</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.controlButton} onPress={nextTrack}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
  },
  controlButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  headerButton: {
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});