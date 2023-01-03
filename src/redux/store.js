import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';

import { shazamCoreApi } from './services/shazamCore';

import { SpotifyApi } from './services/spotify';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath] : shazamCoreApi.reducer,
    player: playerReducer,
    [SpotifyApi.reducerPath] : SpotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
