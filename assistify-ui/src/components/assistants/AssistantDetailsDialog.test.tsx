import { Assistant } from "@/types/AssistifyTypes";
import { render, screen } from "@testing-library/react";
import { AssistantDetailsDialog } from "./AssistantDetailsDialog";

describe("AssistantDetailsDialog", () => {
  const assistant: Assistant = {
    assistant_id: "assistant_id",
    created: "2024-09-21T19:12:29.323537Z",
    image: "image.png",
    model: "model",
    name: "Assistant Name",
    provider: "OpenAI",
    status: "Public",
    summary_full: "Detailed description of the assistant.",
    summary_short: "Short description of the assistant.",
    thread_ids: ["thread_id"],
    token_count: 1000,
  };

  it("renders the dialog when open is true", () => {
    render(
      <AssistantDetailsDialog
        open={true}
        onClose={jest.fn()}
        assistant={assistant}
      />
    );
    expect(screen.getByText("Assistant Name")).toBeInTheDocument();
    expect(
      screen.getByText("Detailed description of the assistant.")
    ).toBeInTheDocument();
  });

  it("does not render the dialog when open is false", () => {
    render(
      <AssistantDetailsDialog
        open={false}
        onClose={jest.fn()}
        assistant={assistant}
      />
    );
    expect(screen.queryByText("Assistant Name")).not.toBeInTheDocument();
  });
});
