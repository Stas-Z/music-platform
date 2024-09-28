import { Grid } from '@mui/material'
import cls from './ArtistDetails.module.scss'
import { memo } from 'react'
import Image from 'next/image'
import { getApiURL } from '@/src/shared/lib/helpers/getApiURL/getApiURL'
import { IArtist } from '../../model/types/artist'

interface ArtistDetailsProps {
    artist: IArtist
}
export const ArtistDetails = memo(({ artist }: ArtistDetailsProps) => {
    return (
        <>
            <Grid container className={cls.infoBlock}>
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
            <h1>Об исполнителе</h1>
            <p>{artist.text}</p>
        </>
    )
})
ArtistDetails.displayName = 'ArtistDetails'
