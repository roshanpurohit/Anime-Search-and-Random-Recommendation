import { useEffect, useState, useContext } from "react";
import { Grid, Typography, Paper, Button, Link, Snackbar, Tooltip } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Cached from "@material-ui/icons/Cached";
import AddIcon from "@material-ui/icons/Add";
import { searchContext } from "../context/search";
import "../styles/RandomRec.scss";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const RandomRec = () => {
    const [open, setOpen] = useState(false);
    const [randomId, setRandom] = useState(Math.floor(Math.random() * 1000 + 1));
    const [resultData, setResultData] = useState(null);
    const [serverError, setServerError] = useState(false);
    const search = useContext(searchContext);

    const handleClick = () => {
        setRandom(0);
    };
    const handleListClick = () => {
        var temp = [...search.watchList];
        temp.push({
            title: resultData.title,
            episodes: resultData.episodes ? resultData.episodes : "N/A",
            id: resultData.mal_id,
            url: resultData.url,
            image_url: resultData.image_url,
        });
        let object = temp.map(JSON.stringify);
        let set = new Set(object);
        temp = Array.from(set).map(JSON.parse);
        search.setWatchList(temp);
        setOpen(true);
    };
    const handleClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${randomId}`)
            .then((response) => {
                if (!response.ok) {
                    if (response.status >= 400 && response.status < 500) {
                        response.json().then((data) => {
                            console.log(data.error);
                            console.log("Trying another ID...");
                            setRandom(Math.floor(Math.random() * 1000 + 1));
                        });
                    } else {
                        console.log("Server is unavailable");
                        setServerError(true);
                    }
                } else {
                    response.json().then((data) => {
                          setResultData(data.data);

                    });
                   
                }
            })
            .catch((err) => {
                console.log(err);
                setServerError(true);
            });
    }, [randomId, search]);

    return (
        <Grid container direction="row" justify="center" alignItems="center" alignContent="center" spacing={3}>
            {resultData && (
                <div style={{padding:"30px",rowGap:"20px"}}>
                        <Typography variant="h1" component="h2" className="random-typo">
                        <u>{resultData.title}</u> 
                        </Typography>
               
                
                <Grid item>
                <div style={{display:'flex',flexDirection:"row",columnGap:"20px",padding:"30px"}}>
                    <img src={resultData.images.jpg.image_url} alt="" style={{ maxHeight: 300 }} className="random-image" key={resultData.images.jpg.image_url} />
                
           
                <div className="random-buttons">
                    <Grid item>
                        <Tooltip title="Recommend something else" placement="right">
                            <Button className="button-color">
                                <Cached onClick={handleClick} fontSize="large" />
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Button variant="custom" className="button-color" onClick={handleListClick}>
                            <font family="Product Sans" size="5">
                                Add to Watch List
                            </font>
                            <AddIcon />
                        </Button>
                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            open={open}
                            autoHideDuration={2000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity="success">
                                {resultData.title} added to watchlist!
                            </Alert>
                        </Snackbar>
                        
                    </Grid>
                    </div>
                    </div>


                
                </Grid>
                </div>
            ) }
            <Grid item>
                <Paper elevation={4} className="recommend-paper">
                    {(resultData  && (
                        <div className="recommend-paper">
                            <div className="inner-recommend-paper">
                                <Typography variant="h5" component="h2" className="font-color" paragraph={true}>
                                    <b>
                                        <u>Title:</u>
                                    </b>{" "}
                                    {resultData.title}
                                    <br />
                                    <b>
                                        <u>Synopsis:</u>
                                    </b>{" "}
                                    {resultData.synopsis}
                                    <br />
                                    <Link href={resultData.url} className="about-link">
                                        MyAnimeList
                                    </Link>
                                </Typography>
                            </div>
                        </div>
                    )) ||
                        (!serverError && <p className="loading">Generating Recommendation</p>) ||
                        (serverError && (
                            <Typography variant="h4" component="h2" className="font-color">
                                Server is unavailable at the moment
                                <br />
                                Try Again Later
                            </Typography>
                        ))}
                </Paper>
            </Grid>
        </Grid>
        // <div>
        //     Hello!
        // </div>
    );
};

export default RandomRec;
