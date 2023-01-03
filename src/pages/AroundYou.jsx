import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import PlayPause from '../components/PlayPause'

const CountryTracks = () => {

    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(true)
    const { activeSong, isPlaying } = useSelector( (state) => state.player );
    const [data, setData] = useState(null)
    
    const options = {
        method: 'GET',
        url: 'https://spotify81.p.rapidapi.com/top_200_tracks',
        params: {country: 'IN'},
        headers: {
          'X-RapidAPI-Key': 'bf6a24d58dmshfac2067a0531b27p155aadjsn4dd3643a5f17',
          'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
      };

    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_rIzD9mhMUn2g8D22u6plQXdy9xNVs`)
        .then((res) =>setCountry(res?.data?.location?.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
        // at_rIzD9mhMUn2g8D22u6plQXdy9xNVs

        axios.request(options).then(function (response) {
            setData(response.data)

        }).catch(function (error) {
            console.error(error);
        });
      
    }, [country])

    if(loading) return <Loader title={"Loading Songs Arround You"} />
    // if(data)console.log(data[0]);

  return (
    <div className=' flex flex-col'>
        <h2 className=' font-bold text-3xl text-white text-left mt-4 mb-10'>
            Arround You
        </h2>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {
                data?.map((song , i) => (
                        <div className=" flex flex-col w-[20%] sm:w-[45%] md:w-[30%] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
                            <a href={song?.trackMetadata?.trackUri}>
                                <div className=" relative w-full group">
                                    <div className = { `absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex  ${ activeSong?.title === song?.trackMetadata?.trackName ? 'flex bg-black bg-opacity-70 ' :  ' hidden ' }  `}>
                                        <PlayPause  
                                        song={song}title
                                        // handlePause={handlePauseClick}
                                        // handlePlay={handlePlayClick}
                                        isPlaying={isPlaying}
                                        activeSong={activeSong}
                                        />
                                    </div>
                                    <img alt="song_img" src={song?.trackMetadata?.displayImageUri} />
                                </div>
                                <div className=" mt-4 flex flex-col">
                                    <p className=" font-semibold text-lg text-white truncate">
                                        {song?.trackMetadata?.trackName}
                                    </p>
                                    <p className=" text-sm truncate text-gray-300 mt-1">
                                    
                                        {song?.trackMetadata?.artists[0]?.name}
                        
                                    </p>
                                </div>
                            </a>
                        </div>
                ))
            }
        </div>
        
    </div>
  )
}

export default CountryTracks


