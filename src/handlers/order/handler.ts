import "reflect-metadata"; // ✅ Must be the very first line
import { APIGatewayProxyHandler } from "aws-lambda";
import { getDbConnections } from "/opt/nodejs/src/connection";
import { success, failure } from "/opt/nodejs/src/responseHandler";

export const getOrder: APIGatewayProxyHandler = async (event) => {
  try {
    const { db2 } = await getDbConnections();
    const orderRepo = db2.getRepository("Order");
    const id = event.pathParameters?.id;
    const order = await orderRepo.findOneBy({
      id: id ? parseInt(id) : undefined,
    });
    if (!order) return failure(404, "Order not found");
    return success(200, order);
  } catch (err: any) {
    console.error(err);
    return failure(500, err.message || "Internal error");
  }
};
