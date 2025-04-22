import { BadRequestException, Injectable, Optional } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { LocationsService } from 'src/locations/locations.service';

@Injectable()
export class CitiesService {

  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
    @Optional() private readonly locationsService: LocationsService,
  ) {}

  async create(createCityDto: CreateCityDto) {
    try {
      const location = await this.locationsService.findOne(createCityDto.locationId);
      if (!location) {
        throw new BadRequestException('Location not found');
      }

      const newCity = await this.cityRepository.create(createCityDto);
      return await this.cityRepository.save({...newCity, location});
    } catch (error) {
      throw new BadRequestException('Error creating city: ' + error.message);
    }
  }

  async findAll() {
    return await this.cityRepository.findBy({ isActive: true });
  }

  async findOne(id: number) {
    return await this.cityRepository.findOneBy({ id, isActive: true });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    try {
      return await this.cityRepository.update(id, updateCityDto);      
    } catch (error) {
      throw new BadRequestException('Error updating city: ' + error.message);      
    }
  }

  async remove(id: number) {
    return await this.cityRepository.softDelete(id);
  }
}
