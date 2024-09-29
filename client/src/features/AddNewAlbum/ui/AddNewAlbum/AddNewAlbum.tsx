import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useRouter } from 'next/router'
import { memo, useCallback, useState } from 'react'
import { addAlbum } from '../../model/services/addAlbum/addAlbum'
import { useInput } from '@/src/shared/lib/hooks/useInput/useInput'
import cls from './AddNewAlbum.module.scss'
import { Button, Card, Container, Grid, TextField } from '@mui/material'
import FileUpload from '@/src/shared/ui/FileUpload/FileUpload'
import { useSelector } from 'react-redux'
import { getCurrentArtistSelector } from '@/src/entities/Artist'

export const AddNewAlbum = memo(() => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const artist = useSelector(getCurrentArtistSelector)

    const albumName = useInput('')

    const [picture, setPicture] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const addAlbumHandler = useCallback(async () => {
        const result = await dispatch(
            addAlbum({
                name: albumName.value,
                picture: picture as File,
                artist: artist?._id || '',
            }),
        )

        if (result.meta.requestStatus === 'fulfilled') {
            router.push('/artists/' + artist?._id)
        }
    }, [albumName.value, artist?._id, dispatch, picture, router])

    const handleFile = useCallback((file: File) => {
        setPicture(file)
        if ('image/*'.includes('image')) {
            const imagePreview = URL.createObjectURL(file)
            setPreview(imagePreview)
        }
    }, [])

    return (
        <Container>
            <Grid
                container
                justifyContent={'center'}
                className={cls.stepContainer}
            >
                <Card className={cls.cardWrapper}>
                    <Grid
                        container
                        direction={'column'}
                        className={cls.firstStep}
                    >
                        <h3>Исполнитель: {artist?.name}</h3>
                        <TextField
                            {...albumName}
                            label="Название Альбома"
                            className={cls.input}
                        />

                        <div className={cls.buttonWrapper}>
                            <FileUpload setFile={handleFile} accept={'image/*'}>
                                <Button>Загрузите изображение</Button>
                            </FileUpload>
                            {preview && (
                                <div className={cls.previewWrapper}>
                                    <img
                                        className={cls.preview}
                                        src={preview}
                                        alt="Preview"
                                    />
                                </div>
                            )}
                        </div>

                        <Grid
                            container
                            direction={'row'}
                            justifyContent={'end'}
                        >
                            <Button
                                variant="outlined"
                                onClick={addAlbumHandler}
                            >
                                Добавить
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Container>
    )
})

AddNewAlbum.displayName = 'AddNewAlbum'
