import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchArtistsList } from '../services/fetchArtistsList/fetchArtistsList'
import { HYDRATE } from 'next-redux-wrapper'
import { HydrateAction } from '@/src/app/providers/StoreProvider'
import { ArtistsPageSchema } from '../types/artistsPageSchema'
import { IArtist } from '@/src/entities/Artist'

const initialState: ArtistsPageSchema = {
    artists: [],
    error: '',
    isLoading: false,
    onSucces: false,
}
export const artistsPageSlice = createSlice({
    name: 'artistsPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action: HydrateAction) => {
                return { ...state, ...action.payload.artistPage }
            })
            .addCase(fetchArtistsList.pending, (state) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(
                fetchArtistsList.fulfilled,
                (state, action: PayloadAction<IArtist[]>) => {
                    state.isLoading = false
                    state.artists = action.payload
                },
            )
            .addCase(fetchArtistsList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: artistPageActions } = artistsPageSlice
export const { reducer: artistPageReducer } = artistsPageSlice
