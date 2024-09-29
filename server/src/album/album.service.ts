import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Album, AlbumDocument } from './schema/album.schema'
import { Model, ObjectId, Types } from 'mongoose'
import { FileService, FileType } from 'src/file/file.service'
import { CreateAlbumDto } from './dto/create-album.dto'
import { Artist, ArtistDocument } from 'src/artist/schema/artist.schema'
import { Track, TrackDocument } from 'src/track/schemas/track.schema'
import { Comment, CommentDocument } from 'src/track/schemas/comment.schema'

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService,
    ) {}

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const artist = await this.artistModel.findById(dto.artist)
        const album = await this.albumModel.create({
            ...dto,
        })
        const picturePath = await this.fileService.createFile(
            FileType.IMAGE,
            picture,
            dto.artist.toString(),
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
            (album) => album.artist.toString() === id.toString(),
        )
        return albums
    }

    async delete(id: ObjectId): Promise<Types.ObjectId | { error: string }> {
        const album = await this.albumModel.findByIdAndDelete(id)

        try {
            // Удаляем картинку альбома
            if (album.picture) {
                await this.fileService.removeFile(album.picture)
            }

            // Удаляем фаилы треков
            if (album.tracks) {
                album.tracks.forEach(async (albumsTrack) => {
                    const track = await this.trackModel.findById(albumsTrack)
                    // Удаляем аудио трека
                    if (track.audio) {
                        await this.fileService.removeFile(track.audio)
                    }
                    // Удаляем картинку трека
                    if (track.picture) {
                        await this.fileService.removeFile(track.picture)
                    }
                    // Удаляем коменты к трекам
                    if (track.comments) {
                        track.comments.forEach(
                            async (comment) =>
                                await this.commentModel.findByIdAndDelete(
                                    comment,
                                ),
                        )
                    }
                })
            }

            // Удаляем треки которые относятся к альбому
            album.tracks.forEach(async (trackId) => {
                await this.trackModel.findByIdAndDelete(trackId)
            })

            // Удаляем id альбома у исполнителя
            if (album.artist) {
                const artist = await this.artistModel.findById(album.artist)
                artist.albums = artist.albums.filter(
                    (albumId) => albumId.toString() !== album._id.toString(),
                )
                await artist.save()
            }

            // Удаляем id треков у исполнителя
            if (album.artist) {
                const artist = await this.artistModel.findById(album.artist)
                artist.tracks = artist.tracks.filter(
                    (trackId) => !album.tracks.includes(trackId),
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
