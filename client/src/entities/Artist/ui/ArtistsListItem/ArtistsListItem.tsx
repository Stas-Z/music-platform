import { Card, Grid, IconButton } from '@mui/material'
import cls from './ArtistsListItem.module.scss'
import { Delete } from '@mui/icons-material'
import { memo, MouseEvent, useCallback } from 'react'
import Image from 'next/image'
import { getApiURL } from '@/src/shared/lib/helpers/getApiURL/getApiURL'
import { IArtist } from '../../model/types/artist'
import { useRouter } from 'next/router'

interface ArtistsListItemProps {
    artist: IArtist
    onClick: (id: string) => void
}

export const ArtistsListItem = memo(
    ({ artist, onClick }: ArtistsListItemProps) => {
        const router = useRouter()

        const onClickHandle = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onClick(artist._id)
                router.push('/artists/')
            },
            [artist._id, onClick],
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
    },
)
ArtistsListItem.displayName = 'ArtistsListItem'
