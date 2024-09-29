import { createSlice } from '@reduxjs/toolkit'
import { AddAlbumSchema } from '../types/addAlbumSchema'
import { addAlbum } from '../services/addAlbum/addAlbum'

const initialState: AddAlbumSchema = {
    isLoading: false,
    onSucces: false,
    error: '',
}

export const addAlbumSlice = createSlice({
    name: 'addArtist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAlbum.pending, (state) => {
                state.isLoading = true
                state.onSucces = false
                state.error = undefined
            })
            .addCase(addAlbum.fulfilled, (state) => {
                state.isLoading = false
                state.onSucces = true
            })
            .addCase(addAlbum.rejected, (state, action) => {
                state.isLoading = false
                state.onSucces = false
                state.error = action.payload
            })
    },
})

export const { actions: addAlbumActions } = addAlbumSlice
export const { reducer: addAlbumReducer } = addAlbumSlice
