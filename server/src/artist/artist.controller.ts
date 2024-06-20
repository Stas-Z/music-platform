import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common'
import { ArtistService } from './artist.service'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CreateArtistDto } from './dto/create-artist.dto'
import { ObjectId } from 'mongoose'

@Controller('/artists')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
    create(@UploadedFiles() files, @Body() dto: CreateArtistDto) {
        const { picture } = files
        return this.artistService.create(dto, picture[0])
    }

    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.artistService.getAll(count, offset)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.artistService.delete(id)
    }
}
