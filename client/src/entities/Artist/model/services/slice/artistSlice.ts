import { PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/src/shared/lib/store'
import { ArtistSchema, IArtist } from '../../types/artist'
import { fetchArtistsList } from '../fetchArtistsList/fetchArtistsList'
import { HYDRATE } from 'next-redux-wrapper'
import { HydrateAction } from '@/src/app/providers/StoreProvider'
import { fetchArtistById } from '../fetchArtistById/fetchArtistById'

const initialState: ArtistSchema = {
    artist: null,
    artists: [],
    error: '',
    isLoading: false,
}
export const artistSlice = buildSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action: HydrateAction) => {
                return { ...state, ...action.payload.artist }
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
            .addCase(fetchArtistById.pending, (state) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(
                fetchArtistById.fulfilled,
                (state, action: PayloadAction<IArtist>) => {
                    state.isLoading = false
                    state.artist = action.payload
                },
            )
            .addCase(fetchArtistById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: artistActions } = artistSlice
export const { reducer: artistReducer } = artistSlice
export const { useActions: useArtistActions } = artistSlice
