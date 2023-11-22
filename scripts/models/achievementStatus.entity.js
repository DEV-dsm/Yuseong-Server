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
import { PerformanceResult } from "./performanceResult.entity.js";
let AchievementStatus = class AchievementStatus {
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], AchievementStatus.prototype, "id", void 0);
__decorate([
    OneToOne(() => PerformanceResult, performanceResult => performanceResult.achievementStatus),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], AchievementStatus.prototype, "performanceResult", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", Object)
], AchievementStatus.prototype, "changedMember", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", Object)
], AchievementStatus.prototype, "increaseMain", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", Object)
], AchievementStatus.prototype, "increaseNew", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", Object)
], AchievementStatus.prototype, "changedRelation", void 0);
AchievementStatus = __decorate([
    Entity()
], AchievementStatus);
export { AchievementStatus };
//# sourceMappingURL=achievementStatus.entity.js.map