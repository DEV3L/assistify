import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { getSession } from "next-auth/react";
import axiosInstance from "./axiosInstance";

jest.mock("next-auth/react", () => ({
  getSession: jest.fn(),
}));

describe("axiosInstance", () => {
  let mock: MockAdapter;
  let instance: AxiosInstance = axiosInstance;

  beforeEach(() => {
    mock = new MockAdapter(instance);
  });

  it("should include Authorization header if session has idToken", async () => {
    (getSession as jest.Mock).mockResolvedValue({ idToken: "test-token" });

    mock.onGet("/test").reply(200);

    const response = await instance.get("/test");
    expect(response.config.headers.Authorization).toBe("Bearer test-token");
  });

  it("should not include Authorization header if session does not have idToken", async () => {
    (getSession as jest.Mock).mockResolvedValue(null);

    mock.onGet("/test").reply(200);

    const response = await instance.get("/test");
    expect(response.config.headers.Authorization).toBeUndefined();
  });
});
