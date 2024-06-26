import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Artist, ArtistSchema } from './schema/artist.schema'
import { ArtistController } from './artist.controller'
import { ArtistService } from './artist.service'
import { FileService } from 'src/file/file.service'
import { Album, AlbumSchema } from 'src/album/schema/album.schema'
import { Track, TrackSchema } from 'src/track/schemas/track.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Artist.name, schema: ArtistSchema },
        ]),
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    ],
    controllers: [ArtistController],
    providers: [ArtistService, FileService],
})
export class ArtistModule {}
