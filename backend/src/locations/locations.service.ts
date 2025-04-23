import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {

  constructor(
    @InjectRepository(Location) private readonly locationRepository: Repository<Location>
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    try {
      const newLocation = await this.locationRepository.create(createLocationDto);
      return await this.locationRepository.save(newLocation);
    } catch (error) {
      throw new BadRequestException('Error creating location: ' + error.message); 
      }
  }

  async findAll() {
    return await this.locationRepository.findBy({isActive: true}); 
  }

  async findOne(id: number) {
    return await this.locationRepository.findOneBy({ id, isActive: true });
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      return await this.locationRepository.update(id, updateLocationDto);
    } catch (error) {
      throw new BadRequestException('Error updating location: ' + error.message);      
    }
  }

  async remove(id: number) {
    try {
      const location = await this.findOne(id);
      if(!location) {
        throw new NotFoundException('Location not found');
      }
      location.isActive = false;
      await this.update(id, location);
      return await this.locationRepository.softRemove(location);
    } catch (error) {
      throw new BadRequestException('Error deleting location: ' + error.message);
    }
  }
}
