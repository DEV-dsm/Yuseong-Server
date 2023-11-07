import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PerformanceResult } from "./performanceResult.entity.js";

@Entity()
export class ChangeStatus {
    // 사업 변경 현황

    @PrimaryGeneratedColumn()
    id!: number;

    @PrimaryColumn({
        type: 'integer'
    })
    reportId!: number;

    @Column({
        type: 'varchar'
    })
    appliedDate!: string;

    @Column({
        type: 'varchar'
    })
    approvalDate!: string;

    @Column({
        type: 'varchar'
    })
    changedContent!: string;

    @ManyToOne(
        () => PerformanceResult,
        performanceResult => performanceResult.changeStatus
    )
    @JoinColumn({ name: 'reportId' })
    performanceResult!: Relation<PerformanceResult>;
}