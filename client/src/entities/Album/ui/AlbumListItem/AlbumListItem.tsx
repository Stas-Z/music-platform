import { Grid, IconButton, Tooltip } from '@mui/material'
import cls from './AlbumListItem.module.scss'
import { Delete } from '@mui/icons-material'
import { memo, MouseEvent, useCallback } from 'react'
import Image from 'next/image'
import { getApiURL } from '@/src/shared/lib/helpers/getApiURL/getApiURL'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { IAlbum } from '../../model/types/album'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { albumActions } from '../../model/slice/albumSlice'
import { artistActions, IArtist } from '@/src/entities/Artist'
import { ITrack, TrackList } from '@/src/entities/Track'
import { deleteAlbum } from '../../model/services/deleteAlbum/deleteAlbum'

interface AlbumListItemProps {
    album: IAlbum
    artist: IArtist
}

export const AlbumListItem = memo(({ album, artist }: AlbumListItemProps) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const tracks = artist.tracks?.filter((track: ITrack) => {
        return track.albumsId.toString() === album._id
    })

    const onClickHandler = useCallback(async () => {
        await dispatch(albumActions.setCurrentAlbum(album))
        await dispatch(artistActions.setCurrentArtist(artist))
        router.push('/tracks/create')
    }, [album, dispatch, router])

    const deleteHandle = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            dispatch(deleteAlbum({ id: album._id }))
            router.push('/artists/' + artist._id)
        },
        [album._id, dispatch, router],
    )

    return (
        <Grid container marginBottom={5}>
            <Grid
                container
                //     onClick={() => router.push('/artists/' + artist._id)}
            >
                <Image
                    src={getApiURL(album.picture)}
                    alt={album.name}
                    width={150}
                    height={150}
                />
                <Grid container direction={'column'} className={cls.rightBlock}>
                    <div className={cls.albumName}>{album.name}</div>
                    <Grid container direction={'row'}>
                        <span>Альбом</span>
                        <span className={cls.separator}>•</span>
                        <span>2021</span> {/* TODO  */}
                        <span className={cls.separator}>•</span>
                        <span>{album.tracks?.length} треков</span>
                    </Grid>
                    <div>
                        <Tooltip title="Добавить трек">
                            <IconButton onClick={onClickHandler}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Grid>
                <div className={cls.delete}>
                    <Tooltip title="Удалить Альбом">
                        <IconButton onClick={deleteHandle}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            </Grid>
            <h2>Треки</h2>

            <TrackList tracks={tracks || []} />
        </Grid>
    )
})
AlbumListItem.displayName = 'AlbumListItem'
