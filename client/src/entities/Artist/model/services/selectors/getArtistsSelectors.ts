import { StateSchema } from '@/src/app/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getArtistList = (state: StateSchema) => state.artist.artists || []

export const getArtistById = (id: string) =>
    createSelector(getArtistList, (artists) =>
        artists.find((artist) => artist._id === id),
    )

export const getArtistNameById = (id: string) =>
    createSelector(getArtistList, (artists) => {
        const artist = artists.find((artist) => artist._id === id)
        return artist?.name
    })
