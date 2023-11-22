var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { BudgetDetail } from "./budgetDetail.entity.js";
import { BudgetPlan } from "./budgetPlan.entity.js";
import { Business } from "./business.entity.js";
import { BusinessDetail } from "./businessDetail.entity.js";
import { LocalResource } from "./localResource.entity.js";
let BusinessPlan = class BusinessPlan {
};
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BusinessPlan.prototype, "id", void 0);
__decorate([
    OneToOne(() => Business, business => business.businessPlan),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], BusinessPlan.prototype, "business", void 0);
__decorate([
    OneToMany(() => BusinessDetail, businessDetail => businessDetail.businessPaln),
    __metadata("design:type", Array)
], BusinessPlan.prototype, "businessDetail", void 0);
__decorate([
    OneToMany(() => LocalResource, localResource => localResource.businessPlan),
    __metadata("design:type", Array)
], BusinessPlan.prototype, "localResource", void 0);
__decorate([
    OneToOne(() => BudgetPlan, budgetPlan => budgetPlan.businessPlan),
    __metadata("design:type", Object)
], BusinessPlan.prototype, "budgetPlan", void 0);
__decorate([
    OneToMany(() => BudgetDetail, budgetDetail => budgetDetail.businessPlan),
    __metadata("design:type", Array)
], BusinessPlan.prototype, "budgetDetail", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "businessName", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "evaluation", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "purposeAndBackGround", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "benefit", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "period", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "location", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "target", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], BusinessPlan.prototype, "method", void 0);
BusinessPlan = __decorate([
    Entity()
], BusinessPlan);
export { BusinessPlan };
//# sourceMappingURL=businessPlan.entity.js.map