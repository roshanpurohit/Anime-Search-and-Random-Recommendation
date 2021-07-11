import  { useContext ,useState} from 'react';
import './AnimeCardStyle.scss';
import {useHistory} from 'react-router-dom';
import { GridListTile,Typography,Paper,Link,Grid,Tooltip,Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {searchContext} from '../context/search';
import AddIcon from '@material-ui/icons/Add';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AnimeCard = ({single})=> {
    const [open,setOpen]  = useState(false);
    const move = useHistory();
    const search =  useContext(searchContext);
    const imageUrl = single.image_url;
    const synopsis = single.synopsis.length>30?
    `${single.synopsis.substring(0,30)}...`:single.synopsis;
    const title = single.title.length>15?
    `${single.title.substring(0,15)}...`:single.title;

    const handleClick=()=>{
      
      fetch(`https://api.jikan.moe/v3/anime/${single.mal_id}`)
      .then((response)=>response.json())
      .then((data)=>{
          search.setSingleData(data);
          localStorage.setItem('singleData',JSON.stringify(data));
      })
      move.push('./ViewSingle');
    }
    const handleListClick=()=>{
       var temp =[...search.watchList];
       temp.push({title:single.title,episodes:(single.episodes?single.episodes:"N/A"),id:single.mal_id,url:single.url,image_url:imageUrl});
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
    return (
        <GridListTile className="animeCard__container">
          <Grid container item xs={12} >
            <Paper className = "animeCard__paper">
              <img src={imageUrl} alt={title} style={ {maxHeight:300} } />
              <Tooltip title={single.title} placement="top">
              <Typography variant="h5" component="h2" className="animeCard__typo">{title}</Typography>
              </Tooltip>
              <Typography variant="body2" component="h2" paragraph={true} className="animeCard__typo" >
                  {synopsis}
              </Typography>
              <div >
              <Link type="button" variant="body1" style={{marginBottom:0,color:"lightgreen"}} onClick={handleClick} >
               Click for more                        
              </Link>
              <Tooltip title="Add to watch list" placement="top">
              <Button className="add-button" onClick={handleListClick} ><AddIcon/></Button>
              </Tooltip>
              <Snackbar 
               anchorOrigin={ {vertical: 'top', horizontal: 'right'} }
               open= {open} 
               autoHideDuration={2000} 
               onClose={handleClose}
              >
              <Alert onClose={handleClose} severity="success">
               {single.title} added to watchlist!
              </Alert>
             </Snackbar>
              </div>

            </Paper>
          </Grid>
        </GridListTile>
    );
    
}

export default AnimeCard
