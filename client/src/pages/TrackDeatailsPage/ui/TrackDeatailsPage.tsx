import { Button, Grid, TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './TrackDeatailsPage.module.scss'
import { ITrack } from '@/src/entities/Track'

const TrackDeatailsPage = () => {
    const track: ITrack = {
        _id: '1',
        name: 'Трек 1',
        artist: 'Исполнитель 1',
        text: 'Какой то текст',
        listens: 5,
        audio: 'http://localhost:5000/66769f704292af4ccf67de40/audio/22cd24b0-6489-4c08-a093-fcce69f0267c.mp3',
        picture:
            'http://localhost:5000/66769f704292af4ccf67de40/image/cad7f070-16d7-4dd4-af4d-0a643a72c0a8.jpg',
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
            <Grid container className={cls.infoBlock}>
                <Image
                    src={track.picture}
                    alt={track.name}
                    width={200}
                    height={200}
                />
                <div className={cls.info}>
                    <h2 className={cls.artist}>
                        Исполнитель трека - {track.artist}
                    </h2>
                    <h1>Название трека - {track.name}</h1>
                    <h3>Прослушиваний: {track.listens}</h3>
                </div>
            </Grid>
            <h1>Текст песни</h1>
            <p>{track.text}</p>
            <h1>Комментарии:</h1>
            <Grid container>
                <TextField label={'Ваше имя'} fullWidth />
                <div style={{ height: '10px', width: '100%' }} />
                <TextField label={'Комментарий'} fullWidth multiline rows={4} />
                <Button>Отправить</Button>
            </Grid>
            <div>
                {track.comments.map((comment) => {
                    return (
                        <div key={comment._id}>
                            <div>Автор - {comment.username}</div>
                            <div>Комментарий - {comment.text}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default memo(TrackDeatailsPage)
