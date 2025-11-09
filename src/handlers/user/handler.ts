import "reflect-metadata"; // ✅ Must be the very first line
import * as dotenv from "dotenv";
dotenv.config(); // Only affects local offline run

import { APIGatewayProxyHandler } from "aws-lambda";
import { getDbConnections } from "/opt/nodejs/src/connection";
import { success, failure } from "/opt/nodejs/src/responseHandler";

export const getUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { db1 } = await getDbConnections();
    const userRepo = db1.getRepository("User");
    const id = event.pathParameters?.id;
    const user = await userRepo.findOneBy({
      id: id ? parseInt(id) : undefined,
    });
    if (!user) return failure(404, "User not found");
    return success(200, user);
  } catch (err: any) {
    console.error(err);
    return failure(500, err.message || "Internal error");
  }
};
