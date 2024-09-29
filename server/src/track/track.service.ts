import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Track, TrackDocument } from './schemas/track.schema'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { Model, ObjectId, Types } from 'mongoose'
import { CreateTrackDto } from './dto/create-track.dto'
import { CreateCommentDto } from './dto/create-comment.dto'
import { FileService, FileType } from '../file/file.service'
import { Album, AlbumDocument } from '../album/schema/album.schema'
import { Artist, ArtistDocument } from '../artist/schema/artist.schema'

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
        private fileService: FileService,
    ) {}

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(
            FileType.AUDIO,
            audio,
            dto.artist.toString(),
        )
        const picturePath = this.fileService.createFile(
            FileType.IMAGE,
            picture,
            dto.artist.toString(),
        )
        const track = await this.trackModel.create({
            ...dto,
            listens: 0,
            audio: audioPath,
            picture: picturePath,
        })

        const artist = await this.artistModel.findById(dto.artist)
        artist.tracks.push(track._id)
        await artist.save()

        if (Array.isArray(dto.albumsId)) {
            dto.albumsId.forEach(async (albumId) => {
                const album = await this.albumModel.findById(albumId)
                if (album && album.tracks) {
                    album.tracks.push(track._id)
                    await album.save()
                }
            })
        } else {
            const album = await this.albumModel.findById(dto.albumsId)
            if (album && album.tracks) {
                album.tracks.push(track._id)
                await album.save()
            }
        }

        return track
    }

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel
            .find()
            .populate('artist')
            .skip(Number(offset))
            .limit(Number(count))
        return tracks
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, 'i') },
        })
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel
            .findById(id)
            .populate('artist')
            .populate('comments')
        return track
    }

    async getByArtist(id: ObjectId): Promise<Track[]> {
        const tracks = (await this.trackModel.find()).filter(
            (track) => track.artist.toString() === id.toString(),
        )

        return tracks
    }
    async getByAlbum(id: ObjectId): Promise<Track[]> {
        const tracks = (await this.trackModel.find()).filter(
            (track) => track.albumsId.toString() === id.toString(),
        )

        return tracks
    }

    async delete(id: ObjectId): Promise<Types.ObjectId | { error: string }> {
        const track = await this.trackModel.findByIdAndDelete(id)

        try {
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
                        await this.commentModel.findByIdAndDelete(comment),
                )
            }
            // Удаляем id трека из альбомов
            if (track.albumsId) {
                const album = await this.albumModel.findById(track.albumsId)

                if (album && album.tracks) {
                    album.tracks = album.tracks.filter((trackId) => {
                        return trackId.toString() !== track._id.toString()
                    })
                    await album.save()
                }
            }
            // Удаляем id трека у исполнителя
            if (track.artist) {
                const artist = await this.artistModel.findById(track.artist)
                artist.tracks = artist.tracks.filter(
                    (trackId) => trackId.toString() !== track._id.toString(),
                )
                await artist.save()
            }
        } catch (e) {
            console.log(e.message)
            return { error: e.message }
        }
        return track._id
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({ ...dto })
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id)
        track.listens += 1
        track.save()
    }
}
