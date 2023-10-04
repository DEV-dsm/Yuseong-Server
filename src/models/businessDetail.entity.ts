import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { BusinessPlan } from "./businessPlan.entity.js";

@Entity()
export class BusinessDetail {
    // 세부 사업

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number;

    @ManyToOne(
        () => BusinessPlan,
        businessPlan => businessPlan.businessDetail
    )
    @JoinColumn({ name: 'id' })
    businessPaln!: Relation<BusinessPlan>;

    @Column({
        type: 'varchar',
        nullable: true
    })
    name?: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    period?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    reason?: string;
}