import React from "react";
import AnimeCard from "./AnimeCard";
import { GridList } from "@material-ui/core";
const AnimeList = ({ data }) => {
    return data ? (
        <GridList>
            {" "}
            {data.map((anime) => (
                <AnimeCard key={anime.mal_id} single={anime} />
            ))}
            )
        </GridList>
    ) : (
        <p>No Data </p>
    );
};

export default AnimeList;
