import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { BudgetDetail } from "./budgetDetail.entity.js";
import { BudgetPlan } from "./budgetPlan.entity.js";
import { Business } from "./business.entity.js";
import { BusinessDetail } from "./businessDetail.entity.js";
import { LocalResource } from "./localResource.entity.js";

@Entity()
export class BusinessPlan {
    // 사업계획서 4-5

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number;

    @OneToOne(
        () => Business,
        business => business.businessPlan
    )
    @JoinColumn({ name: 'id' })
    business!: Relation<Business>;

    @OneToMany(
        () => BusinessDetail,
        businessDetail => businessDetail.businessPaln
    )
    businessDetail!: Relation<BusinessDetail>[];

    @OneToMany(
        () => LocalResource,
        localResource => localResource.businessPlan
    )
    localResource!: Relation<LocalResource>[];

    @OneToOne(
        () => BudgetPlan,
        budgetPlan => budgetPlan.businessPlan
    )
    budgetPlan!: Relation<BudgetPlan>;

    @OneToMany(
        () => BudgetDetail,
        budgetDetail => budgetDetail.businessPlan
    )
    budgetDetail!: Relation<BudgetDetail>[];

    @Column({
        type: 'varchar'
    })
    businessName!: string;

    @Column({
        type: 'text'
    })
    evaluation!: string;

    @Column({
        type: 'text'
    })
    purposeAndBackGround!: string;

    @Column({
        type: 'text'
    })
    benefit!: string;

    @Column({
        type: 'varchar'
    })
    period!: string;

    @Column({
        type: 'varchar'
    })
    location!: string;

    @Column({
        type: 'varchar'
    })
    target!: string;

    @Column({
        type: 'text'
    })
    method!: string;
}