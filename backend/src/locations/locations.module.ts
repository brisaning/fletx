import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { AuthGuardsModule } from 'src/auth/auth-guards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), AuthGuardsModule],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [TypeOrmModule],
})
export class LocationsModule {}
