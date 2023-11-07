var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BusinessPlan } from "./businessPlan.entity.js";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
let BudgetDetail = class BudgetDetail {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BudgetDetail.prototype, "id", void 0);
__decorate([
    ManyToOne(() => BusinessPlan, businessPlan => businessPlan.budgetDetail),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], BudgetDetail.prototype, "businessPlan", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BudgetDetail.prototype, "budgetHead", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BudgetDetail.prototype, "budgetOrganization", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BudgetDetail.prototype, "subsidy", void 0);
__decorate([
    Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BudgetDetail.prototype, "subsidyBudget", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BudgetDetail.prototype, "self", void 0);
__decorate([
    Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BudgetDetail.prototype, "selfBudget", void 0);
BudgetDetail = __decorate([
    Entity()
], BudgetDetail);
export { BudgetDetail };
//# sourceMappingURL=budgetDetail.entity.js.map