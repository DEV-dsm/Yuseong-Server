var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Sex } from "../enums/sex.enum.js";
import { BusinessMapping } from "./businessMapping.entity.js";
let Resident = class Resident {
};
__decorate([
    PrimaryColumn({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Resident.prototype, "phone", void 0);
__decorate([
    OneToMany(() => BusinessMapping, businessMapping => businessMapping.resident),
    __metadata("design:type", Object)
], Resident.prototype, "businessMappping", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Resident.prototype, "name", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Resident.prototype, "sex", void 0);
__decorate([
    Column({
        type: 'date'
    }),
    __metadata("design:type", Date)
], Resident.prototype, "birth", void 0);
__decorate([
    Column({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], Resident.prototype, "location", void 0);
Resident = __decorate([
    Entity()
], Resident);
export { Resident };
//# sourceMappingURL=resident.entity.js.map