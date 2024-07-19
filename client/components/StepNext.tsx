import React from 'react'
import FileUpload from './FileUpload'
import { Button } from '@mui/material'

interface StepNextProps {
    label: string
    fileFormat: string
    setFile: (file: File) => void
}

const StepNext = ({ fileFormat, label, setFile }: StepNextProps) => {
    return (
        <div>
            <FileUpload setFile={setFile} accept={fileFormat}>
                <Button>{label}</Button>
            </FileUpload>
        </div>
    )
}

export default StepNext
