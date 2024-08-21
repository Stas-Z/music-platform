import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import cls from './Player.module.scss'
import { ITrack } from '@/src/entities/Track'
import ProgressBar from '@/src/shared/ui/ProgressBar/ProgressBar'

const Player = () => {
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
    const active = false
    return (
        <div className={cls.player}>
            <IconButton onClick={(e) => e.stopPropagation()}>
                {active ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Grid container direction={'column'} className={cls.rightBlock}>
                <div>{track.name}</div>
                <div className={cls.artist}>{track.artist}</div>
            </Grid>
            <ProgressBar left={0} right={100} onChanged={() => {}} />
            <VolumeUp className={cls.volume} />
            <ProgressBar left={0} right={100} onChanged={() => {}} />
        </div>
    )
}

export default Player
