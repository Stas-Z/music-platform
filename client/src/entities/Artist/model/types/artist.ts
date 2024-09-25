import { ITrack } from '@/src/entities/Track'

export interface IArtist {
    _id: string
    name: string
    picture: string
    albums?: string
    tracks?: ITrack[]
}

export interface ArtistSchema {
    artists: IArtist[]
    isLoading?: boolean
    error?: string
}
