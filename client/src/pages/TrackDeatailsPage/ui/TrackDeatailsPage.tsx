import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './TrackDeatailsPage.module.scss'
import { ITrack, TrackDetails } from '@/src/entities/Track'
import { useAppSelector } from '@/src/shared/lib/hooks/useAppSelector/useAppSelector'
import { getArtistById, getArtistNameById } from '@/src/entities/Artist'

interface TrackDeatailsPageProps {
    serverTrack: ITrack
}

const TrackDeatailsPage = ({ serverTrack }: TrackDeatailsPageProps) => {
    const router = useRouter()
    const artistName = useAppSelector(getArtistNameById(serverTrack.artistId))

    return (
        <>
            <Button
                variant="outlined"
                className={cls.button}
                onClick={() => router.push('/tracks')}
            >
                К списку
            </Button>
            <TrackDetails track={serverTrack} artist={artistName} />
        </>
    )
}

export default memo(TrackDeatailsPage)
