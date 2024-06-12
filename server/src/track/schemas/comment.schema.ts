import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'

export type CommentDocument = HydratedDocument<Comment>

@Schema()
export class Comment {
    @Prop()
    username: string

    @Prop()
    text: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
    track: mongoose.Types.ObjectId
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
