import "reflect-metadata";
import { APIGatewayProxyHandler } from "aws-lambda";
import { getDbConnections } from "/opt/nodejs/src/connection";
import { success, failure } from "/opt/nodejs/src/responseHandler";
import { User } from "/opt/nodejs/entities/User";

export const getUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { db1 } = await getDbConnections();
    const userRepo = db1.getRepository(User);
    const id = event.pathParameters?.id ? Number(event.pathParameters.id) : 0;

    const user = await userRepo.findOneBy({ id });
    if (!user) return failure(404, "User not found");

    return success(200, user);
  } catch (err: any) {
    console.error(err);
    return failure(500, err.message);
  }
};
