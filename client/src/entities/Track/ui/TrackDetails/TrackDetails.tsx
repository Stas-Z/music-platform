import { Button, Grid, TextField } from '@mui/material'
import { ITrack } from '../../model/types/track'
import cls from './TrackDeatails.module.scss'
import { memo } from 'react'
import Image from 'next/image'
import { getApiURL } from '@/src/shared/lib/helpers/getApiURL/getApiURL'

interface TrackListProps {
    track: ITrack
    artist?: string
}
export const TrackDetails = memo(({ track, artist }: TrackListProps) => {
    return (
        <>
            <Grid container className={cls.infoBlock}>
                <Image
                    src={getApiURL(track.picture)}
                    alt={track.name}
                    width={200}
                    height={200}
                />
                <div className={cls.info}>
                    <h2 className={cls.artist}>Исполнитель трека - {artist}</h2>
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
})
TrackDetails.displayName = 'TrackDetails'
