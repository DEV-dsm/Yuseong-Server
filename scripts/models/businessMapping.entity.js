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
import { Business } from "./business.entity.js";
import { Resident } from "./resident.entity.js";
let BusinessMapping = class BusinessMapping {
};
__decorate([
    PrimaryColumn({
        type: 'integer'
    }),
    __metadata("design:type", Number)
], BusinessMapping.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Business, business => business.businessMapping),
    JoinColumn({ name: 'id' }),
    __metadata("design:type", Object)
], BusinessMapping.prototype, "business", void 0);
__decorate([
    PrimaryColumn({
        type: 'varchar'
    }),
    __metadata("design:type", String)
], BusinessMapping.prototype, "phone", void 0);
__decorate([
    ManyToOne(() => Resident, resident => resident.phone),
    JoinColumn({ name: 'phone' }),
    __metadata("design:type", Resident)
], BusinessMapping.prototype, "resident", void 0);
__decorate([
    Column({
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], BusinessMapping.prototype, "rule", void 0);
BusinessMapping = __decorate([
    Entity()
], BusinessMapping);
export { BusinessMapping };
//# sourceMappingURL=businessMapping.entity.js.map