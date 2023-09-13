import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Uparrow from "./arrow-up-circle.svg";
import Downarrow from "./arrow-down-circle.svg";

const Favorites = (props) => {
  let data = props.list;
  const [movies, setmovies] = useState(data);
  const [genre, setgenre] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [curGenre, setcurGenre] = useState("All Genres");
  let [currRate, setcurrRate] = useState(0);
  let [currpopularity,setcurpopularity]=useState(0)
  let [numData,setnumData]=useState(0)
  let [pnum,setpnum]=useState(1)
  console.log(movies);
  let genresids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantacy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10765: "Sci-Fi",
    37: "Western",
    10768: "War",
    10767: "Talk",
    10764: "Reality",
    10763: "News",
    9648: "Mystery",
    10762: "Kids",
    10751: "Family",
    18: "Drama",
    99: "Documentary",
    80: "Crime",
    35: "Comedy",
  };

  useEffect(() => {
    let value = movies.map((e) => {
      return genresids[e.genre_ids[0] || e.genre_ids[1] || e.genre_ids[2]];
    });
    let genres = Array.from(new Set(value));

    setgenre(["All genres", ...genres]);
  }, [data]);
  const handleClick = (val) => {
    let copydata = data;
    let filtval = copydata.filter((e) => {
      return e.genre_ids === val;
      setmovies(filtval);
    });
  };
  const handleDelete = (id) => {
    let copy = movies.filter((e) => {
      return e.id !== id;
    });
    setmovies(copy);
  };

  // {Searching}
  let searchedMovies =
    searchItem == ""
      ? movies
      : movies.filter((e) => {
          let lowerSearch = searchItem.toLowerCase();
          let titles = e.name || e.title;
          return titles.toLowerCase().includes(lowerSearch);
        });
  // Filtering with the genre
  let filteredMovies =
    curGenre == "All genres"
      ? searchedMovies
      : searchedMovies.filter((item) => {
          if (genresids[item.genre_ids[0]] === curGenre) {
            return item;
          }
        });
  // Sorting Rating;
  
    if (currRate == 1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieA.vote_average - movieB.vote_average;
          
      });
    } else if (currRate == -1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieB.vote_average - movieA.vote_average;
      })
    }
// Sorting popularity

if(currpopularity==1){
  filteredMovies=filteredMovies.sort((a,b)=>{
    return a.popularity-b.popularity
  
  })
}else if(currpopularity==-1){
  filteredMovies=filteredMovies.sort((a,b)=>{
    return b.popularity-a.popularity
  })
}
// Pagination
 let increment=()=>{
  setpnum(pnum+1);
 }
 let decrement=()=>{
  if(pnum>1){
    setpnum(pnum-1)
  }
 }


  return (
    <>
      <div className="w-[100%] flex items-center justify-center space-x-7">
        {genre.map((e) => {
          return (
            <button
              className={`px-4 bg-gray-500 my py-2 rounded text-white font-bold text-xl hover:bg-blue-400 ${
                e === curGenre ? "bg-blue-400" : ""
              }`}
              onClick={() => {
                setcurGenre(e);
              }}
            >
              {e}
            </button>
          );
        })}
      </div>
      <div className="w-[100%] p-2 flex items-center justify-center space-x-4">
        <input
          type="text"
          className="px-4 py-2 border-2 rounded"
          placeholder="Search"
          value={searchItem}
          onChange={(e) => setsearchItem(e.target.value)}
        />
        <input
          type="number"
          className="px-10 py-2 border-2 rounded outline-none"
          placeholder="0"
        />
      </div>
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                <div className="flex justify-center items-center gap-3">
                  <img
                    src={Uparrow}
                    alt=""
                    className="hover:scale-110"
                    onClick={() => {
                      setcurpopularity(0)
                      setcurrRate(1);
                    }}
                  />
                  Rating
                  <img
                    src={Downarrow}
                    alt=""
                    className="hover:scale-110"
                    onClick={() => {
                      setcurpopularity(0)
                      setcurrRate(-1);
                    }}
                  />
                </div>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                <div className="flex justify-center items-center gap-3">
                  <img src={Uparrow} alt=""
                   className="hover:scale-110" 
                   onClick={()=>{
                     setcurrRate(0)
                    setcurpopularity(1)
                    }}/>
                  Popularity
                  <img src={Downarrow} alt="" 
                  className="hover:scale-110" 
                  onClick={()=>{
                     setcurrRate(0)
                    setcurpopularity(-1)
                    }}/>
                </div>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Genre
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Remove
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {filteredMovies.map((e) => {
              return (
                <tr class="hover:bg-gray-50">
                  <th class="flex items-center gap-4 px-6 py-4 font-normal text-gray-900">
                    <div class="relative h-[100px] w-[160px] flex justify-center items-center object-contain">
                      <div
                        style={{
                          backgroundImage: `url(https://image.tmdb.org/t/p/original/${e.poster_path})`,
                        }}
                        className="w-[100%] h-[100%] bg-center bg-cover"
                      ></div>
                    </div>
                    <div class="text-sm">
                      <div class="font-medium text-gray-700 flex items-center">
                        <div className="flex items-center justify-center">
                          {e.title || e.name}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">
                    <div className="flex justify-center items-center">
                      {e.vote_average}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div className="flex justify-center items-center">
                      {e.popularity}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-green-600">
                        {
                          genresids[
                            e.genre_ids[0] || e.genre_ids[1] || e.genre_ids[2]
                          ]
                        }
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 cursor-pointer">
                    <div
                      class="flex justify-center gap-4  pr-3 text-red-800"
                      onClick={() => {
                        handleDelete(e.id);
                      }}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination page={pnum} dPage={decrement} iPage={increment}/>
    </>
  );
};
export default Favorites;
