import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { BusinessPlan } from "./businessPlan.entity.js";

@Entity()
export class LocalResource {
    // 지역 자원 연계 및 활용 방안

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number;

    @ManyToOne(
        () => BusinessPlan,
        businessPlan => businessPlan.localResource
    )
    @JoinColumn({ name: 'id' })
    businessPlan!: Relation<BusinessPlan>;

    @Column({
        type: 'varchar',
        nullable: true
    })
    type?: string;

    @Column({
        type: 'varchar'
    })
    cooperation!: string;

    @Column({
        type: 'text'
    })
    detail!: string;
}