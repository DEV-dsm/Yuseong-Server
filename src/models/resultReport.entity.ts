import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { BudgetResult } from "./budgetResult.entity.js";

@Entity()
export class ResultReport {
    // 결과보고서

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToMany(
        () => BudgetResult,
        budgetResult => budgetResult.resultReport
    )
    budgetResult!: Relation<BudgetResult>[];

    // 공동체명
    @Column({
        type: 'varchar'
    })
    clubName!: string;

    // 사업명
    @Column({
        type: 'varchar'
    })
    businessName!: string;

    // 작성일
    @Column({
        type: 'varchar'
    })
    date!: string;

    // 대표자
    @Column({
        type: 'varchar'
    })
    leader!: string;

    // 작성자
    @Column({
        type: 'varchar'
    })
    writer!: string;

    // 연락처
    @Column({
        type: 'varchar'
    })
    phone!: string;
}