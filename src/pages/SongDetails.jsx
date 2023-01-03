import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader, RelatedSongs, DetailsHeader } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/shazamCore';
import { useGetSongRelatedQuery } from '../redux/services/shazamCore';
import { useState, useEffect } from 'react';
import React from 'react'

const SongDetails = () => {

    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {songid } = useParams();
    const [data, setData] = useState(null);
    const [adamid, setAdamid] = useState('')
    const { data : songData, isFetching : isFetchingSongDetails } = useGetSongDetailsQuery(  { songid }  );
    // const id = songData?.artists[0]?.adamid;
    const { data : RelatedSongsData , isFetching : isFetchingRelatedSong, error } = useGetSongRelatedQuery({ songid }) ;
    // console.log(data)
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
    console.log(songData)

    if(isFetchingRelatedSong || isFetchingSongDetails )return <Loader title="Fetching song details" />
    
    if(error) return <Error />

  return (

    <div className=' flex flex-col'>
        <DetailsHeader artistId="" songData={songData} />
        <div className=' mb-10'>
            <h2 className=' text-white text-3xl font-bold flex justify-center'>
                Lyrics 
            </h2>

            <div className=' mt-5 flex justify-center flex-col  items-center '>
                { data?.sections[1]?.type === "LYRICS"
                    ? data?.sections[1]?.text?.map((line, i) => (
                        <p className=' text-gray-400 text-base my-1'>
                            {line}
                        </p>
                    ))
                    : <p className='text-gray-400 text-base my-1 '>
                        No Lyrics Found
                    </p>
                }
            </div>
        </div>
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

export default SongDetails
