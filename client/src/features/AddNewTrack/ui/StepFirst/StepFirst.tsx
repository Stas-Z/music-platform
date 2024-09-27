import { Button, Grid, TextField } from '@mui/material'
import cls from './StepFirst.module.scss'
import { memo, useMemo } from 'react'
import { useInputType } from '@/src/shared/lib/hooks/useInput/useInput'
import { SelectItem, SelectVariants } from '@/src/shared/ui/Select/Select'
import { IArtist } from '@/src/entities/Artist/model/types/artist'
import { useRouter } from 'next/router'

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
    const router = useRouter()

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

    return (
        <Grid container direction={'column'} className={cls.firstStep}>
            <Grid direction={'row'} container className={cls.artistBlock}>
                <SelectVariants
                    items={artistsValue}
                    onChange={onChange}
                    value={artist}
                />

                <Grid container alignItems={'center'} width={'auto'}>
                    <Button
                        variant="outlined"
                        onClick={() => router.push('/artists/create')}
                        size="medium"
                    >
                        Добавить исполнителя
                    </Button>
                </Grid>
            </Grid>
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
