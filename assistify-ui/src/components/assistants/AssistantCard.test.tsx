import { AssistantResponse } from "@/types/AssistifyTypes";
import { fireEvent, render, screen } from "@testing-library/react";
import { AssistantCard } from "./AssistantCard";

const status = "Public";
const model = "GPT-4";
const provider = "OpenAI";

const mockAssistant: AssistantResponse = {
  assistant_id: "1",
  created: "2024-09-21T19:12:29.323537Z",
  image: "test-image.jpg",
  model,
  name: "Test Assistant",
  provider,
  status,
  summary_full: "Detailed description of the test assistant.",
  summary_short: "This is a test assistant.",
  thread_ids: ["thread1", "thread2"],
  token_count: 1234,
};

describe("AssistantCard", () => {
  it("renders assistant name and image correctly", () => {
    render(<AssistantCard assistant={mockAssistant} />);

    expect(screen.getByText("Test Assistant")).toBeInTheDocument();
    const avatarImage = screen.getByAltText(
      "Test Assistant"
    ) as HTMLImageElement;
    expect(avatarImage.src).toContain("test-image.jpg");
  });

  it("opens assistant details dialog when info icon is clicked", () => {
    render(<AssistantCard assistant={mockAssistant} />);

    const infoButton = screen.getByLabelText("Detailed Description");
    fireEvent.click(infoButton);

    expect(screen.getByText(mockAssistant.summary_full)).toBeInTheDocument();
  });

  it("opens assistant image modal when avatar is clicked", () => {
    render(<AssistantCard assistant={mockAssistant} />);

    const avatarImage = screen.getByAltText("Test Assistant");
    fireEvent.click(avatarImage);

    expect(screen.getByTestId("assistant-modal-title")).toBeInTheDocument();
  });

  it("displays status, model, and provider correctly", () => {
    render(<AssistantCard assistant={mockAssistant} />);

    expect(screen.getByText(new RegExp(status, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(model, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(provider, "i"))).toBeInTheDocument();
  });

  it("displays thread count and token consumption", () => {
    render(<AssistantCard assistant={mockAssistant} />);

    expect(
      screen.getByText(/Threads: 2 \| Tokens Consumed: 1234/i)
    ).toBeInTheDocument();
  });

  it("handles missing image gracefully", () => {
    const assistantWithoutImage = { ...mockAssistant, image: "" };
    render(<AssistantCard assistant={assistantWithoutImage} />);

    expect(screen.getByTestId("PersonIcon")).toBeInTheDocument();
  });

  it("handles missing summary gracefully", () => {
    const assistantWithoutSummary = { ...mockAssistant, summary_short: "" };
    render(<AssistantCard assistant={assistantWithoutSummary} />);

    expect(screen.getByText("No summary available")).toBeInTheDocument();
  });

  it("handles missing assistant name gracefully", () => {
    const assistantWithoutName = { ...mockAssistant, name: "" };
    render(<AssistantCard assistant={assistantWithoutName} />);

    expect(screen.getByText("Unnamed Assistant")).toBeInTheDocument();
  });

  it("handles missing thread IDs and token count gracefully", () => {
    const assistantWithoutThreads = {
      ...mockAssistant,
      thread_ids: [],
      token_count: 0,
    };
    render(<AssistantCard assistant={assistantWithoutThreads} />);

    expect(
      screen.getByText(/Threads: 0 \| Tokens Consumed: 0/i)
    ).toBeInTheDocument();
  });

  it("displays large images correctly", () => {
    const assistantWithLargeImage = {
      ...mockAssistant,
      image: "large-image.jpg",
    };
    render(<AssistantCard assistant={assistantWithLargeImage} />);

    const avatarImage = screen.getByAltText(
      "Test Assistant"
    ) as HTMLImageElement;
    expect(avatarImage.src).toContain("large-image.jpg");
  });
});
