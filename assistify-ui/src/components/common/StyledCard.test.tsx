import { render } from "@testing-library/react";
import StyledCard from "./StyledCard";

/**
 * Unit tests for the StyledCard component.
 */
describe("StyledCard", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <StyledCard>
        <div>Test Content</div>
      </StyledCard>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies hover styles correctly", () => {
    const { container } = render(
      <StyledCard>
        <div>Hover Test</div>
      </StyledCard>
    );
    const card = container.firstChild;
    expect(card).toHaveStyle("transition: transform 0.3s,box-shadow 0.3s");
  });
});
