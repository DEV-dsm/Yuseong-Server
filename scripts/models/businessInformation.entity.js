var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Business } from "./business.entity.js";
import { OperationDetail } from "./operationDetail.entity.js";
import { RegularyMeeting } from "./regularyMeeting.entity.js";
import { RunningRule } from "./runningRule.entity.js";
let BusinessInformation = class BusinessInformation {
};
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BusinessInformation.prototype, "id", void 0);
__decorate([
    OneToOne(() => Business, business => business.businessInformation),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], BusinessInformation.prototype, "business", void 0);
__decorate([
    OneToOne(() => RegularyMeeting, regularyMeeting => regularyMeeting.businessInformation),
    __metadata("design:type", RegularyMeeting)
], BusinessInformation.prototype, "regularyMeeting", void 0);
__decorate([
    OneToMany(() => RunningRule, runningRule => runningRule.businessInformation),
    __metadata("design:type", RunningRule)
], BusinessInformation.prototype, "runningRule", void 0);
__decorate([
    OneToMany(() => OperationDetail, operationDetail => operationDetail.businessInformation),
    __metadata("design:type", OperationDetail)
], BusinessInformation.prototype, "operationDetail", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BusinessInformation.prototype, "clubName", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BusinessInformation.prototype, "leaderName", void 0);
__decorate([
    Column({
        type: 'date'
    }),
    __metadata("design:type", Date)
], BusinessInformation.prototype, "clubBirth", void 0);
__decorate([
    Column({
        type: 'integer',
        default: 1
    }),
    __metadata("design:type", Number)
], BusinessInformation.prototype, "countOfMember", void 0);
__decorate([
    Column({
        type: 'integer',
        default: 1
    }),
    __metadata("design:type", Number)
], BusinessInformation.prototype, "countOfManager", void 0);
__decorate([
    Column({
        type: 'text',
    }),
    __metadata("design:type", String)
], BusinessInformation.prototype, "purpose", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], BusinessInformation.prototype, "mainBusiness", void 0);
__decorate([
    Column({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], BusinessInformation.prototype, "hasSystem", void 0);
__decorate([
    Column({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], BusinessInformation.prototype, "hasRunnigRule", void 0);
__decorate([
    Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], BusinessInformation.prototype, "mainActivity", void 0);
__decorate([
    Column({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], BusinessInformation.prototype, "whetherApplied", void 0);
BusinessInformation = __decorate([
    Entity()
], BusinessInformation);
export { BusinessInformation };
//# sourceMappingURL=businessInformation.entity.js.map