import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ( { song, i , isPlaying, activeSong , data, trackMetadata , flag} ) => {

  const dispatch = useDispatch();

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

  // if(song.images === undefined){
  //   return;
  // }
  // console.log(song.images)

  const image = song ? song?.images?.coverart : trackMetadata?.displayImageUri;
  const title = song ? song?.title : trackMetadata?.trackName ;
  const artist = song ? song?.subtitle: trackMetadata?.artists[0]?.name;


  return (

      <div className=" flex flex-col w-[20%] sm:w-[45%] md:w-[30%] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">

          <div className=" relative w-full group">
            <div className = { `absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex  ${ activeSong?.title === title ? 'flex bg-black bg-opacity-70 ' :  ' hidden ' }  `}>
                <PlayPause  
                  song={song}
                  handlePause={handlePauseClick}
                  handlePlay={handlePlayClick}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                />
            </div>
              <img alt="song_img" src={image} />
          </div>
          <div className=" mt-4 flex flex-col">
            <p className=" font-semibold text-lg text-white truncate">
              <Link to={`/songs/${song?.key ? song?.key : '' }`} >
                {title}
              </Link>
            </p>
            <p className=" text-sm truncate text-gray-300 mt-1">
              <Link to={ song ? `/artists/${song?.key }` : '/top-artists '  }>
                {artist}
              </Link>
            </p>
          </div>
        
      </div>
  )
}

export default SongCard