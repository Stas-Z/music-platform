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
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/953da90a-0c9c-41eb-8b28-fd41adc69e76.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/8d99c1b7-559d-431a-a4c4-385f041bd3c3.jpg',
            comments: [],
        },
        {
            _id: '2',
            name: 'Трек 2',
            artist: 'Исполнитель 1',
            text: 'Какой то текст',
            listens: 5,
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/953da90a-0c9c-41eb-8b28-fd41adc69e76.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/8d99c1b7-559d-431a-a4c4-385f041bd3c3.jpg',
            comments: [],
        },
        {
            _id: '3',
            name: 'Трек 3',
            artist: 'Исполнитель 1',
            text: 'Какой то текст',
            listens: 5,
            audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/953da90a-0c9c-41eb-8b28-fd41adc69e76.mp3',
            picture:
                'http://localhost:5000/66769f704292af4ccf67de40/image/8d99c1b7-559d-431a-a4c4-385f041bd3c3.jpg',
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
