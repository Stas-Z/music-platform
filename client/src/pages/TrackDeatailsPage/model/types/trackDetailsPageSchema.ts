import { ITrack } from '@/src/entities/Track'

export interface TrackDetailsPageSchema {
    track: ITrack | null
    isLoading?: boolean
    error?: string
    onSucces?: boolean
}
