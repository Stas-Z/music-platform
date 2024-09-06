import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './TrackDeatailsPage.module.scss'
import { ITrack, TrackDetails } from '@/src/entities/Track'

const TrackDeatailsPage = () => {
    const track: ITrack = {
        _id: '1',
        name: 'Трек 1',
        artist: 'Исполнитель 1',
        text: 'Какой то текст',
        listens: 5,
        audio: '',
        picture: '',
        comments: [],
    }
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
            <TrackDetails track={track} />
        </>
    )
}

export default memo(TrackDeatailsPage)
