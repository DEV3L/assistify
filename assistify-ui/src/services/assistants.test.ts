import { act, renderHook } from "@testing-library/react-hooks";
import { useSession } from "next-auth/react";
import { useFetchAssistants } from "./assistants";
import axiosInstance from "./axiosInstance";

jest.mock("next-auth/react");
jest.mock("./axiosInstance");

describe("useFetchAssistants", () => {
  describe("authenticated", () => {
    const mockSession = { idToken: "mockToken" };

    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockSession,
        status: "authenticated",
      });
    });

    it("should fetch assistants when user is authenticated", async () => {
      const mockResponse = { data: { assistants: [] } };
      (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useFetchAssistants());

      let data;
      await act(async () => {
        data = await result.current.fetchAssistants();
      });

      expect(data).toEqual(mockResponse.data);
      expect(axiosInstance.get).toHaveBeenCalledWith("/assistants");
    });

    it("should handle axios error correctly", async () => {
      const mockError = { response: { data: "Error message" } };
      (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);

      const { result } = renderHook(() => useFetchAssistants());

      await expect(result.current.fetchAssistants()).rejects.toThrow(
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
      const { result } = renderHook(() => useFetchAssistants());

      await expect(result.current.fetchAssistants()).rejects.toThrow(
        "User is not authenticated"
      );
    });
  });
});
