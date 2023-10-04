import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { Key } from "../enums/key.enum.js";
import { Total } from "../enums/total.enum.js";
import { PerformanceResult } from "./performanceResult.entity.js";

@Entity()
export class PerformanceDetail {
    // 추진 성과 상세

    @PrimaryColumn()
    id!: number;

    @ManyToOne(
        () => PerformanceResult,
        performanceResult => performanceResult.performanceDetail
    )
    @JoinColumn({ name: 'id' })
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