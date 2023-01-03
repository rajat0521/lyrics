import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { useParams } from "react-router-dom";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


import 'swiper/css'
import 'swiper/css/free-mode'
import { useRef } from "react";




const TopChartCard = ({song, i }) => {

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector( (state) => state.player );
  const { data } = useGetTopChartsQuery();
  
  const handlePauseClick = () => {
    dispatch(setActiveSong(''));
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i }));
    dispatch(playPause(true));

  }

  return (
    <div className="  w-full flex flex-row items-center hover:bg-[#4c426e] py-2 rounded-lg cursor-pointer pr-0 pl-0 md:p-4 pb-0 p-2 ">
      <h3 className=" font-bold text-base text-white mr-3">
        {i+1}.
      </h3>
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
  )
  
  
}

const TopPlay = () => {

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior : 'smooth' });
  })
  
  const divRef = useRef(null);
  const { data } = useGetTopChartsQuery();
  const topPlays = data?.tracks?.slice(0, 5);

  return(
    <div 
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"  
    >
      <div className=" w-full  flex flex-col -mt-8">
        <div className=" flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">
            Top Charts
          </h2>
          <Link  to='/top-charts'>
            <p className=" text-gray-300 text-base cursor-pointer">
              See More
            </p>
          </Link>
        </div> 
        <div className=" mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
              <TopChartCard 
                song={song} 
                i={i} 
                key={song.key}
              />
          ))}
        </div>
      </div>
      <div className=" w-full flex flex-col mt-3 sm:mt-1">
        <div className=" flex flex-row justify-between items-center">
          <h2 className=" text-white font-bold text-2xl">
            Top Artists
          </h2>
          <Link  to='/top-artists'>
            <p className=" text-gray-300 text-base cursor-pointer">
              See More
            </p>
          </Link>
        </div> 

        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%' , height: 'auto'}}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.key}`}>
                <img src={song?.images?.background} alt="name" className=" rounded-full w-full object-cover " />
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  )
};

export default TopPlay;
