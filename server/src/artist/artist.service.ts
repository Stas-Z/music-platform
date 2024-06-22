import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId, Types } from 'mongoose'
import { Artist, ArtistDocument } from './schema/artist.schema'
import { FileService, FileType } from 'src/file/file.service'
import { CreateArtistDto } from './dto/create-artist.dto'
import { Album, AlbumDocument } from '../album/schema/album.schema'
import { Track, TrackDocument } from '../track/schemas/track.schema'

@Injectable()
export class ArtistService {
    constructor(
        @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        private fileService: FileService,
    ) {}

    async create(dto: CreateArtistDto, picture): Promise<Artist> {
        const artist = await this.artistModel.create({
            ...dto,
        })
        const picturePath = await this.fileService.createFile(
            FileType.IMAGE,
            picture,
            artist._id.toString(),
        )
        artist.picture = picturePath
        await artist.save()
        return artist
    }

    async getAll(count = 10, offset = 0): Promise<Artist[]> {
        const artists = await this.artistModel
            .find()
            .skip(Number(offset))
            .limit(Number(count))
        return artists
    }

    async getOne(id: ObjectId): Promise<Artist> {
        const track = (await this.artistModel.findById(id)).populate('albums')
        return track
    }

    async delete(id: ObjectId): Promise<Types.ObjectId | { error: string }> {
        const artist = await this.artistModel.findByIdAndDelete(id)

        try {
            this.fileService.removeAllFiles(artist._id.toString())

            artist.albums.forEach(async (albumId) => {
                await this.albumModel.findByIdAndDelete(albumId)
            })
            artist.tracks.forEach(async (trackId) => {
                await this.trackModel.findByIdAndDelete(trackId)
            })
        } catch (e) {
            console.log(e.message)
            return { error: e.message }
        }
        return artist._id
    }
}
