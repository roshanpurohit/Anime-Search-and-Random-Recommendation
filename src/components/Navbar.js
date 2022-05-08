import { Navbar, Nav, Button, FormControl, Form } from "react-bootstrap";
import { IconButton } from "@mui/material";
import { Snackbar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { useContext } from "react";
import { searchContext } from "../context/search";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import "../styles/Navbar.scss";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const NavBar = () => {
    const search = useContext(searchContext);
    const move = useHistory();
    const [open, setOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [input, setInput] = useState("");
    const handleClose = () => {
        setOpen(false);
    };
    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    };
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
                console.log("closed!");
                move.push("./results");
            })
            .catch((err) => {
                console.log(err);
                setOpen(false);
                setSnackBarOpen(true);
            });
    };
    return (
        <Navbar className="navbar-color" expand="lg" variant="light" position="sticky">
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
                Fetching Data...
            </Backdrop>
            <Navbar.Brand
                href="/Anime-Search-and-Random-Recommendation/#/"
                style={{ color: "pink", fontFamily: "DELIRIUM NCV", fontSize: "60px", padding: "0px" }}
            >
                 <img
                    src="https://i.ibb.co/23cTvqw/556-5560500-giorno-giovanna-png.png"
                    alt="556-5560500-giorno-giovanna-png"
                    style={{maxHeight:'100px'}}
                />
                ANIME LIST
               
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline onSubmit={handleSubmit} className="navbar-form">
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="navbar-searchBar"
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                        />
                        <IconButton
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!input}
                            className="navbar-iconButton"
                            onClick={handleSubmit}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Form>
                    <Nav.Link href="/Anime-Search-and-Random-Recommendation/">
                        <Button variant="custom" className="navbar-button">
                            Home
                        </Button>{" "}
                    </Nav.Link>
                    <Nav.Link href="/Anime-Search-and-Random-Recommendation/#/MyList">
                        <Button variant="custom" className="navbar-button">
                            My Watchlist
                        </Button>
                    </Nav.Link>
                    <Nav.Link href="/Anime-Search-and-Random-Recommendation/#/about">
                        <Button variant="custom" className="navbar-button">
                            About
                        </Button>
                    </Nav.Link>
                </Navbar.Collapse>
            </Nav>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                open={snackBarOpen}
                autoHideDuration={3000}
                onClose={handleSnackBarClose}
            >
                <Alert onClose={handleSnackBarClose} severity="error">
                    Could not Fetch data!
                </Alert>
            </Snackbar>
        </Navbar>
    );
};

export default NavBar;
