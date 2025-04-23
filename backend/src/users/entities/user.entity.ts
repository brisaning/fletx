import { Company } from "src/companies/entities/company.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    position: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    salary: number;
    
    @Column()
    phone: string;
    
    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;
    
    @Column({ default: 'user' })
    role: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date | null;
    
    @Column({ type: 'boolean', default: true })
    isActive: boolean;
    
    @ManyToOne(() => Company, company => company.users)
    company: Company;
}
