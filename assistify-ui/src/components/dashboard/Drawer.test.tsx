import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Drawer from "./Drawer";

describe("Drawer", () => {
  const renderWithSessionProvider = (
    ui: React.ReactElement,
    session: { user: { name: string } } | null = { user: { name: "Test User" } }
  ) => {
    return render(
      <SessionProvider session={session as any}>{ui}</SessionProvider>
    );
  };

  it("renders the assistants link correctly", () => {
    renderWithSessionProvider(
      <Drawer
        mobileOpen={false}
        handleDrawerToggle={() => {}}
        drawerWidth={240}
        drawerExpanded={true}
      />
    );
    expect(screen.getAllByText("Assistants").length).toBeGreaterThan(0);
  });
});
