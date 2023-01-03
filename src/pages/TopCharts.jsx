
import React from 'react'
import { Error, Loader, SongCard} from '../components'
import { genres } from '../assets/constants'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
import { useDispatch, useSelector } from 'react-redux'



const TopCharts = () => {

    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const {data, isFetching, error } = useGetTopChartsQuery();

    // console.log(data?.tracks)
    const genreTitle = 'pop';

    if(isFetching)return <Loader title="Loading songs...." />

    if(error)return <Error  /> 

  return (
    <div className='flex flex-col'>
        <div className='w-full flex justify-between items-center sm:flex-row mt-4 mb-10 '>
            <h2 className='font-bold text-3xl text-white text-left '>
                Discover Top Charts
            </h2> 
            
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
  )
}

export default TopCharts