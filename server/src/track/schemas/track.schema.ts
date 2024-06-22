import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'

export type TrackDocument = HydratedDocument<Track>

@Schema()
export class Track {
    @Prop()
    name: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
    artistId: mongoose.Types.ObjectId

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
    albumsId: mongoose.Types.ObjectId[]

    @Prop()
    text: string

    @Prop()
    listens: number

    @Prop()
    picture: string

    @Prop()
    audio: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: mongoose.Types.ObjectId[]
}

export const TrackSchema = SchemaFactory.createForClass(Track)
