import { Card, Grid, IconButton } from '@mui/material'
import cls from './ArtistsListItem.module.scss'
import { Delete } from '@mui/icons-material'
import { memo, MouseEvent, useCallback } from 'react'
import Image from 'next/image'
import { getApiURL } from '@/src/shared/lib/helpers/getApiURL/getApiURL'
import { IArtist } from '../../model/types/artist'
import { useRouter } from 'next/router'
import { deleteArtist } from '../../model/services/deleteArtist/deleteArtist'
import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ArtistsListItemProps {
    artist: IArtist
}

export const ArtistsListItem = memo(({ artist }: ArtistsListItemProps) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const onClickHandle = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            dispatch(deleteArtist({ id: artist._id }))
            router.push('/artists/')
        },
        [artist._id, dispatch, router],
    )

    return (
        <Card
            className={cls.track}
            onClick={() => router.push('/artists/' + artist._id)}
        >
            <Image
                width={70}
                height={70}
                src={getApiURL(artist.picture)}
                alt={artist.name}
            />
            <Grid container direction={'column'} className={cls.rightBlock}>
                <div>{artist.name}</div>
            </Grid>
            <IconButton className={cls.delete} onClick={onClickHandle}>
                <Delete />
            </IconButton>
        </Card>
    )
})
ArtistsListItem.displayName = 'ArtistsListItem'
