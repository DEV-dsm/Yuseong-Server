import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { Business } from "./business.entity.js";
import { Resident } from "./resident.entity.js";

@Entity()
export class BusinessMapping {
    // 주민참여명부 4-3

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number; 

    @ManyToOne(
        () => Business, 
        business => business.businessMapping
    )
    @JoinColumn({ name: 'id' })
    business!: Relation<Business>;

    @PrimaryColumn({
        type: 'varchar'
    })
    phone!: string;

    @ManyToOne(
        () => Resident, 
        resident => resident.phone
    )
    @JoinColumn({ name: 'phone' })
    resident!: Resident;

    @Column({
        type: 'varchar',
        nullable: true
    })
    rule?: string;

}