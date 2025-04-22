import { Injectable, Optional } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CitiesService } from 'src/cities/cities.service';

@Injectable()
export class CompaniesService {

  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @Optional() private readonly citiesService: CitiesService,
    // private readonly productsService: ProductsService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.save(createCompanyDto);
  }

  async findAll() {
    return await this.companyRepository.findBy({ isActive: true }); //this will return all companies
  }

  async findOne(id: number) {
    return await this.companyRepository.findOneBy({id, isActive: true });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyRepository.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    return await this.companyRepository.softDelete(id);
  }
}
