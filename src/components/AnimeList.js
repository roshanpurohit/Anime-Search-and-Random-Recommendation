import React from 'react'
import AnimeCard from './AnimeCard';
import {GridList} from '@material-ui/core';
const AnimeList=({data}) =>{
    return <GridList>{
       
        data.map((anime) => (
            <AnimeCard key={anime.mal_id} single={anime} />
        ))}
        </GridList>
    
};

export default AnimeList
