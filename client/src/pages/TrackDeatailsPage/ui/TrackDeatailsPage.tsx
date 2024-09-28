import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './TrackDeatailsPage.module.scss'
import { ITrack, TrackDetails } from '@/src/entities/Track'

interface TrackDeatailsPageProps {
    serverTrack: ITrack
}

const TrackDeatailsPage = ({ serverTrack }: TrackDeatailsPageProps) => {
    const router = useRouter()

    return (
        <>
            <Button
                variant="outlined"
                className={cls.button}
                onClick={() => router.push('/tracks')}
            >
                К списку
            </Button>
            <TrackDetails track={serverTrack} />
        </>
    )
}

export default memo(TrackDeatailsPage)
