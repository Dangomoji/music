import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFavoritedTracks } from "./FavoritedContext";
import { musicTracks } from "./MusicTrack";

const FavoritedScreen = ({ navigation }) => {
  const { favoritedTracks } = useFavoritedTracks();

  useEffect(() => {
    console.log('Favorited tracks:', favoritedTracks);
  }, [favoritedTracks]);

  const navigateToMusicPlayer = (track) => {
    const selectedIndex = musicTracks.findIndex(item => item.title === track.title);
    console.log(selectedIndex)
    navigation.navigate('MusicPlayer', { selectedIndex });
  };
  

  return (
    <View style={styles.container}>
      {favoritedTracks.length === 0 ? (
        <Text style={styles.emptyMessage}>No favorited tracks</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.tracksContainer}>
        {favoritedTracks.map((track, index) => (
          <TouchableOpacity
            key={index}
            style={styles.trackButton}
            onPress={() => navigateToMusicPlayer(track)}
          >
            <View style={styles.trackBox}>
              <Image style={styles.trackImage} source={track.image} />
              <Text style={styles.trackTitle}>{track.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  emptyMessage: {
    fontSize: 18,
    marginTop: 20,
  },
  trackButton: {
    paddingHorizontal: 5,
  },
  tracksContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  },
  trackTitle: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FavoritedScreen;
