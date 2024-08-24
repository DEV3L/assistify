import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Header from "./Header";

describe("Header", () => {
  const renderWithSessionProvider = (
    ui: React.ReactElement,
    session: { user: { name: string } } | null = { user: { name: "Test User" } }
  ) => {
    return render(
      <SessionProvider session={session as any}>{ui}</SessionProvider>
    );
  };

  it("renders the title correctly", () => {
    renderWithSessionProvider(<Header />);
    expect(screen.getByText("Assistify")).toBeInTheDocument();
  });

  it("does not render the user when not in session", () => {
    renderWithSessionProvider(<Header />, null);
    expect(screen.queryByText("Test Subtitle")).not.toBeInTheDocument();
  });

  it("renders the user when in session", () => {
    renderWithSessionProvider(<Header />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByAltText("User Icon")).toBeInTheDocument();
  });
});
