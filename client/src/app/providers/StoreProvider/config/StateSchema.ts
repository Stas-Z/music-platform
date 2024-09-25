import { ArtistSchema } from '@/src/entities/Artist/model/types/artist'
import { TrackSchema } from '@/src/entities/Track'
import { AddTrackSchema } from '@/src/features/AddNewTrack/model/types/addTrackSchema'
import { TrackPageSchema } from '@/src/pages/TrackPage'
import { AxiosInstance } from 'axios'

export interface StateSchema {
    track: TrackSchema
    artist: ArtistSchema
    trackPage: TrackPageSchema
    addTrack: AddTrackSchema
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
