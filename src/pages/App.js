import Home from './Home';
import Navbar from "../components/Navbar";
import Results from './Results';
import ViewSingle from './ViewSingle';
import RandomRec from './RandomRec';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { useState } from 'react';
import { searchContext} from '../context/search';
import About from './About';
function App() {
  const [animeData,setAnimeData]=useState([]);
  const [ singleData,setSingle] = useState({});
  const setData = (data)=>{
      setAnimeData(data);
  }
  const setSingleData =(data)=>{
    setSingle(data);
  }
  const search = (searchedTerm)=>
  {
     return fetch(
       `https://api.jikan.moe/v3/search/anime?q=${searchedTerm}&limit=20`
       ).then((response)=>response.json());
  }
  return (
    <searchContext.Provider value = {
      {animeData,singleData,setData,setSingleData,search}
      } >
    <div className="App">
    <Router>
      <Navbar />
        
            <Switch>
              <Route exact  path="/random-anime-recommendation-and-search-list/" >
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
              
            </Switch>
        </Router>
       </div>
    </searchContext.Provider>
  );
}

export default App;
