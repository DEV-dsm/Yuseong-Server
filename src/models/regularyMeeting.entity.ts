import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { BusinessInformation } from "./businessInformation.entity.js";

@Entity()
export class RegularyMeeting {
    // 정기 회의

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number;

    @OneToOne(
        () => BusinessInformation,
        businessInformation => businessInformation.regularyMeeting
    )
    @JoinColumn({ name: 'id' })
    businessInformation!: Relation<BusinessInformation>;

    @Column({
        type: 'varchar'
    })
    type!: string;

    @Column({
        type: 'varchar'
    })
    frequency!: string;

    @Column({
        type: 'integer',
        default: false
    })
    participants!: number;
}