import { render } from "@testing-library/react";
import { LoadingSkeleton } from "./LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it("should render without crashing", () => {
    const { container } = render(<LoadingSkeleton />);
    expect(container).toBeInTheDocument();
  });

  it("should render three skeleton text elements", () => {
    const { container } = render(<LoadingSkeleton />);
    const skeletons = container.querySelectorAll("p");
    expect(skeletons).toHaveLength(3);
  });
});
