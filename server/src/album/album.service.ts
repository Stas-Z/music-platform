import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Album, AlbumDocument } from './schema/album.schema'
import { Model, ObjectId, Types } from 'mongoose'
import { FileService, FileType } from 'src/file/file.service'
import { CreateAlbumDto } from './dto/create-album.dto'
import { Artist, ArtistDocument } from 'src/artist/schema/artist.schema'
import { Track, TrackDocument } from 'src/track/schemas/track.schema'

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        private fileService: FileService,
    ) {}

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const artist = await this.artistModel.findById(dto.artistId)
        const album = await this.albumModel.create({
            ...dto,
        })
        const picturePath = await this.fileService.createFile(
            FileType.IMAGE,
            picture,
            dto.artistId.toString(),
        )
        album.picture = picturePath
        await album.save()

        artist.albums.push(album._id)
        await artist.save()

        return album
    }

    async getAll(count = 10, offset = 0): Promise<Album[]> {
        const albums = await this.albumModel
            .find()
            .skip(Number(offset))
            .limit(Number(count))
        return albums
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = (await this.albumModel.findById(id)).populate('tracks')
        return album
    }

    async getByArtist(id: ObjectId): Promise<Album[]> {
        const albums = (await this.albumModel.find()).filter(
            (album) => album.artistId.toString() === id.toString(),
        )
        return albums
    }

    async delete(id: ObjectId): Promise<Types.ObjectId | { error: string }> {
        const album = await this.albumModel.findByIdAndDelete(id)

        try {
            // Удаляем картинку альбома
            if (album.picture) {
                await this.fileService.removeFile(
                    album.artistId.toString(),
                    album.picture,
                )
            }
            // Удаляем id альбома у треков
            album.tracks.forEach(async (trackId) => {
                const track = await this.trackModel.findById(trackId)

                if (track && track.albumsId) {
                    track.albumsId = track.albumsId.filter(
                        (albumId) =>
                            albumId.toString() !== album._id.toString(),
                    )
                    await track.save()
                }
            })

            // Удаляем id альбома у исполнителя
            if (album.artistId) {
                const artist = await this.artistModel.findById(album.artistId)
                artist.albums = artist.albums.filter(
                    (albumId) => albumId.toString() !== album._id.toString(),
                )
                await artist.save()
            }
        } catch (e) {
            console.log(e.message)

            return { error: e.message }
        }
        return album._id
    }
}
