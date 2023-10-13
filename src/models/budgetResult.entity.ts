
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Key } from "../enums/key.enum.js";
import { ResultReport } from "./resultReport.entity.js";

@Entity()
export class BudgetResult {
    // 예산 상세 결과

    // 기본 아이디
    @PrimaryGeneratedColumn()
    id!: number;

    // 보고서 아이디
    @Column({
        type: "integer"
    })
    reportId!: number;

    // 종류 (예산액? 집행액?)
    @PrimaryColumn({
        type: 'varchar'
    })
    key!: Key;

    @ManyToMany(
        () => ResultReport,
        resultReport => resultReport.budgetResult
    )
    @JoinColumn({ name: 'id' })
    resultReport!: ResultReport;

    // 보조금
    @Column({
        type: 'integer'
    })
    subsidy!: number;

    // 자부담
    @Column({
        type: 'integer'
    })
    burden!: number;

    // 보조금 이자 발생액
    @Column({
        type: 'integer'
    })
    interestAccrued!: number;
}