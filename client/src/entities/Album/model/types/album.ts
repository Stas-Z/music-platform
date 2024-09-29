import { IArtist } from '@/src/entities/Artist'
import { ITrack } from '@/src/entities/Track'

export interface IAlbum {
    _id: string
    name: string
    picture: string
    artist?: IArtist
    tracks?: ITrack[]
}

export interface AlbumSchema {
    album: IAlbum | null
    isLoading?: boolean
    error?: string
    onSucces?: boolean
}
