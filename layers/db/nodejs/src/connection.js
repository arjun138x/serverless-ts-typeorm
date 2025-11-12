"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConnections = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Order_1 = require("../entities/Order");
// Keep module-level singletons to reuse across lambda invocations (avoid creating multiple connections)
let db1;
let db2;
const createDb1 = () => new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB1_NAME,
    entities: [User_1.User, Order_1.Order], // ['**/entities/*]
    synchronize: true,
    schema: "schema1",
});
const createDb2 = () => new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB2_NAME,
    entities: [User_1.User, Order_1.Order],
    synchronize: false,
    schema: "schema2",
});
const getDbConnections = async () => {
    if (!db1)
        db1 = createDb1();
    if (!db2)
        db2 = createDb2();
    if (!db1.isInitialized)
        await db1.initialize();
    if (!db2.isInitialized)
        await db2.initialize();
    return { db1, db2 };
};
exports.getDbConnections = getDbConnections;
//# sourceMappingURL=connection.js.map