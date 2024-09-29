import { IAlbum } from '@/src/entities/Album'
import { ITrack } from '@/src/entities/Track'

export interface IArtist {
    _id: string
    name: string
    picture: string
    text?: string
    albums?: IAlbum[]
    tracks?: ITrack[]
}

export interface ArtistSchema {
    artist?: IArtist | null
    isLoading?: boolean
    error?: string
    onSucces?: boolean
}
