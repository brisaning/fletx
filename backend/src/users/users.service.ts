import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // @Optional() private readonly locationsService: LocationsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error creating user: ' + error.message);      
    }
  }

  async findAll() {
    return await this.userRepository.findBy({ isActive: true });
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id, isActive: true });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email, isActive: true });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }
}
