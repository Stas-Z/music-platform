import { Module } from '@nestjs/common'
import { TrackModule } from './track/track.module'
import { MongooseModule } from '@nestjs/mongoose'
import { password, username } from 'config/config'
import { FileModule } from './file/file.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { ArtistModule } from './artist/artist.module'
import { AlbumModule } from './album/album.module'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        ArtistModule,
        TrackModule,
        AlbumModule,
        MongooseModule.forRoot(
            `mongodb+srv://${username}:${password}@music-platform.l9gt49x.mongodb.net/?retryWrites=true&w=majority&appName=music-platform`,
        ),
        FileModule,
    ],
})
export class AppModule {}
