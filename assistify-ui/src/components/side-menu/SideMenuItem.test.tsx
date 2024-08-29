import { Home as HomeIcon } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import SideMenuItem from "./SideMenuItem";

describe("SideMenuItem", () => {
  const mockRouter = {} as any;

  it("renders with text when drawer is expanded", () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SideMenuItem
          href="/home"
          icon={HomeIcon}
          text="Home"
          drawerExpanded={true}
          active={true}
        />
      </RouterContext.Provider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByTestId("HomeIcon")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
  });

  it("renders with icon when drawer is closed", () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SideMenuItem
          href="/home"
          icon={HomeIcon}
          text="Home"
          drawerExpanded={false}
          active={false}
        />
      </RouterContext.Provider>
    );

    expect(screen.getByTestId("HomeIcon")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
  });
});
