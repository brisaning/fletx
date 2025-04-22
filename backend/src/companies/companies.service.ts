import { BadRequestException, Injectable, Optional } from '@nestjs/common';
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
    try {
      const city = await this.citiesService.findOne(createCompanyDto.cityId);
      if (!city) {
        throw new BadRequestException('City not found');
      }
      
      const newCompany = this.companyRepository.create(createCompanyDto);
      return await this.companyRepository.save({...newCompany, city});
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error creating company: ' + error.message);
    }
    
  }
  
  async findAll() {
    return await this.companyRepository.findBy({ isActive: true }); //this will return all companies
  }
  
  async findOne(id: number) {
    return await this.companyRepository.findOneBy({id, isActive: true });
  }
  
  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      if(updateCompanyDto.cityId) {
        const city = await this.citiesService.findOne(updateCompanyDto.cityId);
        if (!city) {
          throw new BadRequestException('City not found');
        }
        delete updateCompanyDto.cityId;
        return  await this.companyRepository.update(id, {...updateCompanyDto, city});
      }
      
      return await this.companyRepository.update(id, updateCompanyDto);
    } catch (error) {
      throw new BadRequestException('Error updating company: ' + error.message);      
    }
  }
  
  async remove(id: number) {
    try {
      const company = await this.findOne(id);
      if(!company) {
        throw new BadRequestException('Company not found');
      }
      company.isActive = false;
      await this.update(id, company);
      await this.companyRepository.softRemove(company);
    } catch (error) {
      throw new BadRequestException('Error deleting company: ' + error.message);       
    }
  }
}
