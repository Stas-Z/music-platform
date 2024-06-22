import { ObjectId } from 'mongoose'

export class CreateAlbumDto {
    readonly name: string
    readonly artistId: ObjectId
}
