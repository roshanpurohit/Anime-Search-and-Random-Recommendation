import { createContext } from 'react';
export const searchContext = createContext(
    {
        animeData:[] ,
        singleData:{},
        search:()=>{},
        setData:()=>{},
        setSingleData:()=>{}
    }
) 

