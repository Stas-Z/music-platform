import { Box, Button, Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './TrackPage.module.scss'
import { ITrack, TrackList } from '@/src/entities/Track'

const TackPage = () => {
    const route = useRouter()
    const tracks: ITrack[] = [
        {
            _id: '1',
            name: 'Трек 1',
            artist: 'Исполнитель 1',
            text: 'Какой то текст',
            listens: 5,
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/734f4159-4511-40a5-b30d-f4b69de65108.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/719b688a-2d34-41a0-99ac-bb94d6a76a97.jpg',
            comments: [],
        },
        {
            _id: '2',
            name: 'Трек 2',
            artist: 'Исполнитель 1',
            text: 'Какой то текст',
            listens: 5,
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/734f4159-4511-40a5-b30d-f4b69de65108.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/719b688a-2d34-41a0-99ac-bb94d6a76a97.jpg',
            comments: [],
        },
        {
            _id: '3',
            name: 'Трек 3',
            artist: 'Исполнитель 1',
            text: 'Какой то текст',
            listens: 5,
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/734f4159-4511-40a5-b30d-f4b69de65108.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/719b688a-2d34-41a0-99ac-bb94d6a76a97.jpg',
            comments: [],
        },
    ]
    return (
        <Grid container justifyContent="center">
            <Card className={cls.card}>
                <Box p={3}>
                    <Grid container justifyContent="space-between">
                        <h1>Список треков</h1>
                        <Button onClick={() => route.push('/tracks/create')}>
                            Загрузить
                        </Button>
                    </Grid>
                </Box>
                <TrackList tracks={tracks} />
            </Card>
        </Grid>
    )
}

export default memo(TackPage)
