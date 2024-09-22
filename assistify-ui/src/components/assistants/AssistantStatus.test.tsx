import { render, screen } from "@testing-library/react";
import { AssistantStatus } from "./AssistantStatus";

describe("AssistantStatus", () => {
  it("renders the status text and icon", () => {
    render(<AssistantStatus status="Active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
