"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.cats = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.cats = (0, pg_core_1.pgTable)('cats', {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)({ length: 59 }).notNull(),
    age: (0, pg_core_1.integer)().notNull(),
    breed: (0, pg_core_1.varchar)({ length: 255 }),
});
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    username: (0, pg_core_1.varchar)({ length: 100 }).notNull(),
    password: (0, pg_core_1.varchar)({ length: 20 }).notNull(),
});
//# sourceMappingURL=schema.js.map