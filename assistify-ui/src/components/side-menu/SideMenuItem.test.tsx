import { MenuProvider } from "@/contexts/menuContext";
import { Home as HomeIcon } from "@mui/icons-material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SideMenuItem } from "./SideMenuItem";

jest.mock("next/link", () => {
  return ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe("SideMenuItem", () => {
  const mockCloseMenu = jest.fn();

  const renderSideMenuItem = (
    drawerExpanded: boolean,
    active: boolean,
    onClick?: () => void
  ) => {
    return render(
      <MenuProvider>
        <SideMenuItem
          href="/home"
          icon={HomeIcon}
          text="Home"
          drawerExpanded={drawerExpanded}
          active={active}
          onClick={onClick}
        />
      </MenuProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("calls closeMenu and onClick when clicked", () => {
    const mockOnClick = jest.fn();
    renderSideMenuItem(true, false, mockOnClick);

    const link = screen.getByLabelText("Home link");
    fireEvent.click(link);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
