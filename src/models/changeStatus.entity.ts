import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { PerformanceResult } from "./performanceResult.entity.js";

@Entity()
export class ChangeStatus {
    // 사업 변경 현황

    @PrimaryColumn()
    id!: number;

    @PrimaryColumn({
        type: 'varchar'
    })
    appliedDate!: string;

    @PrimaryColumn({
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
    @JoinColumn({ name: 'id' })
    performanceResult!: Relation<PerformanceResult>;
}