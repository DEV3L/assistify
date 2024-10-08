import { render, screen } from "@testing-library/react";

import { SessionProvider } from "next-auth/react";
import { Message } from "./Message";

import { usePostMessage } from "@/services/messages";
import { ThreadResponse } from "@/types/AssistifyTypes";
import { fireEvent, waitFor } from "@testing-library/react";

jest.mock("../services/messages");

describe("Message", () => {
  const mockPostMessage = usePostMessage as jest.MockedFunction<
    typeof usePostMessage
  >;
  const userSession = {
    user: { name: "Test User", image: "user-image-url" },
  };
  const assistantResponse = "Hello world from the assistant!";
  const defaultThread = {
    id: "123",
    user_id: "456",
    assistant_id: "789",
    assistant_name: "Test Assistant",
    model: "gpt-3.5",
    provider: "OpenAI",
    provider_thread_id: "123",
    summary: "Test summary",
    is_welcome_thread: true,
    messages: [],
  } as ThreadResponse;

  beforeEach(() => {
    mockPostMessage.mockReturnValue({
      isAuthenticated: true,
      postMessage: jest.fn().mockResolvedValue({ response: assistantResponse }),
    });
  });

  const renderWithSessionProvider = (
    thread: ThreadResponse = defaultThread,
    session: { user: { name: string; image?: string } } | null = userSession
  ) => {
    return render(
      <SessionProvider session={session as any}>
        <Message thread={thread} />
      </SessionProvider>
    );
  };

  it("renders the welcome message on mount", () => {
    renderWithSessionProvider();
    expect(
      screen.getByText(/Briefly introduce yourself!/i)
    ).toBeInTheDocument();
  });

  it("renders the previous messages on mount", () => {
    renderWithSessionProvider({ ...defaultThread, is_welcome_thread: false });
    expect(screen.queryByText(/Briefly introduce yourself!/i)).toBeNull();
  });

  it("renders the welcome message on mount", () => {
    renderWithSessionProvider();
    expect(
      screen.getByText(/Briefly introduce yourself!/i)
    ).toBeInTheDocument();
  });

  it("sends a message and receives a response", async () => {
    renderWithSessionProvider();
    const input = screen.getByLabelText(/Type your message/i);
    const button = screen.getByText(/Send/i);

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Hello")).toBeInTheDocument();
      expect(screen.getAllByText(assistantResponse).length).toBe(2);
    });
  });

  it("handles errors when sending a message", async () => {
    mockPostMessage.mockReturnValueOnce({
      isAuthenticated: true,
      postMessage: jest
        .fn()
        .mockRejectedValue(new Error("Failed to send message")),
    });

    renderWithSessionProvider();
    const input = screen.getByLabelText(/Type your message/i);
    const button = screen.getByText(/Send/i);

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Hello")).toBeInTheDocument();
      expect(screen.queryByText("Assistant response")).not.toBeInTheDocument();
    });
  });
});
