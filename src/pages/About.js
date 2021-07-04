import {Grid,Paper,Typography,Link} from '@material-ui/core';
import anime1 from '../components/anime1.png';
const About = () => {

     return ( 
     <Grid
    container
    direction="row"
    justify="center"
    alignContent="center"
    alignItems = "center"
    className ="about-Grid"
    >
    <Paper elevation={3}  className="about-Paper">
    <img  src={anime1}  alt="" style={{maxHeight:200}} />
    <Typography variant="h5" component="h2" className ="about-Typo" >
            Project: Simple Anime search result viewer<br/>
            with little info on requested results, pulls data from <br/><i>MyAnimeList</i> API<br/>
            Made using : React js,Jikan API<br/>
            Done by: Roshan Purohit<br/>
            <Link href="https://github.com/roshanpurohit" className="about-link">GitHub</Link>
    </Typography>
     </Paper>
     </Grid>
     );
}
 
export default About;