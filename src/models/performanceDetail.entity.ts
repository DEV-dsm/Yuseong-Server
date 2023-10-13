import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Total } from "../enums/total.enum.js";
import { PerformanceResult } from "./performanceResult.entity.js";

@Entity()
export class PerformanceDetail {
    // 추진 성과 상세

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'integer'
    })
    reportId!: number;

    @ManyToOne(
        () => PerformanceResult,
        performanceResult => performanceResult.performanceDetail
    )
    @JoinColumn({ name: 'reportId' })
    performanceResult!: Relation<PerformanceResult>;

    @Column({
        type: 'integer',
        default: false
    })
    meeting!: number;

    @Column({
        type: 'integer',
        default: false
    })
    education!: number;

    @Column({
        type: 'integer',
        default: false
    })
    workshop!: number;

    @Column({
        type: 'integer',
        default: false
    })
    festival!: number;

    @Column({
        type: 'integer',
        default: false
    })
    etc!: number;

    @Column({
        type: 'varchar'
    })
    total!: Total;
}