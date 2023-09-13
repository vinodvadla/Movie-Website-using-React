import React from "react";
import "./banner.css";
import axios from "axios"
import { useState, useEffect } from "react"
import { Oval, TailSpin } from "react-loader-spinner"
const Banner = () => {
  const [banner, setbanner] = useState("")
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/week?api_key=bcfcb93123335a2b4e11e1ef04804d37&page=1"
      )
      .then((res) => {
        setbanner(res.data.results[Math.floor(Math.random(1)*20)]);
      });
  }, []);
  return (
    <>
      {banner == "" ? (
        <div
          className="flex
         justify-center
         items-center
         h-[500px]
        w-[100%]"
        >
          <TailSpin 
            height="80"
            width="80"
            radius="9"
            color="gray"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div>
          <div
            className={`h-[500px]
       w-[100%]
         bg-center bg-cover
         lg:h-[500px] md:h-[350px] sm:h-[250px]`}
            style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${banner.backdrop_path})`,
            }}
          ></div>
          <div
            className="banner-head
       flex
        items-center 
        justify-center
       text-white py-3.5
       font-bold
        lg:text-3xl md:text-2xl sm:text-xl"
          >
            {banner.title}
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
