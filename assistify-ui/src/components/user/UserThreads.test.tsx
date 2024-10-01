import { UserAssistant, UserMessage, UserThread } from "@/types/AssistifyTypes";
import { render, screen } from "@testing-library/react";
import { UserThreads } from "./UserThreads";

const mockThreads: UserThread[] = [
  {
    id: "1",
    created: "2024-01-01",
    assistant_name: "Assistant1",
    model: "model1",
    provider_thread_id: "provider_thread_id1",
    provider: "OpenAI",
    summary: "summary1",
    token_count: 100,
    messages: [
      { role: "user", message: "Hello" } as UserMessage,
      { role: "assistant", message: "Hi there!" } as UserMessage,
    ],
  },
  {
    id: "2",
    created: "2024-01-01",
    assistant_name: "Assistant2",
    model: "model2",
    provider_thread_id: "provider_thread_id2",
    provider: "OpenAI",
    summary: "summary2",
    token_count: 200,
    messages: [
      { role: "user", message: "How are you?" } as UserMessage,
      { role: "assistant", message: "I'm good, thanks!" } as UserMessage,
    ],
  },
];

const mockAssistants: UserAssistant[] = [
  {
    id: "1",
    created: "2024-01-01",
    name: "Assistant1",
    image: "assistant1.png",
    status: "Public",
    model: "model1",
    provider: "OpenAI",
    summary_full: "summary_full1",
    summary_short: "summary_short1",
    token_count: 100,
  },
  {
    id: "2",
    created: "2024-01-01",
    name: "Assistant2",
    image: "assistant2.png",
    status: "Public",
    model: "model2",
    provider: "OpenAI",
    summary_full: "summary_full2",
    summary_short: "summary_short2",
    token_count: 200,
  },
];

describe("UserThreads Component", () => {
  it("renders interaction history title", () => {
    render(<UserThreads threads={mockThreads} assistants={mockAssistants} />);
    expect(screen.getByText("Interaction History")).toBeInTheDocument();
  });

  it("renders threads with correct assistant names and token counts", () => {
    render(<UserThreads threads={mockThreads} assistants={mockAssistants} />);
    expect(screen.getByText("Assistant1 (1)")).toBeInTheDocument();
    expect(screen.getByText("Assistant2 (2)")).toBeInTheDocument();
    expect(screen.getByText("- Tokens Consumed: 100")).toBeInTheDocument();
    expect(screen.getByText("- Tokens Consumed: 200")).toBeInTheDocument();
  });

  it("renders messages within threads", () => {
    render(<UserThreads threads={mockThreads} assistants={mockAssistants} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
    expect(screen.getByText("How are you?")).toBeInTheDocument();
    expect(
      screen.getByText("I'm good, thanks!")
    ).toBeInTheDocument();
  });

  it("does not render a thread if the assistant is not found", () => {
    const threadsWithUnknownAssistant: UserThread[] = [
      ...mockThreads,
      {
        id: "3",
        created: "2024-01-01",
        assistant_name: "UnknownAssistant",
        model: "model3",
        provider_thread_id: "provider_thread_id3",
        provider: "OpenAI",
        summary: "summary3",
        token_count: 300,
        messages: [
          {
            role: "user",
            message: "Is anyone there?",
            created: "2024-01-01",
            status: "Pending",
            token_count: 0,
          } as UserMessage,
        ],
      },
    ];
    render(
      <UserThreads
        threads={threadsWithUnknownAssistant}
        assistants={mockAssistants}
      />
    );
    expect(screen.queryByText("UnknownAssistant (3)")).not.toBeInTheDocument();
  });
});
