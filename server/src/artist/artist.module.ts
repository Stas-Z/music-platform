import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Artist, ArtistSchema } from './schema/artist.schema'
import { ArtistController } from './artist.controller'
import { ArtistService } from './artist.service'
import { FileService } from 'src/file/file.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Artist.name, schema: ArtistSchema },
        ]),
    ],
    controllers: [ArtistController],
    providers: [ArtistService, FileService],
})
export class ArtistModule {}
