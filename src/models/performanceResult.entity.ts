import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { AchievementStatus } from "./achievementStatus.entity.js";
import { ChangeStatus } from "./changeStatus.entity.js";
import { PerformanceDetail } from "./performanceDetail.entity.js";
import { PushResult } from "./pushResult.entity.js";
import { UsingResource } from "./usingResource.entity.js";

@Entity()
export class PerformanceResult {
    // 사업 추진 성과

    @PrimaryColumn()
    id!: number;

    @OneToMany(
        () => PerformanceDetail,
        performanceDetail => performanceDetail.performanceResult
    )
    performanceDetail!: Relation<PerformanceDetail>[];

    @OneToMany(
        () => ChangeStatus,
        changeStatus => changeStatus.performanceResult
    )
    changeStatus!: Relation<ChangeStatus>[];

    @OneToMany(
        () => PushResult,
        pushResult => pushResult.performanceResult
    )
    pushResult!: Relation<PushResult>[];

    @OneToOne(
        () => AchievementStatus,
        achievementStatus => achievementStatus.performanceResult
    )
    achievementStatus!: Relation<AchievementStatus>;

    @OneToOne(
        () => UsingResource,
        usingResource => usingResource.performanceResult
    )
    usingResource!: Relation<UsingResource>;

    @Column({
        type: 'varchar'
    })
    businessType!: string;

    @Column({
        type: 'varchar'
    })
    businessName!: string;

    @Column({
        type: 'varchar'
    })
    clubName!: string;

    @Column({
        type: 'varchar'
    })
    period!: string;

    @Column({
        type: 'varchar'
    })
    location!: string;
}