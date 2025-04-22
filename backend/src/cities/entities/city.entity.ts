import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "src/companies/entities/company.entity";
import { Location } from "src/locations/entities/location.entity";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @ManyToOne(() => Location, location => location.cities)
    location: Location;
    
    @OneToMany(() => Company, company => company.city)
    companies: Company[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date | null;

    @Column({  type: 'boolean', default: true })
    isActive: boolean;
}
