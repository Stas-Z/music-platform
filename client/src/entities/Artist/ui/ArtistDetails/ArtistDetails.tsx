import { Button, Grid } from '@mui/material'
import cls from './ArtistDetails.module.scss'
import { memo, useCallback } from 'react'
import Image from 'next/image'
import { getApiURL } from '@/src/shared/lib/helpers/getApiURL/getApiURL'
import { IArtist } from '../../model/types/artist'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { artistActions } from '../../model/slice/artistSlice'

interface ArtistDetailsProps {
    artist: IArtist
}
export const ArtistDetails = memo(({ artist }: ArtistDetailsProps) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const onClickHandler = useCallback(async () => {
        await dispatch(artistActions.setCurrentArtist(artist))
        router.push('/album/create')
    }, [artist, dispatch, router])

    return (
        <>
            <Grid container className={cls.infoBlock} flexWrap={'nowrap'}>
                <Grid container>
                    <Image
                        src={getApiURL(artist.picture)}
                        alt={artist.name}
                        width={200}
                        height={200}
                    />
                    <div className={cls.info}>
                        <h1>{artist.name}</h1>
                    </div>
                </Grid>
                <Grid
                    container
                    alignContent={'center'}
                    justifyContent={'flex-end'}
                >
                    <Button variant="outlined" onClick={onClickHandler}>
                        Добавить Альбом
                    </Button>
                </Grid>
            </Grid>
            <h1>Об исполнителе</h1>
            <p>{artist.text}</p>
        </>
    )
})
ArtistDetails.displayName = 'ArtistDetails'
