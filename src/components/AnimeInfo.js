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
         <Typography variant="h5" component="h2">
             Title:{title}</Typography>
         <Typography variant="h5" component="h2">
             Airing:{airing}</Typography>
         <Typography variant="h5" component="h2">Broadcast:{broadcast}
         </Typography>
         <Typography variant="h5" component="h2">Score:{score}
         </Typography>
         <Typography variant="h5" component="h2">Rating:{rating}
         </Typography>
         <Typography variant="h5" component="h2">Episodes:{episodes}
         </Typography>
         <Link type="button" variant="body1" href={url}>
             MyAnimeList
         </Link>
        </Paper>
        </Grid>
}

export default AnimeInfo
