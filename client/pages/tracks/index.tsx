import { Box, Button, Card, Grid } from '@mui/material'
import React from 'react'
import cls from '@/styles/tracks.module.scss'
import { useRouter } from 'next/router'
import { ITrack } from '@/types/track'
import TrackList from '@/components/TrackList'

const Index = () => {
    const route = useRouter()
    const tracks: ITrack[] = [
        {
            _id: '1',
            name: 'Трек 1',
            artist: 'Исполнитель 1',
            text: 'Какой то текст',
            listens: 5,
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/22cd24b0-6489-4c08-a093-fcce69f0267c.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/0670f285-6757-46b2-8297-9c15dd7e3cb9.jpg',
            comments: [],
        },
        {
            _id: '2',
            name: 'Трек 2',
            artist: 'Исполнитель 1',
            text: 'Какой то текст',
            listens: 5,
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/22cd24b0-6489-4c08-a093-fcce69f0267c.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/0670f285-6757-46b2-8297-9c15dd7e3cb9.jpg',
            comments: [],
        },
        {
            _id: '3',
            name: 'Трек 3',
            artist: 'Исполнитель 1',
            text: 'Какой то текст',
            listens: 5,
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/22cd24b0-6489-4c08-a093-fcce69f0267c.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/0670f285-6757-46b2-8297-9c15dd7e3cb9.jpg',
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

export default Index
