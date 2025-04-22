import { Company } from "src/companies/entities/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    
    @ManyToOne(() => Company, company => company.users)
    company: Company;
}
