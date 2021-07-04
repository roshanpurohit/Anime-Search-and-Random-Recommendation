import React, { useContext } from 'react';
import './AnimeCardStyle.scss';
import {useHistory} from 'react-router-dom';
import { GridListTile,Typography,Paper,Link,Grid} from '@material-ui/core';
import {searchContext} from '../context/search';
const AnimeCard = ({single})=> {
    const move = useHistory();
    const search =  useContext(searchContext);
    const imageUrl = single.image_url;
    const synopsis = single.synopsis.length>30?
    `${single.synopsis.substring(0,30)}...`:single.synopsis;
    const title = single.title.length>15?
    `${single.title.substring(0,15)}...`:single.title;

    const handleClick=()=>{
       console.log(single.mal_id);
      fetch(`https://api.jikan.moe/v3/anime/${single.mal_id}`)
      .then((response)=>response.json())
      .then((data)=>{
          search.setSingleData(data);
          localStorage.setItem('singleData',JSON.stringify(data));
      })
      move.push('./ViewSingle');
    }
    return (
        <GridListTile className="animeCard__container">
          <Grid container item xs={12} >
            <Paper className = "animeCard__paper">
              <img src={imageUrl} alt={title} style={ {maxHeight:300} } />
              <Typography variant="h5" component="h2" className="animeCard__typo">{title}</Typography>
              <Typography variant="body2" component="h2" paragraph={true} className="animeCard__typo" >
                  {synopsis}
              </Typography>
              <Link type="button" variant="body1" style={{marginBottom:0,color:"lightgreen"}} onClick={handleClick} >
               Click for more
              </Link>
            </Paper>
          </Grid>
        </GridListTile>
    );
    
}

export default AnimeCard
