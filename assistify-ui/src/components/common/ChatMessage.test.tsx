import { render, screen } from "@testing-library/react";

import { SessionProvider } from "next-auth/react";
import { Message } from "../Message";
import { ChatMessage } from "./ChatMessage";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const messages: Message[] = [
  { text: "Hello", sender: "user" },
  { text: "Hi there!", sender: "assistant" },
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
          messages={messages}
          isResponseLoading={isResponseLoading}
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
    expect(screen.getByAltText("Assistant Avatar")).toHaveAttribute(
      "src",
      "https://i.postimg.cc/gLZrnC6d/assistify-product-owner.png"
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
