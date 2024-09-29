import { IArtist } from '@/src/entities/Artist'

export interface ArtistsPageSchema {
    artists: IArtist[]
    isLoading?: boolean
    error?: string
    onSucces?: boolean
}
