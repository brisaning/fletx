import { City } from "src/cities/entities/city.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    name: string;
    
    @OneToMany(() => City, city => city.location, { cascade: true })
    cities: City[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @Column({  type: 'boolean', default: true })
    isActive: boolean;
}
