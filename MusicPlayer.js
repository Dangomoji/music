import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { musicTracks } from "./MusicTrack";
import { useFavoritedTracks } from "./FavoritedContext";

export default function MusicPlayer({ route, navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const { favoritedTracks, addToFavorites, removeFromFavorites } =
    useFavoritedTracks();

  useEffect(() => {
    console.log("Favorited tracks:", favoritedTracks);
  }, [favoritedTracks]);

  useEffect(() => {
    if (route.params && route.params.trackIndex !== undefined) {
      setCurrentTrackIndex(route.params.trackIndex);
    }
  }, [route.params]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async () => {
      if (sound) {
        await stopSound();
      }
    });

    return unsubscribe;
  }, [navigation, sound]);

  useEffect(() => {
    if (sound) {
      sound.unloadAsync();
    }
    loadSound();
  }, [currentTrackIndex]);

  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        musicTracks[currentTrackIndex].uri,
        {},
        soundStatusUpdate
      );
      setSound(sound);
      const status = await sound.getStatusAsync();
      setDurationMillis(status.durationMillis);
    } catch (error) {
      console.error("Failed to load the sound", error);
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
        console.error("Failed to play the sound", error);
      }
    }
  };

  const pauseSound = async () => {
    if (sound !== null) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error("Failed to pause the sound", error);
      }
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Failed to stop the sound", error);
    }
  };

  const nextTrack = async () => {
    let newIndex = (currentTrackIndex + 1) % musicTracks.length;
    setCurrentTrackIndex(newIndex);
    await stopSound();
  };

  const previousTrack = async () => {
    let newIndex =
      (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
    setCurrentTrackIndex(newIndex);
    await stopSound();
  };

  const handleSliderChange = (value) => {
    setPositionMillis(value);
    sound.setPositionAsync(value);
  };

  const soundStatusUpdate = (status) => {
    setPositionMillis(status.positionMillis);
  };

  const favoriteTrack = () => {
    const currentTrack = musicTracks[currentTrackIndex];
    addToFavorites(currentTrack);
    console.log("Track favorited:", currentTrack);
  };

  const unfavoriteTrack = () => {
    const currentTrack = musicTracks[currentTrackIndex];
    const index = favoritedTracks.findIndex((track) => track === currentTrack);
    if (index !== -1) {
      removeFromFavorites(index);
      console.log("Track unfavorited:", currentTrack);
    }
  };  

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            stopSound();
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 250, height: 300 }}
        source={musicTracks[currentTrackIndex].image}
      />
      <Slider
        style={{ width: "80%", marginTop: 20 }}
        minimumValue={0}
        maximumValue={durationMillis}
        value={positionMillis}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor="purple"
      />
      <Text style={styles.trackTitle}>
        {musicTracks[currentTrackIndex].title}
      </Text>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={() => {
          const currentTrack = musicTracks[currentTrackIndex];
          if (favoritedTracks && favoritedTracks.includes(currentTrack)) {
            unfavoriteTrack();
          } else {
            favoriteTrack();
          }
        }}
      >
        <Ionicons
          name={
            favoritedTracks.includes(musicTracks[currentTrackIndex])
              ? "heart"
              : "heart-outline"
          }
          size={24}
          color="red"
        />
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={previousTrack}>
          <Ionicons name="play-skip-back-outline" size={24} color="black" />
        </TouchableOpacity>
        {isPlaying ? (
          <TouchableOpacity style={styles.controlButton} onPress={pauseSound}>
            <Ionicons name="pause" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.controlButton} onPress={playSound}>
            <Ionicons name="play" size={24} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.controlButton} onPress={nextTrack}>
          <Ionicons name="play-skip-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  trackTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
  },
  controlButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    marginBottom: 10,
  },
  headerButtonText: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: "bold",
    color: "white",
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});
