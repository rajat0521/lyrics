import React from 'react'
import { Error, Loader, SongCard} from '../components'
import { genres } from '../assets/constants'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TopPlay } from '../components';
import PlayPause from '../components/PlayPause'

const Discover = () => {

    const handlePauseClick = () => {
        dispatch(setActiveSong(''));
        dispatch(playPause(false))
      }
    
      const handlePlayClick = () => {
        dispatch(playPause(true));
        if(flag){
    
        }else{
          dispatch(setActiveSong({song, data, i }));
        }
    
      }

    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const {data, isFetching, error } = useGetTopChartsQuery();

    // console.log(data?.tracks)
    const genreTitle = 'pop';

    if(isFetching)return <Loader title="Loading songs...." />

    if(error)return <Error  /> 

  return (
    <>
    <div className='md:hidden flex flex-col  w-full'>
        <h2 className=' flex font-bold text-3xl text-white text-left m-9'>
            Discover {genreTitle}
        </h2>
        {data?.tracks?.map((song, i) => (
            <div className={`w-full flex flex-row items-center hover:bg-transparent   ${activeSong?.title !== song?.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
            <div className=" flex-1 flex flex-row justify-between  items-center">
              <img className=" w-12 h-12 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
              <div className=" flex-1 flex flex-col justify-start mx-3">
                <Link to={ `/songs/${song?.key}`}>
                  <p className=" text-lg font-bold text-white">
                    {song?.title}
                  </p>
                </Link>
                <Link to={ `/artists/${song?.key}`}>
                  <p className=" text-sm text-gray-300 mt-1">
                    {song?.subtitle}
                  </p>
                </Link>
              </div>
            </div>
            <PlayPause  
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          </div>
        )) }
    </div>


        <div className='hidden sm:flex flex-col '>
            <div className='w-full flex justify-between items-center sm:flex-row mt-4 mb-10 '>
                <h2 className='font-bold text-3xl text-white text-left '>
                    Discover {genreTitle}
                </h2> 
                <select
                    onChange={() => {}}
                    value=''
                    className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                >
                    {genres.map((genere) => <option key={genere.value} value={genere.value} >{genere.title}</option> )}
                </select>
            </div>

            <div className=' flex flex-wrap max-md:flex-col sm:justify-start justify-center gap-8'>
                
                {data?.tracks?.map((song, i) => (
                    <SongCard 
                        key={song.key}
                        song={song}
                        i={i}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                    />
                )) }

            </div>

        </div>
    </>
  )
}

export default Discover