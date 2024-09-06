import { ITrack } from '@/src/entities/Track'

export interface TrackPageSchema {
    tracks: ITrack[]
    isLoading?: boolean
    error?: string
}
