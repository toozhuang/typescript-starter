import {Body, Controller, Get, Post} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import {CreatePhotoDto} from "./dto/create-photo.dto";

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {
    console.log('photo  controller init')
  }

  @Get()
  findAll(): Promise<Photo[]> {
    console.log('get photos::')
    return this.photoService.findAll();
  }

  @Post()
  generatePhoto(@Body('photo') photo: CreatePhotoDto): Promise<any>{
    return this.photoService.generate(photo)
}
}
