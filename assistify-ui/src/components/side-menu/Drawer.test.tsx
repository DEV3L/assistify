import { MenuProvider } from "@/contexts/menuContext";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Drawer from "./Drawer";

describe("Drawer", () => {
  const renderWithSessionProvider = (
    ui: React.ReactElement,
    session: { user: { name: string } } | null = { user: { name: "Test User" } }
  ) => {
    return render(
      <MenuProvider>
        <SessionProvider session={session as any}>{ui}</SessionProvider>
      </MenuProvider>
    );
  };

  it("renders the assistants link correctly", () => {
    renderWithSessionProvider(
      <Drawer
        drawerOpen={false}
        handleDisplayToggle={() => {}}
        drawerWidth={240}
        drawerExpanded={true}
        currentPath="/assistants"
      />
    );
    expect(screen.getAllByText("Assistants").length).toBeGreaterThan(0);
  });
});
