import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

/**
 * PageSkeleton component to display a visually appealing loading indicator.
 *
 * @returns {JSX.Element} The loading skeleton component.
 */
export const PageSkeleton = (): JSX.Element => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 1,
        borderRadius: 2,
        marginY: 1,
        width: "95vw",
        height: "95vh",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-testid="paper-component"
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ borderRadius: 2 }}
        data-testid="skeleton-component"
      />
    </Paper>
  );
};
