import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Order } from "../entities/Order";

// Keep module-level singletons to reuse across lambda invocations (avoid creating multiple connections)
let db1: DataSource;
let db2: DataSource;

const createDb1 = () =>
  new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB1_NAME,
    entities: [User, Order], // ['**/entities/*]
    synchronize: true,
    schema: "schema1",
  });

const createDb2 = () =>
  new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB2_NAME,
    entities: [User, Order],
    synchronize: false,
    schema: "schema2",
  });

export const getDbConnections = async () => {
  if (!db1) db1 = createDb1();
  if (!db2) db2 = createDb2();

  if (!db1.isInitialized) await db1.initialize();
  if (!db2.isInitialized) await db2.initialize();

  return { db1, db2 };
};
