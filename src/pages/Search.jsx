import React from 'react'
import { useParams } from "react-router-dom";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { Error, Loader,  SongCard } from "../components";
import { useDispatch, useSelector } from 'react-redux'



const Search = () => {

  const { searchTerm } = useParams();

    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const {data, isFetching, error } = useGetSongsBySearchQuery( searchTerm );

    const songs = data?.tracks?.hits?.map((song, i) => song.track)

    if(isFetching)return <Loader title="Loading songs...." />

    if(error)return <Error  /> 

  return (
    <div className='flex flex-col'>
        <div className='w-full flex justify-between items-center sm:flex-row mt-4 mb-10 '>
            <h2 className='font-bold text-3xl text-white text-left '>
                Showing Results For <span className=" font-black"> { searchTerm } </span>
            </h2> 
            
        </div>

        <div className=' flex flex-wrap max-md:flex-col sm:justify-start justify-center gap-8'>
            
            { songs 
              ? songs?.map((song, i) => (
                  <SongCard 
                      key={song.key}
                      song={song}
                      i={i}
                      isPlaying={isPlaying}
                      activeSong={activeSong}
                      data={data}
                  />
              )) 
              : (
                <h2 className=' text-white flex items-center justify-center flex-row'>Error Occured. Please Try Again Later</h2>
              )
          }

        </div>

    </div>
  )
}

export default Search
