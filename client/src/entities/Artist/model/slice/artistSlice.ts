import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArtistSchema, IArtist } from '../types/artist'
import { deleteArtist } from '../services/deleteArtist/deleteArtist'

const initialState: ArtistSchema = {
    artist: null,
    error: '',
    isLoading: false,
    onSucces: false,
}
export const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        setCurrentArtist: (state, action: PayloadAction<IArtist>) => {
            state.artist = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
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

export const { actions: artistActions } = artistSlice
export const { reducer: artistReducer } = artistSlice
