import { render, screen } from "@testing-library/react";
import { AboutAssistify } from "./AboutAssistify";

describe("AboutAssistify", () => {
  it("renders the vision, goals, and values of Assistify", () => {
    render(<AboutAssistify />);
    expect(screen.getByText("Welcome to Assistify!")).toBeInTheDocument();
    expect(
      screen.getByText(
        /At Assistify, our mission is to revolutionize professional workflows through the power of AI./
      )
    ).toBeInTheDocument();
  });
});
