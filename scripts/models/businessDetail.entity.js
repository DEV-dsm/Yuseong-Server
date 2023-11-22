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
import { BusinessPlan } from "./businessPlan.entity.js";
let BusinessDetail = class BusinessDetail {
};
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BusinessDetail.prototype, "id", void 0);
__decorate([
    ManyToOne(() => BusinessPlan, businessPlan => businessPlan.businessDetail),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], BusinessDetail.prototype, "businessPaln", void 0);
__decorate([
    Column({
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], BusinessDetail.prototype, "name", void 0);
__decorate([
    Column({
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], BusinessDetail.prototype, "period", void 0);
__decorate([
    Column({
        type: 'text',
        nullable: true
    }),
    __metadata("design:type", String)
], BusinessDetail.prototype, "reason", void 0);
BusinessDetail = __decorate([
    Entity()
], BusinessDetail);
export { BusinessDetail };
//# sourceMappingURL=businessDetail.entity.js.map