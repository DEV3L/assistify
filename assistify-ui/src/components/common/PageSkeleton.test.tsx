import { render, screen } from "@testing-library/react";
import PageSkeleton from "./PageSkeleton";

/**
 * Unit tests for PageSkeleton component.
 */
describe("PageSkeleton", () => {
  it("should render without crashing", () => {
    const { container } = render(<PageSkeleton />);
    expect(container).toBeInTheDocument();
  });

  it("should render a Paper component", () => {
    render(<PageSkeleton />);
    const paper = screen.getByTestId("paper-component");
    expect(paper).toBeInTheDocument();
  });

  it("should render a Skeleton component inside Paper", () => {
    render(<PageSkeleton />);
    const skeleton = screen.getByTestId("skeleton-component");
    expect(skeleton).toBeInTheDocument();
  });
});
