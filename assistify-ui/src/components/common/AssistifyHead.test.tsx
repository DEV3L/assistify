import { render, waitFor } from "@testing-library/react";
import AssistifyHead from "./AssistifyHead";

describe("AssistifyHead", () => {
  it("renders default title", async () => {
    render(<AssistifyHead />);
    await waitFor(() => {
      expect(document.title).toBe("Assistify");
    });
  });

  it("renders custom title", async () => {
    const customTitle = "Custom Title";
    render(<AssistifyHead title={customTitle} />);
    await waitFor(() => {
      expect(document.title).toBe(customTitle);
    });
  });
});
