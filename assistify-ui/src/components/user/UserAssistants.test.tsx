import { AssistantResponse } from "@/types/AssistifyTypes";
import { render, screen } from "@testing-library/react";
import { UserAssistants } from "./UserAssistants";

describe("UserAssistants", () => {
  const assistants: AssistantResponse[] = [
    {
      assistant_id: "1",
      created: "2024-09-21T19:12:29.323537Z",
      image: "test-image.jpg",
      model: "GPT-4",
      name: "Test Assistant",
      provider: "OpenAI",
      status: "Public",
      summary_full: "Detailed description of the test assistant.",
      summary_short: "This is a test assistant.",
      thread_ids: ["thread1", "thread2"],
      token_count: 1234,
    },
  ];

  it("renders the list of assistants correctly", () => {
    render(<UserAssistants assistants={assistants} />);
    expect(screen.getByText("Test Assistant")).toBeInTheDocument();
    expect(screen.getByAltText("Test Assistant")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
  });

  it("renders the title correctly", () => {
    render(<UserAssistants assistants={assistants} />);
    expect(screen.getByText("Subscribed Assistants")).toBeInTheDocument();
  });
});
