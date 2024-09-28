import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'

export type ArtistDocument = HydratedDocument<Artist>

@Schema()
export class Artist {
    @Prop()
    name: string

    @Prop()
    picture: string

    @Prop()
    text: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
    albums: mongoose.Types.ObjectId[]

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
    tracks: mongoose.Types.ObjectId[]
}

export const ArtistSchema = SchemaFactory.createForClass(Artist)
