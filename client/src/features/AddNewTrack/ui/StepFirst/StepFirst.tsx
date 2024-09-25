import { Grid, TextField } from '@mui/material'
import cls from './StepFirst.module.scss'
import { memo, useMemo } from 'react'
import { useInputType } from '@/src/shared/lib/hooks/useInput/useInput'
import { SelectItem, SelectVariants } from '@/src/shared/ui/Select/Select'
import { IArtist } from '@/src/entities/Artist/model/types/artist'

interface StepFirstProps {
    trackName: useInputType
    artists: IArtist[]
    text: useInputType
    onChange: (value: string) => void
    artist: string
}

const StepFirst = ({
    trackName,
    artists,
    text,
    onChange,
    artist,
}: StepFirstProps) => {
    const artistsValue = useMemo(
        () =>
            artists.reduce(
                (accumulator: SelectItem[], currentArtist) => [
                    ...accumulator,
                    {
                        value: currentArtist._id,
                        content: currentArtist.name,
                    },
                ],
                [],
            ),
        [artists],
    )

    const selectArtist =
        artistsValue.length > 0 ? (
            <SelectVariants
                items={artistsValue}
                onChange={onChange}
                value={artist}
            />
        ) : (
            <div>Добавьте исполнителя</div>
        )

    return (
        <Grid container direction={'column'} className={cls.firstStep}>
            {selectArtist}
            <TextField
                {...trackName}
                label="Название трека"
                className={cls.input}
            />

            <TextField
                {...text}
                label="Текст песни"
                multiline
                rows={3}
                className={cls.input}
            />
        </Grid>
    )
}

export default memo(StepFirst)
