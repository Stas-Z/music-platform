import { ObjectId } from 'mongoose'

export class CreateTrackDto {
    readonly name: string
    readonly artist: ObjectId
    readonly albumsId: ObjectId[]
    readonly text: string
}
