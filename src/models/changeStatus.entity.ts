import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { PerformanceResult } from "./performanceResult.entity.js";

@Entity()
export class ChangeStatus {
    // 사업 변경 현황

    @PrimaryColumn()
    id!: number;

    @Column({
        type: 'date'
    })
    appliedDate!: Date;

    @Column({
        type: 'date'
    })
    approvalDate!: Date;

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