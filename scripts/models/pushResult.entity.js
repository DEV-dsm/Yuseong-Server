var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PerformanceResult } from "./performanceResult.entity.js";
let PushResult = class PushResult {
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], PushResult.prototype, "id", void 0);
__decorate([
    ManyToOne(() => PerformanceResult, performanceResult => performanceResult.pushResult),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], PushResult.prototype, "performanceResult", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], PushResult.prototype, "businessName", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], PushResult.prototype, "businessResult", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], PushResult.prototype, "method", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], PushResult.prototype, "evaluation", void 0);
PushResult = __decorate([
    Entity()
], PushResult);
export { PushResult };
//# sourceMappingURL=pushResult.entity.js.map