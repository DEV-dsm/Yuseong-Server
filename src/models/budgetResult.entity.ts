
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Key } from "../enums/key.enum.js";
import { ResultReport } from "./resultReport.entity.js";

@Entity()
export class BudgetResult {
    // 예산 상세 결과

    @PrimaryColumn()
    id!: number;

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

    @Column({
        type: 'integer'
    })
    subsidy!: number;

    @Column({
        type: 'integer'
    })
    burden!: number;
}