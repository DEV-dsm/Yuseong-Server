var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Total } from "../enums/total.enum.js";
import { PerformanceResult } from "./performanceResult.entity.js";
let PerformanceDetail = class PerformanceDetail {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PerformanceDetail.prototype, "id", void 0);
__decorate([
    Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], PerformanceDetail.prototype, "reportId", void 0);
__decorate([
    ManyToOne(() => PerformanceResult, performanceResult => performanceResult.performanceDetail),
    JoinColumn({ name: 'reportId' }),
    __metadata("design:type", Object)
], PerformanceDetail.prototype, "performanceResult", void 0);
__decorate([
    Column({
        type: 'integer',
        default: false
    }),
    __metadata("design:type", Number)
], PerformanceDetail.prototype, "meeting", void 0);
__decorate([
    Column({
        type: 'integer',
        default: false
    }),
    __metadata("design:type", Number)
], PerformanceDetail.prototype, "education", void 0);
__decorate([
    Column({
        type: 'integer',
        default: false
    }),
    __metadata("design:type", Number)
], PerformanceDetail.prototype, "workshop", void 0);
__decorate([
    Column({
        type: 'integer',
        default: false
    }),
    __metadata("design:type", Number)
], PerformanceDetail.prototype, "festival", void 0);
__decorate([
    Column({
        type: 'integer',
        default: false
    }),
    __metadata("design:type", Number)
], PerformanceDetail.prototype, "etc", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], PerformanceDetail.prototype, "total", void 0);
PerformanceDetail = __decorate([
    Entity()
], PerformanceDetail);
export { PerformanceDetail };
//# sourceMappingURL=performanceDetail.entity.js.map