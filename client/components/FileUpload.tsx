import React, { MutableRefObject, ReactNode, useCallback, useRef } from 'react'

interface FileUploadProps {
    setFile: (file: File) => void
    accept: string
    children: ReactNode
}

const FileUpload = ({ setFile, accept, children }: FileUploadProps) => {
    const ref = useRef() as MutableRefObject<HTMLInputElement>

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                setFile(e.target.files[0])
            }
        },
        [setFile],
    )
    return (
        <div onClick={() => ref.current.click()}>
            <input
                type="file"
                accept={accept}
                style={{ display: 'none' }}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    )
}

export default FileUpload
