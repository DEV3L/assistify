import { UserResponse } from "@/types/AssistifyTypes";
import { render, screen } from "@testing-library/react";
import { UserInfoCard } from "./UserInfoCard";

describe("UserInfoCard", () => {
  const user: UserResponse = {
    id: "user_id",
    created: "2024-01-01",
    name: "Test User",
    email: "test@example.com",
    image: "user-image-url",
    assistants: [],
    threads: [],
    token_count: 0,
  };

  it("renders the user information correctly", () => {
    render(<UserInfoCard user={user} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("Test User")).toHaveAttribute(
      "src",
      "user-image-url"
    );
  });

  it("renders the user initial when no image is provided", () => {
    const userWithoutImage = { ...user, image: "" };
    render(<UserInfoCard user={userWithoutImage} />);
    expect(screen.getByText("T")).toBeInTheDocument();
  });
});
