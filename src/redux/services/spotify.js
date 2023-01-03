import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const SpotifyApi = createApi({
  reducerPath: 'SpotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://spotify81.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'd369326869msh7d57bd4c74fc87ep18f106jsne92323671b37');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopTwentySongs: builder.query({ query : ( {country} ) => `/top_200_tracks?country=IN` }),
  }),
});


export const {
  useGetTopTwentySongsQuery,
} = SpotifyApi;