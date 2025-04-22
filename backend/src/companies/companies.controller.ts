import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }

  @Post(':id/products')
  async addProducts(
    @Param('id') companyId: number,
    @Body('productIds', new ParseArrayPipe({ items: Number })) productIds: number[]
  ) {
    return this.companiesService.addProductsToCompany(companyId, productIds);
  }

  @Delete(':id/products')
  async removeProducts(
    @Param('id') companyId: number,
    @Body('productIds', new ParseArrayPipe({ items: Number })) productIds: number[]
  ) {
    return this.companiesService.removeProductsFromCompany(companyId, productIds);
  }

  @Post(':id/products/replace')
  async replaceProducts(
    @Param('id') companyId: number,
    @Body('productIds', new ParseArrayPipe({ items: Number })) productIds: number[]
  ) {
    return this.companiesService.setCompanyProducts(companyId, productIds);
  }
}
