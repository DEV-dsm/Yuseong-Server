import { BusinessPlan } from "./businessPlan.entity.js";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class BudgetDetail {
    // 예산 상세

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(
        () => BusinessPlan,
        businessPlan => businessPlan.budgetDetail
    )
    @JoinColumn({ name: 'id' })
    businessPlan!: Relation<BusinessPlan>;
    
    @Column({
        type: 'varchar'
    })
    budgetHead!: string;

    @Column({
        type: 'varchar'
    })
    budgetOrganization!: string;

    @Column({
        type: 'varchar'
    })
    subsidy!: string;

    @Column({
        type: 'integer'
    })
    subsidyBudget!: number;

    @Column({
        type: 'varchar'
    })
    self!: string;

    @Column({
        type: 'integer'
    })
    selfBudget!: number;
}