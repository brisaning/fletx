import { BadRequestException, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CitiesService } from 'src/cities/cities.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CompaniesService {
  
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @Optional() private readonly citiesService: CitiesService,
  ) {}
  
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const city = await this.citiesService.findOne(createCompanyDto.cityId);
      if (!city) {
        throw new NotFoundException('City not found');
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

  async findCompanyProducts(companyId: number): Promise<Product[]> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['products'], // Esto carga la relación con productos
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    return company.products;
  }

  /*async findCompanyProductsPaginated(
    companyId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ products: Product[]; total: number }> {
    const result = await this.companyRepository
      .createQueryBuilder('company')
      .where('company.id = :companyId', { companyId })
      .leftJoinAndSelect('company.products', 'product')
      .take(limit)
      .skip((page - 1) * limit)
      .getOne();
  
    if (!result) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }
  
    // Consulta separada para el total (más precisa)
    const total = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.companies', 'company')
      .where('company.id = :companyId', { companyId })
      .getCount();
  
    return {
      products: result.products || [],
      total,
    };
  }*/
  
  async findOne(id: number) {
    return await this.companyRepository.findOneBy({id, isActive: true });
  }
  
  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      if(updateCompanyDto.cityId) {
        const city = await this.citiesService.findOne(updateCompanyDto.cityId);
        if (!city) {
          throw new NotFoundException('City not found');
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
        throw new NotFoundException('Company not found');
      }
      company.isActive = false;
      await this.update(id, company);
      await this.companyRepository.softRemove(company);
    } catch (error) {
      throw new BadRequestException('Error deleting company: ' + error.message);       
    }
  }

  async addProductsToCompany(companyId: number, productIds: number[]): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['products'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const products = await this.productRepository.findByIds(productIds);
    if (products.length !== productIds.length) {
      const foundIds = products.map(p => p.id);
      const missingIds = productIds.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`Products with IDs ${missingIds.join(', ')} not found`);
    }

    // Fusiona los productos existentes con los nuevos (evita duplicados)
    company.products = [...new Set([...company.products, ...products])];
    
    return this.companyRepository.save(company);
  }

  // Método para remover productos de una compañía
  async removeProductsFromCompany(companyId: number, productIds: number[]): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['products'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    company.products = company.products.filter(
      product => !productIds.includes(product.id)
    );

    return this.companyRepository.save(company);
  }

  // Método para reemplazar todos los productos de una compañía
  async setCompanyProducts(companyId: number, productIds: number[]): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId }
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const products = await this.productRepository.findByIds(productIds);
    if (products.length !== productIds.length) {
      const foundIds = products.map(p => p.id);
      const missingIds = productIds.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`Products with IDs ${missingIds.join(', ')} not found`);
    }

    company.products = products;
    return this.companyRepository.save(company);
  }

}
