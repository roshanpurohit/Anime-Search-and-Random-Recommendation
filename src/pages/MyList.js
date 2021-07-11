import {Grid,Typography,IconButton} from '@material-ui/core';
import { useContext, useEffect,useState} from 'react';
import { searchContext } from '../context/search';
import { Delete } from '@material-ui/icons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router-dom';
import '../styles/MyList.scss';
const MyList = () => {
  const handleClick=(id)=>{
   
    fetch(`https://api.jikan.moe/v3/anime/${id}`)
    .then((response)=>response.json())
    .then((data)=>{
        search.setSingleData(data);
        localStorage.setItem('singleData',JSON.stringify(data));
    })
    move.push('./ViewSingle');
  }
   
    const search = useContext(searchContext);
    const move = useHistory();
    const [listStatus,setListStatus]=useState(true);
    const handleDelete=(index)=>{
      var temp = [...search.watchList].filter((item,i)=>i!==index);
      search.setWatchList(temp);
    }
    useEffect(()=>{
      search.watchList.length===0?setListStatus(false):setListStatus(true);
      localStorage.setItem("myWatchList",JSON.stringify(search.watchList));
    },[search])
    
    return ( 
    <Grid 
    container
    direction="column"
    alignItems="center"
    alignContent="center"
    justify="center"
    spacing={5}
    >
        <Grid item  xs={12}>
             <Typography  variant="h3" component="h2" className= "heading-typo" >My Watch List </Typography>
           </Grid>
    <Grid item>
    {
        listStatus && search.watchList.map((listItem,i) =>(
            
            <div className="listElement"  key={listItem['id']} >
       <div style={{display:"inline-flex",alignItems:"center"}}  key={listItem['id']}>
        <img src={listItem['image_url']} alt="" style={ {maxHeight:75} } />
        <div key={listItem['id']}>
        <Typography variant="h5" component="h2" className="font-color">{listItem['title']}</Typography> 
        <Typography variant="h6" component="h2" className="font-color">Episodes:{listItem['episodes']}</Typography> 
        </div>
        </div>
       
        <div className="list-buttons">
        <IconButton  onClick={()=>{handleDelete(i)}}><Delete fontSize="large" /></IconButton>
        <IconButton onClick={()=>{handleClick(listItem['id'])}}><ArrowForwardIosIcon  /></IconButton>
        </div>
        </div>
               
        )  )
        
      }
       {
        !listStatus &&  <Typography variant="h5" component="h2" className="font-color">List Empty</Typography> 
              }
      
   </Grid>
   </Grid>



 
     );
}
 
export default MyList;