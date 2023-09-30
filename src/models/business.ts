import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { businessType } from "../enums/businessType.enum.js";
import { clubType } from "../enums/clubType.enum.js";
import { loc } from "../enums/loc.enum.js";

@Entity()
export class Business {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar'
    })
    businessType!: businessType;

    @Column({
        type: 'varchar'
    })
    clubName!: string;

    @Column({
        type: 'boolean'
    })
    isContiguous!: boolean;

    @Column({
        type: 'varchar',
        nullable: true
    })
    contiguousLocation?: loc;

    @Column({
        type: 'varchar'
    })
    businessName!: string;

    @Column({
        type: 'integer'
    })
    totalBudget!: number;

    @Column({
        type: 'integer'
    })
    subsidy!: number;

    @Column({
        type: 'integer'
    })
    selfInflicted!: number;

    @Column({
        type: 'varchar'
    })
    clubType!: clubType;

    @Column({
        type: 'integer'
    })
    countOfManager!: number;

    @Column({
        type: 'integer',
        default: 0
    })
    countOfMember!: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    clubAddress?: string;

    @Column({
        type: 'integer'
    })
    clubRegisterNumber!: number;

    @Column({
        type: 'boolean',
        default: false
    })
    isIncludingInfo!: boolean;

    @Column({
        type: 'boolean',
        default: false
    })
    isIncludingMemberList!: boolean;

    @Column({
        type: 'boolean',
        default: false
    })
    isIncludingPlan!: boolean;

    @Column({
        type: 'integer'
    })
    year!: number;
}