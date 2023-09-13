import React from "react";
import image from "./pngfind.com-movie-reel-png-974886.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="lg:{border 
    flex items-center  
    space-x-10 px-12
      py-5 sticky top-0
       bg-white z-20 } md:h-[70%] sm:{
    space-x-7 px-6 py-0}"
    >
      <img src={image} className=" w-[60px] lg:w-[100px] md:w-[80px] sm:w-[65px]"/>
      <Link to={"/"}
        className="font-bold
         text-blue-400
           cursor-pointer
          lg:text-xl
          "
      >
        Movies
      </Link>
      <Link to={"/fav"}
        className="font-bold
         text-blue-400 
         lg:text-xl
         cursor-pointer

         "
      >
        Favorites
      </Link>
    </div>
  );
};

export default Navbar;
