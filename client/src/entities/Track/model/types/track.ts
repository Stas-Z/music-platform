import { IArtist } from '@/src/entities/Artist'

export interface IComment {
    _id: string
    username: string
    text: string
}

export interface ITrack {
    _id: string
    name: string
    artist: IArtist
    text: string
    listens: number
    picture: string
    audio: string
    comments: IComment[]
}

export interface TrackSchema {
    activeTrack: null | ITrack
    volume: number
    duration: number
    currentTime: number
    pause: boolean

    isLoading?: boolean
    error?: string
    onSucces?: boolean
}
