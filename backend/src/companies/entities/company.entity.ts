import { Delete } from "@nestjs/common";
import { City } from "src/cities/entities/city.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  sector: string;
  
  @ManyToOne(() => City, city => city.companies)
  city: City;
  
  @Column()
  phone: string;
  
  @Column()
  address: string;
  
  @Column('decimal', { precision: 15, scale: 2 })
  assets: number;
  
  @Column('decimal', { precision: 15, scale: 2 })
  liabilities: number;
  
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
  
  @OneToMany(() => User, user => user.company)
  users: User[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
