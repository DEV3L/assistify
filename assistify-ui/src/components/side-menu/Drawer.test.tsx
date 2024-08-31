import { MenuProvider } from "@/contexts/menuContext";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { NextRouter } from "next/router";
import { Drawer } from "./Drawer";

const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    push: jest.fn().mockResolvedValue(true),
    reload: jest.fn(),
    replace: jest.fn().mockResolvedValue(true),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    ...router,
  } as NextRouter;
};

describe("Drawer", () => {
  const renderWithProviders = (
    ui: React.ReactElement,
    session: { user: { name: string } } | null = { user: { name: "Test User" } }
  ) => {
    const mockRouter = createMockRouter({ pathname: "/assistants" });

    return render(
      <RouterContext.Provider value={mockRouter}>
        <MenuProvider>
          <SessionProvider session={session as any}>{ui}</SessionProvider>
        </MenuProvider>
      </RouterContext.Provider>
    );
  };

  it("renders the assistants link correctly", () => {
    renderWithProviders(
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
