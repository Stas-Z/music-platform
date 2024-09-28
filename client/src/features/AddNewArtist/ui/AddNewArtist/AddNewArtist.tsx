import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useRouter } from 'next/router'
import { memo, useCallback, useState } from 'react'
import { addArtist } from '../../model/services/addArtist/addArtist'
import { useInput } from '@/src/shared/lib/hooks/useInput/useInput'
import cls from './AddNewArtist.module.scss'
import { Button, Card, Container, Grid, TextField } from '@mui/material'
import FileUpload from '@/src/shared/ui/FileUpload/FileUpload'

export const AddNewArtist = memo(() => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const artistName = useInput('')
    const artistText = useInput('')

    const [picture, setPicture] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const addArtistHandler = useCallback(async () => {
        const result = await dispatch(
            addArtist({
                name: artistName.value,
                text: artistText.value,
                picture: picture as File,
            }),
        )

        if (result.meta.requestStatus === 'fulfilled') {
            router.push('/artists')
        }
    }, [picture])

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
                        <TextField
                            {...artistName}
                            label="Название артиста"
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
                        <TextField
                            {...artistText}
                            label="Об исполнителе"
                            className={cls.input}
                            multiline
                            rows={3}
                        />
                        <Grid
                            container
                            direction={'row'}
                            justifyContent={'end'}
                        >
                            <Button
                                variant="outlined"
                                onClick={addArtistHandler}
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

AddNewArtist.displayName = 'AddNewArtist'
