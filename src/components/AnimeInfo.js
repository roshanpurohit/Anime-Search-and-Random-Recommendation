import React from 'react';
import {Grid,Paper,Typography,Link} from '@material-ui/core';
import './singleViewStyle.scss';
const AnimeInfo= ({info})=> {
    const{
        title,
        image_url,
        episodes,
        rating,
        airing,
        broadcast,
        score,
        url
    } = info;
    
    return <Grid 
           container
           spacing={10}
           direction="row"
           justify="center"
           alignItems=  "center"
           alignContent = "center"
           >
           <Grid item >
               <div className="imageClass" >
               <img src = {image_url} alt="" style= { { maxHeight:250 } } />
               </div>
            </Grid>
        <Paper elevation={3} className="singleView-paper" >
         <Typography variant="h5" component="h2" className="singleView-typo">
             Title:{title}</Typography>
         <Typography variant="h5" component="h2" className="singleView-typo">
             Airing:{ airing?"Yes":"No"}</Typography>
         <Typography variant="h5" component="h2" className="singleView-typo">Broadcast:{broadcast}
         </Typography>
         <Typography variant="h5" component="h2" className="singleView-typo">Score:{score}
         </Typography>
         <Typography variant="h5" component="h2" className="singleView-typo">Rating:{rating}
         </Typography>
         <Typography variant="h5" component="h2" className="singleView-typo">Episodes:{episodes}
         </Typography>
         <Link type="button" variant="body1" href={url} style={{color:"lightgreen"}}>
             MyAnimeList
         </Link>
        </Paper>
        </Grid>
}

export default AnimeInfo
