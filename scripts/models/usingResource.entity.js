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
let UsingResource = class UsingResource {
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], UsingResource.prototype, "id", void 0);
__decorate([
    OneToOne(() => PerformanceResult, performanceResult => performanceResult.usingResource),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], UsingResource.prototype, "performanceResult", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], UsingResource.prototype, "evaluation", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], UsingResource.prototype, "changedAfter", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], UsingResource.prototype, "difficultOrSuggest", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], UsingResource.prototype, "nextPlan", void 0);
UsingResource = __decorate([
    Entity()
], UsingResource);
export { UsingResource };
//# sourceMappingURL=usingResource.entity.js.map