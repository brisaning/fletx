import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [CompaniesModule, ProductsModule, UsersModule, LocationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
