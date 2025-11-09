import { APIGatewayProxyHandler } from 'aws-lambda';
import { success } from '/opt/nodejs/src/responseHandler';

const sampleProducts = [
  { id: 1, name: 'Widget', price: 9.99 },
  { id: 2, name: 'Gadget', price: 19.99 }
];

export const listProducts: APIGatewayProxyHandler = async () => {
  return success(200, sampleProducts);
};