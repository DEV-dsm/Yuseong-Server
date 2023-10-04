import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { PerformanceResult } from "./performanceResult.entity.js";

@Entity()
export class PushResult {
    // 사업 추진 결과

    @PrimaryColumn()
    id!: number;

    @ManyToOne(
        () => PerformanceResult,
        performanceResult => performanceResult.pushResult
    )
    @JoinColumn({ name: 'id' })
    performanceResult!: Relation<PerformanceResult>;

    @Column({
        type: 'varchar'
    })
    businessName!: string;

    @Column({
        type: 'varchar'
    })
    businessResult!: string;

    @Column({
        type: 'text'
    })
    method!: string;

    @Column({
        type: 'text'
    })
    evaluation!: string;
}