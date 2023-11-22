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
import { BusinessInformation } from "./businessInformation.entity.js";
let OperationDetail = class OperationDetail {
};
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], OperationDetail.prototype, "id", void 0);
__decorate([
    ManyToOne(() => BusinessInformation, businessInformation => businessInformation.operationDetail),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], OperationDetail.prototype, "businessInformation", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], OperationDetail.prototype, "location", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], OperationDetail.prototype, "period", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], OperationDetail.prototype, "businessName", void 0);
__decorate([
    Column({
        type: 'integer',
        default: false
    }),
    __metadata("design:type", Number)
], OperationDetail.prototype, "budget", void 0);
OperationDetail = __decorate([
    Entity()
], OperationDetail);
export { OperationDetail };
//# sourceMappingURL=operationDetail.entity.js.map