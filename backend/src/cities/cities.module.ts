import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { LocationsModule } from 'src/locations/locations.module';
import { LocationsService } from 'src/locations/locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([City]), LocationsModule],
  controllers: [CitiesController],
  providers: [CitiesService, LocationsService],
  exports: [TypeOrmModule],
})
export class CitiesModule {}
