import { Typography } from '@material-ui/core';
import React, { useContext, useState,useEffect } from 'react'
import AnimeInfo from '../components/AnimeInfo';
import {searchContext} from '../context/search';
import {Box} from '@material-ui/core';

const ViewSingle=()=>{
    const search = useContext(searchContext);
    const [dataStatus,setDataStatus]=useState(true);
    
 useEffect(()=>{
    
    if(search.singleData === undefined || Object.keys(search.singleData).length === 0)
        {
            
            try{
                  search.setSingleData(JSON.parse(localStorage.getItem('singleData')));
                }
        catch (error){
            console.log(error);
            setDataStatus(false);
        }
        
        }
       
    },[search])
    
    return( <Box mt={12}>{
        ( dataStatus && <AnimeInfo info={search.singleData} /> ) || (<Typography variant="h4" component="h2">
     Data Empty!
     </Typography>)
      }
     </Box>
     
     );
         
    
    
    
}

export default ViewSingle
