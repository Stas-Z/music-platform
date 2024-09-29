import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlbumSchema, IAlbum } from '../types/album'
import { deleteAlbum } from '../services/deleteAlbum/deleteAlbum'

const initialState: AlbumSchema = {
    album: null,
    error: '',
    isLoading: false,
    onSucces: false,
}
export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setCurrentAlbum: (state, action: PayloadAction<IAlbum>) => {
            state.album = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteAlbum.pending, (state) => {
                state.isLoading = true
                state.onSucces = false
                state.error = undefined
            })
            .addCase(deleteAlbum.fulfilled, (state) => {
                state.isLoading = false
                state.onSucces = true
            })
            .addCase(deleteAlbum.rejected, (state, action) => {
                state.isLoading = false
                state.onSucces = false
                state.error = action.payload
            })
    },
})

export const { actions: albumActions } = albumSlice
export const { reducer: albumReducer } = albumSlice
