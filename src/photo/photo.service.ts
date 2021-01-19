import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Photo} from './photo.entity';
import {CreatePhotoDto} from "./dto/create-photo.dto";

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) {
    }

    async findAll(): Promise<Photo[]> {
        return this.photoRepository.find();
    }

    async generate(photo: CreatePhotoDto) {
        console.log('photo: ',photo)
        const photoEntity = new Photo();
        photoEntity.name = photo.name;
        photoEntity.description = photo.description;
        photoEntity.filename = photo.filename;
        photoEntity.isPublished = photo.isPublished;

        return this.photoRepository.save(photoEntity)
    }
}
