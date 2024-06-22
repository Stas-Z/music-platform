import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Album, AlbumSchema } from './schema/album.schema'
import { AlbumController } from './album.controller'
import { AlbumService } from './album.service'
import { FileService } from 'src/file/file.service'
import { Artist, ArtistSchema } from 'src/artist/schema/artist.schema'
import { Track, TrackSchema } from 'src/track/schemas/track.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
        MongooseModule.forFeature([
            { name: Artist.name, schema: ArtistSchema },
        ]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService],
})
export class AlbumModule {}
