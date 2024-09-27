import { lazy } from 'react'

export const CreateNewArtistPageAsync = lazy(
    () => import('./CreateNewArtistPage'),
)
