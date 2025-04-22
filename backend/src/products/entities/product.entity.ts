import { Company } from "src/companies/entities/company.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    category: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    
    @ManyToMany(() => Company, company => company.products)
    companies: Company[];
}
