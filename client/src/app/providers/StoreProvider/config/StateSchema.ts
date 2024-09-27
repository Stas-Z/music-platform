import { ArtistSchema } from '@/src/entities/Artist'
import { TrackSchema } from '@/src/entities/Track'
import { AddArtistSchema } from '@/src/features/AddNewArtist'
import { AddTrackSchema } from '@/src/features/AddNewTrack'
import { TrackPageSchema } from '@/src/pages/TrackPage'
import { AxiosInstance } from 'axios'

export interface StateSchema {
    track: TrackSchema
    artist: ArtistSchema
    trackPage: TrackPageSchema
    addTrack: AddTrackSchema
    addArtist: AddArtistSchema
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
