import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CitiesModule } from 'src/cities/cities.module';
import { ProductsModule } from 'src/products/products.module';
import { CitiesService } from 'src/cities/cities.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), CitiesModule, ProductsModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, CitiesService],
})
export class CompaniesModule {}
