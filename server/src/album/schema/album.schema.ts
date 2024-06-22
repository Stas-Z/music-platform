import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'

export type AlbumDocument = HydratedDocument<Album>

@Schema()
export class Album {
    @Prop()
    name: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
    artistId: mongoose.Types.ObjectId

    @Prop()
    picture: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
    tracks: mongoose.Types.ObjectId[]
}

export const AlbumSchema = SchemaFactory.createForClass(Album)
