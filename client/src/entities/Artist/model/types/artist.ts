import { ITrack } from '@/src/entities/Track'

export interface IArtist {
    _id: string
    name: string
    picture: string
    text?: string
    albums?: string
    tracks?: ITrack[]
}

export interface ArtistSchema {
    artist: IArtist | null
    artists: IArtist[]
    isLoading?: boolean
    error?: string
}
