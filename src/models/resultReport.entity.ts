import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { BudgetResult } from "./budgetResult.entity.js";

@Entity()
export class ResultReport {
    // 결과보고서

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(
        () => BudgetResult,
        budgetResult => budgetResult.resultReport
    )
    budgetResult!: Relation<BudgetResult>[];


    @Column({
        type: 'varchar'
    })
    clubName!: string;

    @Column({
        type: 'varchar'
    })
    businessName!: string;

    @Column({
        type: 'date'
    })
    date!: Date;

    @Column({
        type: 'varchar'
    })
    leader!: string;

    @Column({
        type: 'varchar'
    })
    writer!: string;

    @Column({
        type: 'varchar'
    })
    phone!: string;
}