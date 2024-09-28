import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image',
}

@Injectable()
export class FileService {
    createFile(type: FileType, file, artist: string): string {
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = `${uuid.v4()}.${fileExtension}`

            const filePath = path.resolve(
                __dirname,
                '..',
                'static',
                artist,
                type,
            )
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return `${artist}/${type}/${fileName}`
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(artist: string, filePath?: string) {
        const fullFilePath = path.resolve(
            __dirname,
            '..',
            'static',
            artist,
            filePath,
        )
        fs.unlinkSync(fullFilePath)
    }

    removeAllFiles(artist: string) {
        const fullFilePath = path.resolve(__dirname, '..', 'static', artist)

        if (fs.existsSync(fullFilePath)) {
            fs.readdirSync(fullFilePath).forEach((fileItem) => {
                const currentPath = `${fullFilePath}/${fileItem}`
                if (fs.lstatSync(currentPath).isDirectory()) {
                    this.removeAllFiles(currentPath)
                } else {
                    fs.unlinkSync(currentPath)
                }
            })
            fs.rmdirSync(fullFilePath)
        }
    }
}
