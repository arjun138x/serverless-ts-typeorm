import { getDbConnections } from "/opt/nodejs/src/connection";
import { DataSource } from "typeorm";

jest.mock("typeorm", () => {
  const actual = jest.requireActual("typeorm");
  return {
    ...actual,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(true),
      isInitialized: false,
    })),
  };
});

describe("DB Layer", () => {
  it("should initialize DB connections", async () => {
    const result = await getDbConnections();
    expect(result).toHaveProperty("db1");
    expect(result).toHaveProperty("db2");
  });
});
