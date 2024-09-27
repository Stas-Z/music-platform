import { lazy } from 'react'

export const CreateNewTrackPageAsync = lazy(
    () => import('./CreateNewTrackPage'),
)
