import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { PerformanceResult } from "./performanceResult.entity.js";

@Entity()
export class UsingResource {
    // 지역 자원 활용 및 연계

    @PrimaryColumn()
    id!: number;

    @OneToOne(
        () => PerformanceResult,
        performanceResult => performanceResult.usingResource
    )
    @JoinColumn({ name: 'id' })
    performanceResult!: Relation<PerformanceResult>;

    @Column({
        type: 'text'
    })
    evaluation!: string;

    @Column({
        type: 'text'
    })
    changedAfter!: string;

    @Column({
        type: 'text'
    })
    difficultOrSuggest!: string;

    @Column({
        type: 'text'
    })
    nextPlan!: string;
}