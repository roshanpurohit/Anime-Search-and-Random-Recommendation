import { Grid, Paper, Typography, Link, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import "./singleViewStyle.scss";
import { useContext, useState } from "react";
import { searchContext } from "../context/search";
import "../styles/AnimeInfo.scss";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AnimeInfo = ({ info }) => {
    const search = useContext(searchContext);
    const [open, setOpen] = useState(false);
    const { title, image_url, episodes, rating, airing, broadcast, score, url, mal_id } = info;
    const handleListClick = () => {
        var temp = [...search.watchList];
        temp.push({ title: title, episodes: episodes ? episodes : "N/A", id: mal_id, url: url, image_url: image_url });
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

    return (
        <Grid container spacing={10} direction="row" justify="center" alignItems="center" alignContent="center">
            <Grid item>
                <div className="imageClass">
                    <img src={image_url} alt="" style={{ maxHeight: 250, border: "5px solid #fff" }} key={image_url} />
                </div>
            </Grid>

            <Paper elevation={3} className="singleView-paper">
                {info ? (
                    <div
                        style={{
                            margin: "0px",
                            border: "3px solid pink",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "15px",
                        }}
                    >
                        <Typography variant="h5" component="h2" className="singleView-typo">
                            Title:{title}
                        </Typography>
                        <Typography variant="h5" component="h2" className="singleView-typo">
                            Airing:{airing ? "Yes" : "No"}
                        </Typography>
                        <Typography variant="h5" component="h2" className="singleView-typo">
                            Broadcast:{broadcast ? broadcast : "N/A"}
                        </Typography>
                        <Typography variant="h5" component="h2" className="singleView-typo">
                            Score:{score ? score : "N/A"}
                        </Typography>
                        <Typography variant="h5" component="h2" className="singleView-typo">
                            Rating:{rating ? rating : "N/A"}
                        </Typography>
                        <Typography variant="h5" component="h2" className="singleView-typo">
                            Episodes:{episodes ? episodes : "N/A"}
                        </Typography>
                        <Link type="button" variant="body1" href={url} style={{ color: "lightgreen" }}>
                            MyAnimeList
                        </Link>
                        <br />
                        <Button variant="outlined" className="button-color" onClick={handleListClick}>
                            <font family="Product Sans">Add to Watch List</font>
                            <AddIcon />
                        </Button>
                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity="success">
                                {title} added to watchlist!
                            </Alert>
                        </Snackbar>
                    </div>
                ) : (
                    <Skeleton animation="wave" />
                )
                }
            </Paper>
        </Grid>
    );
};

export default AnimeInfo;
