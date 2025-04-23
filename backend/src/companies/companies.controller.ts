import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, Query, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Product } from 'src/products/entities/product.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Roles('admin')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id/products')
  @Roles('admin', 'user')
  async getCompanyProducts(
    @Param('id') companyId: number,
  ): Promise<Product[]> {
    return this.companiesService.findCompanyProducts(companyId);
  }

  // Versión con paginación
  /*@Get(':id/products/paginated')
  @Roles('admin', 'user')
  async getCompanyProductsPaginated(
    @Param('id') companyId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ products: Product[]; total: number }> {
    return this.companiesService.findCompanyProductsPaginated(
      companyId,
      page,
      limit,
    );
  }*/

  @Get(':id')
  @Roles('admin', 'user')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }

  @Post(':id/products')
  @Roles('admin')
  async addProducts(
    @Param('id') companyId: number,
    @Body('productIds', new ParseArrayPipe({ items: Number })) productIds: number[]
  ) {
    return this.companiesService.addProductsToCompany(companyId, productIds);
  }

  @Delete(':id/products')
  @Roles('admin')
  async removeProducts(
    @Param('id') companyId: number,
    @Body('productIds', new ParseArrayPipe({ items: Number })) productIds: number[]
  ) {
    return this.companiesService.removeProductsFromCompany(companyId, productIds);
  }

  @Post(':id/products/replace')
  @Roles('admin')
  async replaceProducts(
    @Param('id') companyId: number,
    @Body('productIds', new ParseArrayPipe({ items: Number })) productIds: number[]
  ) {
    return this.companiesService.setCompanyProducts(companyId, productIds);
  }
}
