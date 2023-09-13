import react,{useState} from "react"
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Favorites from './components/Favorites';
function App() {
let [data,setdata]=useState([])
function passData(item){
  let arr=[...data,item];
  setdata(arr)
}
const validateCross=(id)=>{
  let list=data.filter((element)=>{
     return(element!==id)
  })
  setdata(list)
}
  return (
    <BrowserRouter>
     <Navbar/>
    <Routes>
      <Route path='/' element={
        <>
        <Banner/>
        <Movies mydata={data} validateCross={validateCross} performFav={passData} sendData={data}/>
        </>
      }></Route>
      <Route path='/fav' element={
      <Favorites list={data}>
      </Favorites>
    }>
{console.log(data)}
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
