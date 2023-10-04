import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { BusinessPlan } from "./businessPlan.entity.js";

@Entity()
export class BudgetPlan {
    // 예산 기획

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number;

    @OneToOne(
        () => BusinessPlan,
        businessPlan => businessPlan.budgetPlan
    )
    @JoinColumn({ name: 'id' })
    businessPlan!: Relation<BusinessPlan>;

    @Column({
        type: 'integer',
        nullable: true
    })
    subsidyMeal?: number;

    @Column({
        type: 'integer',
        nullable: true
    })
    subsidyActivity?: number;

    @Column({
        type: 'integer',
        nullable: true
    })
    subsidyOperating?: number;

    @Column({
        type: 'integer',
        nullable: true
    })
    subsidyFacility?: number;

    @Column({
        type: 'integer',
        nullable: true
    })
    selfMeal?: number;

    @Column({
        type: 'integer',
        nullable: true
    })
    selfActivity?: number;

    @Column({
        type: 'integer',
        nullable: true
    })
    selfOperating?: number;

    @Column({
        type: 'integer',
        nullable: true
    })
    selfFacility?: number;
}