import { act, renderHook } from "@testing-library/react-hooks";
import { useSession } from "next-auth/react";
import axiosInstance from "./axiosInstance";
import { useFetchUser } from "./users";

jest.mock("next-auth/react");
jest.mock("./axiosInstance");

describe("useFetchUser", () => {
  describe("authenticated", () => {
    const mockSession = { idToken: "mockToken" };

    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
    });

    it("should fetch user when user is authenticated", async () => {
      const mockResponse = { data: { Users: [] } };
      (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useFetchUser());

      let data;
      await act(async () => {
        data = await result.current.fetchUser();
      });

      expect(data).toEqual(mockResponse.data);
      expect(axiosInstance.get).toHaveBeenCalledWith("/api/users");
    });

    it("should handle axios error correctly", async () => {
      const mockError = { response: { data: "Error message" } };
      (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);

      const { result } = renderHook(() => useFetchUser());

      await expect(result.current.fetchUser()).rejects.toThrow(
        "An unexpected error occurred"
      );
    });
  });

  describe("unauthenticated", () => {
    it("should throw an error when user is not authenticated", async () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });
      const { result } = renderHook(() => useFetchUser());

      await expect(result.current.fetchUser()).rejects.toThrow(
        "User is not authenticated"
      );
    });
  });
});
