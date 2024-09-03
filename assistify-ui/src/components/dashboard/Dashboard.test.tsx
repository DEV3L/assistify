import { useMobile } from "@/hooks/useMobile";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { DashBoard } from "./Dashboard";

jest.mock("../../hooks/useMobile");

const userSession = {
  user: { name: "Test User" },
};

describe("DashBoard", () => {
  const renderWithSessionProvider = (
    session: { user: { name: string; image?: string } } | null = userSession
  ) => {
    return render(
      <SessionProvider session={session as any}>
        <DashBoard />
      </SessionProvider>
    );
  };

  it("renders WelcomeMessage and Message components", () => {
    (useMobile as jest.Mock).mockReturnValue(false);

    renderWithSessionProvider();

    expect(screen.getByText(/Welcome to Assistify/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat with Assistify/i)).toBeInTheDocument();
  });

  it("applies correct styles for mobile view", () => {
    (useMobile as jest.Mock).mockReturnValue(true);

    renderWithSessionProvider();
  });
});
