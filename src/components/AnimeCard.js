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
    const [snackBarOpen,setSnackBarOpen]  = useState(false);
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
      .catch((e)=>{
        setSnackBarOpen(true);
      })
      move.push('./ViewSingle');
    }
    const handleSnackBarClose=()=>{
      setSnackBarOpen(false);
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
              </div>

            </Paper>
          </Grid>
          <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={snackBarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackBarClose}
                >
                    <Alert onClose={handleSnackBarClose} severity="error">
                        Could not Fetch data!
                    </Alert>
                </Snackbar>
        </GridListTile>
        
    );
    
}

export default AnimeCard
