import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}
