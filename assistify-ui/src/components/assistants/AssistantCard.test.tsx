import { Assistant } from "@/types/AssistifyTypes";
import { fireEvent, render, screen } from "@testing-library/react";
import { AssistantCard } from "./AssistantCard";

const status = "Public";
const model = "GPT-4";
const provider = "OpenAI";

const mockAssistant: Assistant = {
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
  it("renders assistant name and image", () => {
    render(<AssistantCard assistant={mockAssistant} />);

    expect(screen.getByText("Test Assistant")).toBeInTheDocument();
    const avatarImage = screen.getByAltText(
      "Test Assistant"
    ) as HTMLImageElement;
    expect(avatarImage.src).toContain("test-image.jpg");
  });

  it("opens details dialog on info icon click", () => {
    render(<AssistantCard assistant={mockAssistant} />);

    const infoButton = screen.getByRole("button", {
      name: /detailed description/i,
    });
    fireEvent.click(infoButton);

    expect(
      screen.getByText("Detailed description of the test assistant.")
    ).toBeInTheDocument();
  });

  it("opens image modal on avatar click", () => {
    render(<AssistantCard assistant={mockAssistant} />);

    const avatar = screen.getByAltText("Test Assistant");
    fireEvent.click(avatar);

    expect(
      screen.getByRole("img", { name: /test assistant/i })
    ).toBeInTheDocument();
  });

  it("displays assistant status, model, and provider", () => {
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
});
