import { createSlice } from '@reduxjs/toolkit'
import { Http } from '../apiService'

const initialState = {
    data: [],
    loading: true,
    singleBeerLoading: true,
    currentBeerDetails: {}
}

export const beerSlice = createSlice({
    name: 'beer',
    initialState,
    reducers: {
        storeBeerData: (state, action) => {
            state.data = action.payload
        },
        endLoading: (state, action) => {
            switch (action.payload) {
                case 'all':
                    state.loading = false;
                    break;
                case 'single':
                    state.singleBeerLoading = false;
            }

        },
        startLoading: (state, action) => {
            switch (action.payload) {
                case 'all':
                    state.loading = true;
                    break;
                case 'single':
                    state.singleBeerLoading = true;
            }

        },
        storeSingleBeerData: (state, action) => {
            state.currentBeerDetails = action.payload
        },
        resetState: (state) => {
            state.data = [];
            state.currentBeerDetails = {};
            state.loading = false;
            state.singleBeerLoading = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { storeBeerData, endLoading, startLoading, storeSingleBeerData, resetState } = beerSlice.actions;

export const getBeers = (params) => (dispatch) => {
    Http.get(`/beers${params}`).then((data) => {
        dispatch(storeBeerData(data.data))
        dispatch(endLoading('all'))
    }).catch((err) => {
        console.log(err);
        dispatch(endLoading('all'));
        dispatch(resetState());
    })
};

export const getSingleBeer = (id) => (dispatch) => {
    Http.get(`/beers/${id}`).then((data) => {
        dispatch(storeSingleBeerData(data.data[0]))
        dispatch(endLoading('single'))
    }).catch((err) => {
        console.log(err);
        dispatch(endLoading('single'));
        dispatch(resetState());
    })
};

export default beerSlice.reducer