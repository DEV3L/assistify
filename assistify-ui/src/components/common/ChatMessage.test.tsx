import { render, screen } from "@testing-library/react";

import { AssistantResponse, ThreadResponse } from "@/types/AssistifyTypes";
import { SessionProvider } from "next-auth/react";
import { Message } from "../dashboard/Message";
import { ChatMessage } from "./ChatMessage";

const mockAssistant = {
  _id: "123",
  created: "2024-10-08T15:25:49.358057Z",
  assistant_id: "789",
  image: "assistant-image-url",
  model: "gpt-3.5",
  name: "Test Assistant",
  provider: "OpenAI",
  status: "Public",
  summary_full: "Test summary",
  summary_short: "Test summary",
  thread_ids: ["123"],
  token_count: 100,
} as AssistantResponse;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const messages: Message[] = [
  { text: "Hello", sender: "user", thread: {} as ThreadResponse },
  { text: "Hi there!", sender: "assistant", thread: {} as ThreadResponse },
];

const userSession = {
  user: { name: "Test User", image: "user-image-url" },
};

describe("ChatMessage", () => {
  const renderWithSessionProvider = (
    messages: Message[],
    isResponseLoading: boolean,
    session: { user: { name: string; image?: string } } | null = userSession
  ) => {
    return render(
      <SessionProvider session={session as any}>
        <ChatMessage
          assistant={mockAssistant}
          messages={messages}
          isResponseLoading={isResponseLoading}
          handleDetailsOpen={() => {}}
        />
      </SessionProvider>
    );
  };

  it("renders user and assistant messages correctly", () => {
    renderWithSessionProvider(messages, false);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
    expect(screen.getByAltText("User Avatar")).toHaveAttribute(
      "src",
      "user-image-url"
    );
  });

  it("renders user with no image url", () => {
    renderWithSessionProvider(messages, false, {
      user: { name: "Test User" },
    });

    expect(screen.getByTestId("PersonIcon")).toBeInTheDocument();
  });

  it("renders loading skeleton when response is loading", () => {
    renderWithSessionProvider(messages, true);

    expect(screen.getByTestId("chat-loading-skeleton")).toBeInTheDocument();
  });

  it("does not render loading skeleton when response is not loading", () => {
    renderWithSessionProvider(messages, false);

    expect(
      screen.queryByTestId("chat-loading-skeleton")
    ).not.toBeInTheDocument();
  });
});
