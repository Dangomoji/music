import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { musicTracks } from './MusicTrack';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  navigateToMusicPlayer = (trackIndex) => {
    this.props.navigation.navigate('MusicPlayer', { trackIndex });
  };

  render() {
    const { searchQuery } = this.state;

    const filteredTracks = musicTracks.filter(track =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tracks"
          onChangeText={(text) => this.setState({ searchQuery: text })}
          value={searchQuery}
        />
        <ScrollView contentContainerStyle={styles.tracksContainer}>
          {filteredTracks.map((track, index) => (
            <TouchableOpacity
              key={index}
              style={styles.trackButton}
              onPress={() => this.navigateToMusicPlayer(index)}
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
  
