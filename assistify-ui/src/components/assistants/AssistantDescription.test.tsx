import { render, screen } from "@testing-library/react";
import { AssistantDescription } from "./AssistantDescription";

describe("AssistantDescription", () => {
  const summary = "Short summary.";

  it("renders the short summary", () => {
    render(<AssistantDescription summary={summary} />);
    expect(screen.getByText("Short summary.")).toBeInTheDocument();
  });
});
