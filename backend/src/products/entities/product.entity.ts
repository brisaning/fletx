import { Company } from "src/companies/entities/company.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date | null;
    
    @Column({ type: 'boolean', default: true })
    isActive: boolean;
    
    @ManyToMany(() => Company, company => company.products)
    companies: Company[];
}
