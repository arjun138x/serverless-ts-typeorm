import { getUser } from "../../src/handlers/user/handler";
import { APIGatewayProxyEvent } from "aws-lambda";

jest.mock("/opt/nodejs/src/connection", () => ({
  getDbConnections: jest.fn().mockResolvedValue({
    db1: {
      getRepository: jest.fn().mockReturnValue({
        findOneBy: jest.fn().mockResolvedValue({ id: 1, name: "John Doe" }),
      }),
    },
  }),
}));

describe("User Handler", () => {
  it("should return user data successfully", async () => {
    const event = {
      pathParameters: { id: "1" },
    } as unknown as APIGatewayProxyEvent;
    const result: any = await getUser(event, {} as any, () => {});

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).data.name).toBe("John Doe");
  });

  it("should handle missing user", async () => {
    jest
      .mocked(require("/opt/nodejs/src/connection").getDbConnections)
      .mockResolvedValueOnce({
        db1: {
          getRepository: () => ({
            findOneBy: jest.fn().mockResolvedValue(null),
          }),
        },
      });

    const event = {
      pathParameters: { id: "99" },
    } as unknown as APIGatewayProxyEvent;
    const result: any = await getUser(event, {} as any, () => {});

    expect(result.statusCode).toBe(404);
  });
});
