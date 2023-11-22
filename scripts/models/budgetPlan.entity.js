var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { BusinessPlan } from "./businessPlan.entity.js";
let BudgetPlan = class BudgetPlan {
};
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "id", void 0);
__decorate([
    OneToOne(() => BusinessPlan, businessPlan => businessPlan.budgetPlan),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], BudgetPlan.prototype, "businessPlan", void 0);
__decorate([
    Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "subsidyMeal", void 0);
__decorate([
    Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "subsidyActivity", void 0);
__decorate([
    Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "subsidyOperating", void 0);
__decorate([
    Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "subsidyFacility", void 0);
__decorate([
    Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "selfMeal", void 0);
__decorate([
    Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "selfActivity", void 0);
__decorate([
    Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "selfOperating", void 0);
__decorate([
    Column({
        type: 'integer',
        nullable: true
    }),
    __metadata("design:type", Number)
], BudgetPlan.prototype, "selfFacility", void 0);
BudgetPlan = __decorate([
    Entity()
], BudgetPlan);
export { BudgetPlan };
//# sourceMappingURL=budgetPlan.entity.js.map