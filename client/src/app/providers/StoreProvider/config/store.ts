import { trackReducer } from '@/src/entities/Track'
import {
    Action,
    combineReducers,
    configureStore,
    ThunkDispatch,
    UnknownAction,
} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { ThunkExtraArg } from './StateSchema'
import { $api } from '@/src/shared/api/api'
import { trackPageReducer, TrackPageSchema } from '@/src/pages/TrackPage'
import { addTrackReducer } from '@/src/features/AddNewTrack'
import { artistReducer } from '@/src/entities/Artist'
import { addArtistReducer } from '@/src/features/AddNewArtist'
import {
    trackDetailsPageReducer,
    TrackDetailsPageSchema,
} from '@/src/pages/TrackDeatailsPage'
import { artistPageReducer, ArtistsPageSchema } from '@/src/pages/ArtistsPage'
import {
    artistDetailsPageReducer,
    ArtistDetailsPageSchema,
} from '@/src/pages/ArtistDeatailsPage'
import { albumReducer } from '@/src/entities/Album'
import { addAlbumReducer } from '@/src/features/AddNewAlbum'

const rootReducer = combineReducers({
    track: trackReducer,
    artist: artistReducer,
    trackPage: trackPageReducer,
    trackDetailsPage: trackDetailsPageReducer,
    addTrack: addTrackReducer,
    addArtist: addArtistReducer,
    artistPage: artistPageReducer,
    artistDetailsPage: artistDetailsPageReducer,
    album: albumReducer,
    addAlbum: addAlbumReducer,
})

const extraArg: ThunkExtraArg = {
    api: $api,
}

export const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }),
    })

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export interface HydrateAction
    extends Action<'__NEXT_REDUX_WRAPPER_HYDRATE__'> {
    payload: {
        trackPage: TrackPageSchema
        trackDetailsPage: TrackDetailsPageSchema
        artistPage: ArtistsPageSchema
        artistDetailsPage: ArtistDetailsPageSchema
    }
}

export type NextThunkDispatch = ThunkDispatch<RootState, void, UnknownAction>

export type RootState = ReturnType<typeof rootReducer>
