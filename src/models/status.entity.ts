import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation } from "typeorm";
import { Type } from "../enums/type.enum.js";
import { Business } from "./business.entity.js";

@Entity()
export class Status {
    // 상태

    @PrimaryColumn({
        type: 'integer'
    })
    id!: number;

    @OneToOne(
        () => Business,
        business => business.status
    )
    @JoinColumn({ name: 'id' })
    buisness!: Relation<Business>;

    @Column({
        type: 'integer'
    })
    year!: number;

    @Column({
        type: 'varchar'
    })
    status!: Type;
}