var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BudgetResult } from "./budgetResult.entity.js";
let ResultReport = class ResultReport {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ResultReport.prototype, "id", void 0);
__decorate([
    ManyToMany(() => BudgetResult, budgetResult => budgetResult.resultReport),
    __metadata("design:type", Array)
], ResultReport.prototype, "budgetResult", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ResultReport.prototype, "clubName", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ResultReport.prototype, "businessName", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ResultReport.prototype, "date", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ResultReport.prototype, "leader", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ResultReport.prototype, "writer", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ResultReport.prototype, "phone", void 0);
ResultReport = __decorate([
    Entity()
], ResultReport);
export { ResultReport };
//# sourceMappingURL=resultReport.entity.js.map