import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the title correctly", () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(<Header title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("does not render the subtitle when not provided", () => {
    render(<Header title="Test Title" />);
    expect(screen.queryByText("Test Subtitle")).not.toBeInTheDocument();
  });

  it("renders the AssistifyLogo component", () => {
    render(<Header title="Test Title" />);
    expect(screen.getByLabelText(/assistify logo/i)).toBeInTheDocument();
  });
});
