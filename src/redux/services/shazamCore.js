// const fetch = require('node-fetch');

// const url = 'https://shazam.p.rapidapi.com/charts/list';

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'd369326869msh7d57bd4c74fc87ep18f106jsne92323671b37',
//     'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//   }
// };

// fetch(url, options)
// 	.then(res => res.json())
// 	.then(json => console.log(json))
// 	.catch(err => console.error('error:' + err));

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// console.log("inside shazam core file")

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'bf6a24d58dmshfac2067a0531b27p155aadjsn4dd3643a5f17');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query : () => '/charts/track?locale=en-US&pageSize=20&startFrom=0'}),
    getSongDetails : builder.query({ query: ( {songid} ) => `/songs/get-details?key=${songid}&locale=en-US`}),
    getSongRelated : builder.query({ query: ( {songid} ) => `/songs/list-recommendations?key=484129036&locale=en-US`}),
    getSongsBySearch : builder.query({ query: ( searchTerm ) => `/search?term=${searchTerm}`})
  }),
});


export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetSongsBySearchQuery
} = shazamCoreApi;