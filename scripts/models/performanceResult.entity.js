var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { AchievementStatus } from "./achievementStatus.entity.js";
import { ChangeStatus } from "./changeStatus.entity.js";
import { PerformanceDetail } from "./performanceDetail.entity.js";
import { PushResult } from "./pushResult.entity.js";
import { UsingResource } from "./usingResource.entity.js";
let PerformanceResult = class PerformanceResult {
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], PerformanceResult.prototype, "id", void 0);
__decorate([
    OneToMany(() => PerformanceDetail, performanceDetail => performanceDetail.performanceResult),
    __metadata("design:type", Array)
], PerformanceResult.prototype, "performanceDetail", void 0);
__decorate([
    OneToMany(() => ChangeStatus, changeStatus => changeStatus.performanceResult),
    __metadata("design:type", Array)
], PerformanceResult.prototype, "changeStatus", void 0);
__decorate([
    OneToMany(() => PushResult, pushResult => pushResult.performanceResult),
    __metadata("design:type", Array)
], PerformanceResult.prototype, "pushResult", void 0);
__decorate([
    OneToOne(() => AchievementStatus, achievementStatus => achievementStatus.performanceResult),
    __metadata("design:type", Object)
], PerformanceResult.prototype, "achievementStatus", void 0);
__decorate([
    OneToOne(() => UsingResource, usingResource => usingResource.performanceResult),
    __metadata("design:type", Object)
], PerformanceResult.prototype, "usingResource", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], PerformanceResult.prototype, "businessType", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], PerformanceResult.prototype, "period", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], PerformanceResult.prototype, "location", void 0);
PerformanceResult = __decorate([
    Entity()
], PerformanceResult);
export { PerformanceResult };
//# sourceMappingURL=performanceResult.entity.js.map