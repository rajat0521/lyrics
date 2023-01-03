import React from 'react'


const Track = ({ isPlaying, isActive, activeSong }) =>  {
  const imageURL = activeSong?.images?.coverart ? activeSong?.images?.coverart : activeSong?.displayImageUri;
  const songTitle = activeSong?.title ? activeSong?.title : activeSong?. trackName;
  const artistTitle = activeSong?.subtitle ? activeSong?.subtitle : activeSong?.artists[0]?.name;
  return (
    <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={imageURL} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {songTitle ? songTitle : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {artistTitle ?artistTitle : 'No active Song'}
      </p>
    </div>
  </div>
  )
}

export default Track

