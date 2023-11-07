var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClubType } from "../enums/clubType.enum.js";
import { BusinessInformation } from "./businessInformation.entity.js";
import { BusinessMapping } from "./businessMapping.entity.js";
import { BusinessPlan } from "./businessPlan.entity.js";
import { Status } from "./status.entity.js";
let Business = class Business {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Business.prototype, "id", void 0);
__decorate([
    OneToOne(() => Status, status => status.buisness),
    __metadata("design:type", Object)
], Business.prototype, "status", void 0);
__decorate([
    OneToOne(() => BusinessInformation, businessInformation => businessInformation.business),
    __metadata("design:type", Object)
], Business.prototype, "businessInformation", void 0);
__decorate([
    OneToMany(() => BusinessMapping, businessMapping => businessMapping.business),
    __metadata("design:type", Array)
], Business.prototype, "businessMapping", void 0);
__decorate([
    OneToOne(() => BusinessPlan, businessPlan => businessPlan.business),
    __metadata("design:type", Object)
], Business.prototype, "businessPlan", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", Object)
], Business.prototype, "businessType", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Business.prototype, "clubName", void 0);
__decorate([
    Column({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], Business.prototype, "isContiguous", void 0);
__decorate([
    Column({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Business.prototype, "contiguousLocation", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Business.prototype, "businessName", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Business.prototype, "businessLocation", void 0);
__decorate([
    Column({
        type: 'integer',
        default: 0
    }),
    __metadata("design:type", Number)
], Business.prototype, "totalBudget", void 0);
__decorate([
    Column({
        type: 'integer',
        default: 0
    }),
    __metadata("design:type", Number)
], Business.prototype, "subsidy", void 0);
__decorate([
    Column({
        type: 'integer',
        default: 0,
    }),
    __metadata("design:type", Number)
], Business.prototype, "selfInflicted", void 0);
__decorate([
    Column({
        type: 'varchar',
    }),
    __metadata("design:type", Number)
], Business.prototype, "clubType", void 0);
__decorate([
    Column({
        type: 'integer',
        default: 1
    }),
    __metadata("design:type", Number)
], Business.prototype, "countOfManager", void 0);
__decorate([
    Column({
        type: 'integer',
        default: 1
    }),
    __metadata("design:type", Number)
], Business.prototype, "countOfMember", void 0);
__decorate([
    Column({
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], Business.prototype, "clubAddress", void 0);
__decorate([
    Column({
        type: 'integer',
        default: 0
    }),
    __metadata("design:type", Number)
], Business.prototype, "clubRegisterNumber", void 0);
__decorate([
    Column({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], Business.prototype, "isIncludingInfo", void 0);
__decorate([
    Column({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], Business.prototype, "isIncludingMemberList", void 0);
__decorate([
    Column({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], Business.prototype, "isIncludingPlan", void 0);
__decorate([
    Column({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], Business.prototype, "year", void 0);
Business = __decorate([
    Entity()
], Business);
export { Business };
//# sourceMappingURL=business.entity.js.map