import { Module } from '@nestjs/common'
import { TrackModule } from './track/track.module'
import { MongooseModule } from '@nestjs/mongoose'
import { password, username } from 'config/config'

@Module({
    imports: [
        TrackModule,
        MongooseModule.forRoot(
            `mongodb+srv://${username}:${password}@music-platform.l9gt49x.mongodb.net/?retryWrites=true&w=majority&appName=music-platform`,
        ),
    ],
})
export class AppModule {}
