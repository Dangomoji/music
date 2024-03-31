import React, { createContext, useContext, useState } from 'react';

const FavoritedTracksContext = createContext();

export const FavoritedTracksProvider = ({ children }) => {
  const [favoritedTracks, setFavoritedTracks] = useState([]);

  const addToFavorites = (track) => {
    setFavoritedTracks((prevFavoritedTracks) => [...prevFavoritedTracks, track]);
  };

  const removeFromFavorites = (trackToRemove) => {
    setFavoritedTracks((prevFavoritedTracks) =>
      prevFavoritedTracks.filter((track) => track.title !== trackToRemove.title)
    );
  };  

  return (
    <FavoritedTracksContext.Provider value={{ favoritedTracks, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritedTracksContext.Provider>
  );
};

export const useFavoritedTracks = () => {
  return useContext(FavoritedTracksContext);
};