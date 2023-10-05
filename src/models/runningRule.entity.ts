import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { BusinessInformation } from "./businessInformation.entity.js";

@Entity()
export class RunningRule {
    // 운영 규정

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number;

    @ManyToOne(
        () => BusinessInformation,
        businessInformation => businessInformation.runningRule
    )
    @JoinColumn({ name: 'id' })
    businessInformation!: Relation<BusinessInformation>;

    @Column({
        type: 'text'
    })
    rule!: string;
}