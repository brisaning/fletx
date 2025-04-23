import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.productRepository.create(createProductDto);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new BadRequestException('Error creating product: ' + error.message);
    }
  }

  async findAll() {
    return await this.productRepository.findBy({ isActive: true });
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({ id, isActive: true });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.productRepository.update(id, updateProductDto);      
    } catch (error) {
      throw new BadRequestException('Error updating product: ' + error.message);      
    }
  }

  async remove(id: number) {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      product.isActive = false;
      await this.update(id, product);
      return await this.productRepository.softRemove(product);      
    } catch (error) {
      throw new BadRequestException('Error deleting product: ' + error.message);      
    }
  }
}
