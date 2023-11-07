var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Key } from "../enums/key.enum.js";
import { ResultReport } from "./resultReport.entity.js";
let BudgetResult = class BudgetResult {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BudgetResult.prototype, "id", void 0);
__decorate([
    Column({
        type: "integer"
    }),
    __metadata("design:type", Number)
], BudgetResult.prototype, "reportId", void 0);
__decorate([
    PrimaryColumn({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BudgetResult.prototype, "key", void 0);
__decorate([
    ManyToMany(() => ResultReport, resultReport => resultReport.budgetResult),
    JoinColumn({ name: 'reportId' }),
    __metadata("design:type", ResultReport)
], BudgetResult.prototype, "resultReport", void 0);
__decorate([
    Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BudgetResult.prototype, "subsidy", void 0);
__decorate([
    Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BudgetResult.prototype, "burden", void 0);
__decorate([
    Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BudgetResult.prototype, "interestAccrued", void 0);
BudgetResult = __decorate([
    Entity()
], BudgetResult);
export { BudgetResult };
//# sourceMappingURL=budgetResult.entity.js.map