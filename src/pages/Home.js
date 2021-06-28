// import { useEffect } from 'react';
import  {useContext,useState} from 'react';
import {useHistory} from 'react-router-dom';
import { searchContext } from '../context/search';
import {Grid,FormControl,Input,IconButton} from '@material-ui/core';
import animeMain from '../components/animeMain.png';
import SearchIcon from '@material-ui/icons/Search';
import '../pages/Home.scss';
const Home = () => {
    const search = useContext(searchContext);
    const move = useHistory();
    const[ input,setInput] = useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        search.search(input).then((data)=>{
            search.setData(data.results);
            localStorage.setItem('myData',JSON.stringify(data.results));
            move.push('./results');
        })
    }
    // useEffect(()=>{
    //  search.search('Naruto').then(
    //      (data)=>{
    //          console.log(data);
    //      }
    // )
    //  },[search])
    return (
        <div>
        <Grid
         container
         direction="row"
         justify="center"
         alignContent="center"
         alignItems = "center"
         >
         <Grid item>
         <img src ={ animeMain } alt="" height="500" width="800" />
         </Grid>
         <Grid  item>
             <form className="home-form">
         <FormControl type="submit" className="home-FormControl">
          <Input
           placeholder="Search for your favourite anime..." 
           className="home-input"
           value={input}
           onChange = {(e)=>{setInput(e.target.value)}}
           />
           <IconButton
            variant="contained" 
            color="primary"
            type="submit"
            disabled={!input}
            className="home-iconButton"
            onClick={handleSubmit}
             >
            <SearchIcon/>
             </IconButton>
         </FormControl>
         </form>
         </Grid>
         </Grid>
         </div>
    );
    
        
}
 
export default Home;