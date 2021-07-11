import { createContext } from 'react';
export const searchContext = createContext(
    {
        animeData:[] ,
        singleData:{},
        watchList:[],
        setWatchList:()=>{},
        search:()=>{},
        setData:()=>{},
        setSingleData:()=>{}
    }
) 

