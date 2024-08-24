import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { WelcomeMessage } from "./WelcomeMessage";

describe("WelcomeMessage", () => {
  it("renders null when no name is provided", () => {
    render(<WelcomeMessage name={null} />);
    expect(screen.queryByText(/Welcome to Assistify/i)).toBeInTheDocument();
  });

  it("renders welcome message when name is provided", () => {
    render(<WelcomeMessage name="John" />);
    expect(screen.getByText(/Welcome to Assistify/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome, John/i)).toBeInTheDocument();
  });

  it("renders the Assistify logo", () => {
    render(<WelcomeMessage name="John" />);
    expect(screen.getByLabelText(/assistify logo/i)).toBeInTheDocument();
  });
});
