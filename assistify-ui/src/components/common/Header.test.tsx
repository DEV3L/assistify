import { MenuProvider } from "@/contexts/menuContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "./Header";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  const renderWithSessionProvider = (
    ui: React.ReactElement,
    session: { user: { name: string } } | null = { user: { name: "Test User" } }
  ) => {
    return render(
      <SessionProvider session={session as any}>
        <MenuProvider>{ui}</MenuProvider>
      </SessionProvider>
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

  it("renders the user", () => {
    renderWithSessionProvider(<Header />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByAltText("User Icon")).toBeInTheDocument();
  });

  it("navigates to the root index page when the logo is clicked", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    renderWithSessionProvider(<Header />);
    const logo = screen.getByAltText("Assistify Logo");
    fireEvent.click(logo);

    expect(push).toHaveBeenCalledWith("/");
  });
});
