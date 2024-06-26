import { ObjectId } from 'mongoose'

export class CreateTrackDto {
    readonly name: string
    readonly artistId: ObjectId
    readonly albumsId: ObjectId[]
    readonly text: string
}
