import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader, RelatedSongs, DetailsHeader } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
import { useGetSongRelatedQuery } from '../redux/services/shazamCore';
import { useState, useEffect } from 'react';
import React from 'react'

const ArtistDetails = () => {

    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {songid } = useParams();
    const [data, setData] = useState(null);
    const [adamid, setAdamid] = useState('')
    const { data : songData, isFetching : isFetchingSongDetails } = useGetSongDetailsQuery(  { songid }  );
    const { data : RelatedSongsData , isFetching : isFetchingRelatedSong, error } = useGetSongRelatedQuery({ songid }) ;
    // console.log(songData)
    // console.log(RelatedSongsData)
    
    useEffect(() => {
        setData(songData);
    },[songData])


    const handlePauseClick = () => {
      dispatch(setActiveSong(''));
      dispatch(playPause(false))
    }
  
    const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({song, data, i }));
      dispatch(playPause(true));
  
    }

    // console.log( data?.sections[1]?.type )
    // console.log(data)

    if(isFetchingRelatedSong || isFetchingSongDetails )return <Loader title="Fetching Artist details" />
    
    if(error) return <Error />

  return (

    <div className=' flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-10'>
          Artist Details
      </h2> 
        <DetailsHeader artistId={songData} />
        <RelatedSongs 
            data={RelatedSongsData}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}  
        />
    </div>
    
  )
}

export default ArtistDetails
