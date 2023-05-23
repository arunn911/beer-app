import { configureStore } from '@reduxjs/toolkit'
import beerReducer from "./redux/beerSlice"
export const store = configureStore({
    reducer: {
        beers: beerReducer
    }, 
})