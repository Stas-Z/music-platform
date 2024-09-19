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
import { addTrackReducer } from '@/src/features/AddNewTrack/model/slices/addTrackSlice'

const rootReducer = combineReducers({
    track: trackReducer,
    trackPage: trackPageReducer,
    addTrack: addTrackReducer,
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
    }
}

export type NextThunkDispatch = ThunkDispatch<RootState, void, UnknownAction>

export type RootState = ReturnType<typeof rootReducer>
