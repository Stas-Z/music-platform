import { createSlice } from '@reduxjs/toolkit'
import { AddArtistSchema } from '../types/addArtistSchema'
import { addArtist } from '../services/addArtist/addArtist'
import { deleteArtist } from '../services/deleteArtist/deleteArtist'

const initialState: AddArtistSchema = {
    isLoading: false,
    onSucces: false,
    error: '',
}

export const addArtistSlice = createSlice({
    name: 'addArtist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addArtist.pending, (state) => {
                state.isLoading = true
                state.onSucces = false
                state.error = undefined
            })
            .addCase(addArtist.fulfilled, (state) => {
                state.isLoading = false
                state.onSucces = true
            })
            .addCase(addArtist.rejected, (state, action) => {
                state.isLoading = false
                state.onSucces = false
                state.error = action.payload
            })
            .addCase(deleteArtist.pending, (state) => {
                state.isLoading = true
                state.onSucces = false
                state.error = undefined
            })
            .addCase(deleteArtist.fulfilled, (state) => {
                state.isLoading = false
                state.onSucces = true
            })
            .addCase(deleteArtist.rejected, (state, action) => {
                state.isLoading = false
                state.onSucces = false
                state.error = action.payload
            })
    },
})

export const { actions: addArtistActions } = addArtistSlice
export const { reducer: addArtistReducer } = addArtistSlice
