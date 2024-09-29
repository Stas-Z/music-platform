import { AlbumSchema } from '@/src/entities/Album'
import { ArtistSchema } from '@/src/entities/Artist'
import { TrackSchema } from '@/src/entities/Track'
import { AddAlbumSchema } from '@/src/features/AddNewAlbum'
import { AddArtistSchema } from '@/src/features/AddNewArtist'
import { AddTrackSchema } from '@/src/features/AddNewTrack'
import { ArtistDetailsPageSchema } from '@/src/pages/ArtistDeatailsPage'
import { ArtistsPageSchema } from '@/src/pages/ArtistsPage'
import { TrackDetailsPageSchema } from '@/src/pages/TrackDeatailsPage'
import { TrackPageSchema } from '@/src/pages/TrackPage'
import { AxiosInstance } from 'axios'

export interface StateSchema {
    track: TrackSchema
    trackPage: TrackPageSchema
    trackDetailsPage: TrackDetailsPageSchema
    addTrack: AddTrackSchema

    artist: ArtistSchema
    artistPage: ArtistsPageSchema
    artistDetailsPage: ArtistDetailsPageSchema
    addArtist: AddArtistSchema

    album: AlbumSchema
    addAlbum: AddAlbumSchema
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
