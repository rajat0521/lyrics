import React from 'react'
import { Loader } from '../components'
import { useState, useEffect } from 'react';

const TopArtists = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
      }, []);
    

  return (
    <div>
        {
            isLoading 
            ? (
                <Loader title="Fetching Top Artists" />
            )
            : (
                <h2 className=' text-white font-bold text-xl flex justify-center  items-center mt-60  tracking-widest'>
                    Please Try Again After Sometime...
                </h2>
            )
        }
    </div>
  )
}

export default TopArtists