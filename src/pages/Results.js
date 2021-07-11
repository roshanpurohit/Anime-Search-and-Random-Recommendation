import { useEffect,useContext, useState} from 'react';
import {searchContext} from '../context/search';
import AnimeList from '../components/AnimeList';
import {Box,Typography} from '@material-ui/core';
const Results = () => {
    const search = useContext(searchContext);
    const [ dataStatus, setDataStatus] =  useState(true);
    useEffect(()=>{
        if(search.animeData=== undefined || search.animeData.length=== 0)
        {
            try{
            search.setData(JSON.parse(localStorage.getItem('myData')));
            
             }
        catch(error){
            console.log(error);
            setDataStatus(false);
        }
        
        }
     },[search])
    return (<Box mt={2}>
             { (dataStatus && <AnimeList data={search.animeData} />) || (!dataStatus && 
              <Typography variant="h4" className="home-typo">Data Empty!</Typography>)
              }
            </Box>);
}
 
export default Results;