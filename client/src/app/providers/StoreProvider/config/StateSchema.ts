import { TrackSchema } from '@/src/entities/Track'
import { TrackPageSchema } from '@/src/pages/TrackPage'
import { AxiosInstance } from 'axios'

export interface StateSchema {
    track: TrackSchema
    trackPage: TrackPageSchema
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
