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
let LocalResource = class LocalResource {
};
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], LocalResource.prototype, "id", void 0);
__decorate([
    ManyToOne(() => BusinessPlan, businessPlan => businessPlan.localResource),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], LocalResource.prototype, "businessPlan", void 0);
__decorate([
    Column({
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], LocalResource.prototype, "type", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], LocalResource.prototype, "cooperation", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], LocalResource.prototype, "detail", void 0);
LocalResource = __decorate([
    Entity()
], LocalResource);
export { LocalResource };
//# sourceMappingURL=localResource.entity.js.map