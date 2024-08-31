import { MenuProvider } from "@/contexts/menuContext";
import { Home as HomeIcon } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { SideMenuItem } from "./SideMenuItem";

describe("SideMenuItem", () => {
  const mockRouter = {} as any;

  const renderSideMenuItem = (drawerExpanded: boolean, active: boolean) => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <MenuProvider>
          <SideMenuItem
            href="/home"
            icon={HomeIcon}
            text="Home"
            drawerExpanded={drawerExpanded}
            active={active}
          />
        </MenuProvider>
      </RouterContext.Provider>
    );
  };

  it("renders with text when drawer is expanded", () => {
    renderSideMenuItem(true, true);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByTestId("HomeIcon")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
  });

  it("renders with icon when drawer is closed", () => {
    renderSideMenuItem(false, false);

    expect(screen.getByTestId("HomeIcon")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
  });
});
