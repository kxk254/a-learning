"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
const schema_1 = require("../db/schema");
let CatsService = class CatsService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    create(createCatDto) {
        return this.databaseService.db.insert(schema_1.cats).values(createCatDto);
    }
    findAll() {
        return this.databaseService.db.select().from(schema_1.cats);
    }
    findOne(id) {
        return `This action returns a #${id} cat`;
    }
    update(id, updateCatDto) {
        return `This action updates a #${id} cat`;
    }
    remove(id) {
        return `This action removes a #${id} cat`;
    }
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService])
], CatsService);
//# sourceMappingURL=cats.service.js.map