var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PerformanceResult } from "./performanceResult.entity.js";
let ChangeStatus = class ChangeStatus {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChangeStatus.prototype, "id", void 0);
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], ChangeStatus.prototype, "reportId", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ChangeStatus.prototype, "appliedDate", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ChangeStatus.prototype, "approvalDate", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], ChangeStatus.prototype, "changedContent", void 0);
__decorate([
    ManyToOne(() => PerformanceResult, performanceResult => performanceResult.changeStatus),
    JoinColumn({ name: 'reportId' }),
    __metadata("design:type", Object)
], ChangeStatus.prototype, "performanceResult", void 0);
ChangeStatus = __decorate([
    Entity()
], ChangeStatus);
export { ChangeStatus };
//# sourceMappingURL=changeStatus.entity.js.map