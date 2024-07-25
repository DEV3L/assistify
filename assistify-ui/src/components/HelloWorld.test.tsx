import { render, screen } from "@testing-library/react";
import HelloWorld from "./HelloWorld";

test("renders Hello, World!", () => {
  render(<HelloWorld />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});
