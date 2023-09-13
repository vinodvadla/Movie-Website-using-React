import React from "react";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";



const Movies = (props) => {
  let [movies, setmovies] = useState([]);
  const [count, setcount] = useState(1);
  const [emoji, setemoji] = useState("");
  // let [movieData, setmovieData] = useState([]);
  let [sendData,setsendData]=useState(props.mydata)
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=bcfcb93123335a2b4e11e1ef04804d37&page=${count}`
      )
      .then((res) => {
        console.log(res.data.results);
        setmovies(res.data.results);
      });
  }, [count]);
  const view = (id) => {
    setemoji(id);
  }
  const hide = () => {
    setemoji("")
  }
  const dPage = () => {
    if (count > 1) {
      setcount(count - 1);
    }
  };
  const iPage = () => {
    setcount(count + 1);
  };
 
 

  return (
    <>
      {movies.length === 0 ? (
        <div className="w-[100%] bg-slate-600 flex justify-center items-center">
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
        <div className="mt-[-80px] py-8">
          <h1
            className="text-center
            font-bold 
            text-2xl
      "
          >
            Trending Movies
          </h1>
          <div className="flex justify-center space-x-8 my-6 flex-wrap">
            {movies.map((e) => {
              return (
                <div
                  onMouseOver={() => view(e.id)}
                  onMouseLeave={() => hide()}
                  key={e.id}
                  className="w-[220px] h-[270px] rounded-xl mt-5 relative hover:scale-110  duration-300 bg-center bg-cover overflow-hidden flex items-end"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${e.poster_path})`,
                  }}
                >
                  <div

                    className="text-center font-bold text-white bg-slate-800 p-3 w-full"
                  >
                    {e.title}
                  </div>
                 {
                  props.sendData.includes(e)?
                  <div
                  className="p-3 bg-gray-900 rounded-xl absolute top-2 left-2 text-xl cursor-pointer"
                  style={{
                    display: emoji === e.id ? "block" : "none",
                  }}
                  onClick={()=>{props.validateCross(e)}}
                >
                  ❌
                </div>
                :<div
                className="p-3 bg-gray-900 rounded-xl absolute top-2 left-2 text-xl cursor-pointer"
                style={{
                  display: emoji === e.id ? "block" : "none",
                }}
                onClick={()=>{props.performFav(e)
             }}
              >
               ❤️
              </div>
                 } 
                </div>
              );
            })}
          
          </div>
          <Pagination dPage={dPage} iPage={iPage} page={count} />
        </div>
      )}
    </>
  );
};

export default Movies;
// export const data=useContext(store)
