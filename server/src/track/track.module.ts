import { Module } from '@nestjs/common'
import { TrackController } from './track.controller'
import { TrackService } from './track.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Track, TrackSchema } from './schemas/track.schema'
import { Comment, CommentSchema } from './schemas/comment.schema'
import { FileService } from '../file/file.service'
import { Album, AlbumSchema } from '../album/schema/album.schema'
import { Artist, ArtistSchema } from '../artist/schema/artist.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
        ]),
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
        MongooseModule.forFeature([
            { name: Artist.name, schema: ArtistSchema },
        ]),
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService],
})
export class TrackModule {}
