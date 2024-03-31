import React, { createContext, useContext, useState } from 'react';

const FavoritedTracksContext = createContext();

export const FavoritedTracksProvider = ({ children }) => {
  const [favoritedTracks, setFavoritedTracks] = useState([]);

  const addToFavorites = (track) => {
    setFavoritedTracks((prevFavoritedTracks) => [...prevFavoritedTracks, track]);
  };

  const removeFromFavorites = (trackIndex) => {
    setFavoritedTracks((prevFavoritedTracks) =>
      prevFavoritedTracks.filter((_, index) => index !== trackIndex)
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