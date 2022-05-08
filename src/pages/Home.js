import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { searchContext } from "../context/search";
import { FormControl, Input, IconButton, Snackbar } from "@material-ui/core";
import { Backdrop, CircularProgress } from "@mui/material";
import MuiAlert from "@material-ui/lab/Alert";
import "../styles/Home.scss";
import axios from "axios";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Home = () => {
    const [open, setOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };
    const search = useContext(searchContext);
    const move = useHistory();
    const [input, setInput] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true);
        axios
            .get(`https://api.jikan.moe/v3/search/anime?q=${input}&limit=30`)
            .then((data) => {
                data = data.data;
                search.setData(data.results);
                localStorage.setItem("myData", JSON.stringify(data.results));
                setOpen(false);
                move.push("./results");
            })
            .catch((err) => {
                console.log(err);
                setOpen(false);
                setSnackBarOpen(true);
            });
    };
    const handleRecommendClick = () => {
        move.push("./random-recommendation");
    };
    const handleListClick = () => {
        move.push("./MyList");
    };

    return (
        <div className="home-outer">
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
                Fetching Data...
            </Backdrop>
            <div className="home-recommend" onClick={handleRecommendClick}>
                <div
                    style={{
                        margin: "20px",
                        border: "3px solid pink",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    Recommend
                    <img
                        src="https://i.ibb.co/sChpJ3r/kindpng-4816161.png"
                        style={{ maxHeight: "75px", maxWidth: "75px" }}
                        alt=""
                        border="0"
                    />
                    Random Anime
                </div>
            </div>
            <div className="home-search">
                <div className="home-watchlist-button" onClick={handleListClick}>
                    <div
                        style={{
                            margin: "20px",
                            border: "3px solid pink",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        My Watch List
                        <img
                            src="https://i.ibb.co/SQLC1RL/Seek-Png-com-umaru-png-1870819.png"
                            style={{ maxHeight: "70px", maxWidth: "60px", alignSelf: "center" }}
                        />
                    </div>
                </div>

                <form className="home-form">
                    <FormControl type="submit" className="home-FormControl">
                        <Input
                            placeholder="Search for your favourite anime..."
                            className="home-input"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                        />
                        <IconButton
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!input}
                            className="home-iconButton"
                            onClick={handleSubmit}
                        >
                            <img
                                src="https://i.ibb.co/JzTfkYX/Animes-que-podr-an-ser-series.jpg"
                                style={{ height: "90px", width: "75px", alignSelf: "center" }}
                            />
                        </IconButton>
                    </FormControl>
                </form>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={snackBarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackBarClose}
                >
                    <Alert onClose={handleSnackBarClose} severity="error">
                        Could not Fetch data!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default Home;
