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
import { Type } from "../enums/type.enum.js";
import { Business } from "./business.entity.js";
let Status = class Status {
};
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], Status.prototype, "id", void 0);
__decorate([
    OneToOne(() => Business, business => business.status),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], Status.prototype, "buisness", void 0);
__decorate([
    Column({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], Status.prototype, "year", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Status.prototype, "status", void 0);
Status = __decorate([
    Entity()
], Status);
export { Status };
//# sourceMappingURL=status.entity.js.map