import { render } from "@testing-library/react";
import { SectionCard } from "./SectionCard";

/**
 * Unit tests for the SectionCard component.
 */
describe("SectionCard", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(
      <SectionCard title="Test Title">
        <div>Test Content</div>
      </SectionCard>
    );
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <SectionCard title="Test Title">
        <div>Test Content</div>
      </SectionCard>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
