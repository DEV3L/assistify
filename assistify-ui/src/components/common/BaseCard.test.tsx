import { render } from "@testing-library/react";
import BaseCard from "./BaseCard";

/**
 * Unit tests for the BaseCard component.
 */
describe("BaseCard", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <BaseCard>
        <div>Test Content</div>
      </BaseCard>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies hover styles correctly", () => {
    const { container } = render(
      <BaseCard>
        <div>Hover Test</div>
      </BaseCard>
    );
    const card = container.firstChild;
    expect(card).toHaveStyle("transition: transform 0.3s,box-shadow 0.3s");
  });
});
