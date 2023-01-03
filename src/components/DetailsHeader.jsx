import React from 'react'
import { Link } from 'react-router-dom';

const DetailsHeader = ( { artistId, artistData, songData } ) => {

  const artist = artistData?.artists[artistId]?.attributes; 
  console.log( artistId, songData)

  return (
    <div className=' relative w-full flex flex-col '>
      <div className=' mt-12 w-full bg-gradient-to-l  from-transparent to-black sm:h-48 h-28'>
        <div className=' absolute inset-0 flex items-center '>
          <img 
            src= 
              { artistId 
                  ? artistId
                      ?.images
                      ?.background
                  : songData?.images?.coverart
              }  
            alt="art" 
            className='sm:w-40 w-28 sm:h-40 h-28 rounded-full  object-cover border-2 shadow-xl shadow-black'
          />
          <div className=' ml-5'>
            <p className='  font-bold sm:text-3xl text-xl text-white'>
              {artistId ? artistId?.subtitle : songData?.title}
            </p>
            { !artistId && (
              <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
                <p className=' text-base text-gray-400  mt-2'>
                  {songData?.subtitle}
                </p>
              </Link>
              )
            }

            <p className=' text-base text-gray-400  mt-2'>
              {artistId 
                ? artistId?.genres?.primary
                : songData?.genres?.primary
              }
            </p>
          </div>
        </div>
      </div>
      <div className=' w-full sm:h-44 h-24' />
    </div>
  )
}

export default DetailsHeader
