import React, { useEffect, useState } from "react";
import axios from "react"

const Pagination = (props) => {
let {dPage,iPage,page}=props;

  return (
    <div className="flex justify-center items-center mb-5 mt-5">
      <div
        className="w-[150px] h-[50px] 
      border
       rounded-xl flex items-center 
       justify-center  space-x-6"
      >
        <button className="w-[30%]
         h-[100%] bg-blue
          border-r-2"
          onClick={()=>{dPage()}}
          >Pre</button>
        <h1>{page}</h1>
        <button className="w-[30%] h-[100%] 
        bg-blue border-l-2
     active:shadow-black"
     onClick={()=>{iPage()}}
    >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
