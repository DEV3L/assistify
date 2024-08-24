import { Feedback } from "@mui/icons-material";
import { render } from "@testing-library/react";
import FeatureItem from "./FeatureItem";

describe("FeatureItem", () => {
  it("renders the icon, title, and text correctly", () => {
    const { getByText, getByTestId } = render(
      <FeatureItem icon={Feedback} title="Test Title" text="Test Text" />
    );

    // Check if the icon is rendered
    expect(getByTestId("FeedbackIcon")).toBeInTheDocument();

    // Check if the title and text are rendered correctly
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText(":")).toBeInTheDocument();
    expect(getByText("Test Text")).toBeInTheDocument();
  });
});
