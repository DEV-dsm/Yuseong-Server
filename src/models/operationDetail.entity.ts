import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { BusinessInformation } from "./businessInformation.entity.js";

@Entity()
export class OperationDetail {
    // 운영 계획

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number;

    @ManyToOne(
        () => BusinessInformation,
        businessInformation => businessInformation.operationDetail
    )
    @JoinColumn({ name: 'id' })
    businessInformation!: Relation<BusinessInformation>;

    @Column({
        type: 'varchar'
    })
    location!: string;

    @Column({
        type: 'varchar'
    })
    period!: string;

    @Column({
        type: 'varchar'
    })
    businessName!: string;

    @Column({
        type: 'integer',
        default: false
    })
    budget!: number;
}