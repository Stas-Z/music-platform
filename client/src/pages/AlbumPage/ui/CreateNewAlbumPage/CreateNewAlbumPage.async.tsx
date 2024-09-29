import { lazy } from 'react'

export const CreateNewAlbumPageAsync = lazy(
    () => import('./CreateNewAlbumPage'),
)
