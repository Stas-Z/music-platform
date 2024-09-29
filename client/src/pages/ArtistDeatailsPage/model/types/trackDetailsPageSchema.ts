import { IArtist } from '@/src/entities/Artist'

export interface ArtistDetailsPageSchema {
    artist: IArtist | null
    isLoading?: boolean
    error?: string
    onSucces?: boolean
}
