// import { useEffect } from 'react';
import  {useContext,useState} from 'react';
import {useHistory} from 'react-router-dom';
import { searchContext } from '../context/search';
import {Grid,FormControl,Input,IconButton,Button,Paper,Typography} from '@material-ui/core';
import or from '../components/or.png';
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
    const handleRecommendClick=()=>{
        move.push('./random-recommendation')
        }
    return (
        <div>
        <Grid
         container
         direction="row"
         justify="center"
         alignContent="center"
         alignItems = "center"
         spacing={5}
         >
             <Grid item xs={12}>

             </Grid>
             <Grid item xs={12}>
                 
             </Grid>
             <Grid item xs>
            <Paper elevation={3} className="home-paper">
                 <Button  className="home-recommendButton" onClick={handleRecommendClick}>
                     <Typography variant="h5" component="h2"  className="home-Typo">Recommend Random Anime</Typography></Button>
             </Paper>
             </Grid>
             <Grid item xs 
              
             >
           <img src={or} alt="" width={120} height={120} className="or-img" /> 
             </Grid>
         
         <Grid  item xs >

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