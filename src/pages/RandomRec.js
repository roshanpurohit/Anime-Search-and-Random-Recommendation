import { useEffect, useState } from "react";
import { Grid,Typography,Paper,Button, Link } from "@material-ui/core";
import Cached from  "@material-ui/icons/Cached";
const  RandomRec = () => {
  const  [randomId,setRandom] = useState(Math.floor(Math.random()*1000 + 1));
  const [ data,setData]  = useState(null);
  const[serverError,setServerError] = useState(false);
  
    const handleClick=()=>{
       setRandom(0);
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
      
    },[randomId])
    return (
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        spacing = {3}
         >
          {!serverError && (<Grid item  xs={12}>
             <Typography  variant="h3" component="h2" className= "random-typo" >Recommendation for you </Typography>
           </Grid>) }
           {
             data && (
           <Grid item>
             
           <img src={data.image_url} alt="" style= {{maxHeight:300}} className="random-image" />
         
           </Grid> )
}
 {     data && (
        <Grid item>
            <Button   className="button-color">
             <Cached  onClick={handleClick} fontSize="large" />
             </Button>
         
            </Grid> )}
           <Grid item>
           
             <Paper elevation={4}  className= "recommend-paper">
                { 
                
                   (data  &&  ( 
                    <div className= "recommend-paper">
                 
               {/* <Typography variant="h4" component="h2"  className= "font-color" >
                
                 </Typography> */}
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