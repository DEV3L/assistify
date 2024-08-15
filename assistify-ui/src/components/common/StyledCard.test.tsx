import { render, screen } from "@testing-library/react";
import StyledCard from "./StyledCard";

/**
 * Test suite for the StyledCard component
 */
describe("StyledCard", () => {
  it("renders children correctly", () => {
    render(
      <StyledCard>
        <div>Test Child</div>
      </StyledCard>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("applies default styles correctly", () => {
    render(
      <StyledCard>
        <div>Test Child</div>
      </StyledCard>
    );
    const cardElement = screen.getByText("Test Child").closest(".MuiCard-root");
    const styles = getComputedStyle(cardElement!);
    expect(styles.maxWidth).toBe("400px");
    expect(styles.padding).toBe("32px");
  });

  it("applies custom styles correctly", () => {
    render(
      <StyledCard sx={{ bgcolor: "primary.main" }}>
        <div>Test Child</div>
      </StyledCard>
    );
    const cardElement = screen.getByText("Test Child").closest(".MuiCard-root");
    const styles = getComputedStyle(cardElement!);
    expect(styles.backgroundColor).toBe("rgb(25, 118, 210)");
  });
});
