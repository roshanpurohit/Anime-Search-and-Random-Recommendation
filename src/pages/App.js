import Home from './Home';
import Navbar from "../components/Navbar";
import Results from './Results';
import ViewSingle from './ViewSingle';
import RandomRec from './RandomRec';
import {HashRouter as Router,Switch,Route} from 'react-router-dom';
import { useState } from 'react';
import { searchContext} from '../context/search';
import About from './About';
import MyList from './MyList';
function App() {
  const [animeData,setAnimeData]=useState([]);
  const [ singleData,setSingle] = useState({});
  const[watchList,setList]=useState(
    localStorage.getItem('myWatchList')?
    JSON.parse(localStorage.getItem('myWatchList')):[]);
  const setData = (data)=>{
      setAnimeData(data);
  }
  const setSingleData =(data)=>{
    setSingle(data);
  }
  const setWatchList=(data)=>{
    setList(data);
  }
  const search = (searchedTerm)=>
  {
     return fetch(
       `https://api.jikan.moe/v3/search/anime?q=${searchedTerm}&limit=20`
       ).then((response)=>response.json());
  }
  return (
    <searchContext.Provider value = {
      {animeData,singleData,watchList,setWatchList,setData,setSingleData,search}
      } >
    <div className="App">
      <div className="blur">
    <Router>
      <Navbar />
        
            <Switch>
            <Route exact  path="/" >
               <Home />
              </Route>
              <Route exact  path="/about" >
               <About />
              </Route>
              <Route exact  path="/results" >
               <Results />
              </Route>
              <Route exact  path="/ViewSingle" >
               <ViewSingle />
              </Route>
              <Route exact  path="/random-recommendation" >
               <RandomRec/>
              </Route>
              <Route exact  path="/MyList" >
               <MyList/>
              </Route>
            </Switch>
        </Router>
        </div>
       </div>
    </searchContext.Provider>
  );
}

export default App;
