import { memo, useState } from 'react'
import FileUpload from '../../../../shared/ui/FileUpload/FileUpload'
import { Button } from '@mui/material'
import cls from './StepNext.module.scss'

interface StepNextProps {
    label: string
    fileFormat: string
    setFile: (file: File) => void
}

const StepNext = ({ fileFormat, label, setFile }: StepNextProps) => {
    const [preview, setPreview] = useState<string | null>(null)

    const handleFile = (file: File) => {
        setFile(file)
        if (fileFormat.includes('image')) {
            const imagePreview = URL.createObjectURL(file)
            setPreview(imagePreview)
        } else if (fileFormat.includes('audio')) {
            const audioPreview = URL.createObjectURL(file)
            setPreview(audioPreview)
        }
    }
    return (
        <div className={cls.buttonWrapper}>
            <FileUpload setFile={handleFile} accept={fileFormat}>
                <Button>{label}</Button>
            </FileUpload>
            {fileFormat.includes('image') && preview && (
                <div className={cls.previewWrapper}>
                    <img className={cls.preview} src={preview} alt="Preview" />
                </div>
            )}
            {fileFormat.includes('audio') && preview && (
                <div className={cls.previewWrapper}>
                    <audio controls>
                        <source src={preview} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    )
}

export default memo(StepNext)
