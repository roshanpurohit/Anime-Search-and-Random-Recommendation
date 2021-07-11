import { useEffect, useState,useContext } from "react";
import { Grid,Typography,Paper,Button, Link ,Snackbar,Tooltip} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Cached from  "@material-ui/icons/Cached";
import AddIcon from '@material-ui/icons/Add';
import { searchContext } from "../context/search";
import '../styles/RandomRec.scss';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const  RandomRec = () => {
  const [open, setOpen] = useState(false);
  const  [randomId,setRandom] = useState(Math.floor(Math.random()*1000 + 1));
  const [ data,setData]  = useState(null);
  const[serverError,setServerError] = useState(false);
  const search = useContext(searchContext);
  
    const handleClick=()=>{
       setRandom(0);
    }
    const handleListClick=()=>{
      var temp =[...search.watchList];
      temp.push({title:data.title,episodes:(data.episodes?data.episodes:"N/A"),id:data.mal_id,url:data.url,image_url:data.image_url});
      let object = temp.map(JSON.stringify);
      let set = new Set(object);
      temp = Array.from(set).map(JSON.parse);
      search.setWatchList(temp);
      setOpen(true);
   }
   const handleClose=(reason)=>{
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
   }
   
    useEffect(()=>
      {
         fetch(`https://api.jikan.moe/v3/anime/${randomId}`)
        .then((response)=> {
          if(!response.ok)
          {
            if(response.status >=400 && response.status < 500) {
                 response.json().then((data) => {
                console.log(data.error);
                console.log("Try another ID");
                 setRandom(Math.floor(Math.random()*1000 + 1));
              })
          } 
          else
          {
            console.log("Server is unavailable");
            setServerError(true);
           
          }
        }
         else
          {
             response.json().then((data)=>{
              setData(data);
            })
          }
          
        })
        .catch(err=>{
          console.log(err);
         setServerError(true);
        })
      
    },[randomId,search])
    
    return (
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing = {3}
         >
          {!serverError && (<Grid item xs={12}>
            
             <Typography  variant="h3" component="h2" className= "random-typo" >Recommendation for you </Typography>
             
           </Grid>) }
           {
             data && (
           <Grid item>
             
           <img src={data.image_url} alt="" style= {{maxHeight:300}} className="random-image" key= {data.image_url} />
         
           </Grid> )
}
 {     data && (
         <div className="random-buttons">
        <Grid item>
        <Tooltip title="Recommend something else" placement="right" >
          <Button   className="button-color">
            <Cached  onClick={handleClick} fontSize="large" />
          </Button>
          </Tooltip>
            </Grid> 
            <Grid item>
              <Button   variant="custom"  className="button-color" onClick={handleListClick} >
              <font family='Product Sans' size='5'>Add to Watch List</font>
             <AddIcon  />
             </Button>
             <Snackbar  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
               {data.title} added to watchlist!
              </Alert>
             </Snackbar>
             </Grid>
             </div>
              )}
           <Grid item>
           <Paper elevation={4}  className= "recommend-paper">
                { 
                
                   (data  &&  ( 
                    <div className= "recommend-paper">
                <Typography variant="h5" component="h2"  className= "font-color" paragraph={true} >
                 <b><u>Title:</u></b>   {data.title}<br/>
                 <b><u>Synopsis:</u></b>   {data.synopsis}<br/>
                 <Link href={data.url} className="about-link">MyAnimeList</Link>
                 </Typography> 
                 </div> )) || (!serverError && <p className="loading">Generating Recommendation</p>) || 
                 (serverError && <Typography variant="h4" component="h2" className="font-color">Server is unavailable at the moment<br/>Try Again Later</Typography>)
                  }
               

             </Paper> 
            </Grid>
           </Grid>
      
      );
}
 
export default RandomRec;