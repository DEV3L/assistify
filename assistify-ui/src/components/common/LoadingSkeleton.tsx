import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

/**
 * LoadingSkeleton component to display a visually appealing loading indicator.
 *
 * @returns {JSX.Element} The loading skeleton component.
 */
export const LoadingSkeleton = (): JSX.Element => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 1,
        borderRadius: 2,
        marginY: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box width="100%">
          <Typography variant="body1">
            <Skeleton variant="text" width="100%" />
          </Typography>
          <Typography variant="body1">
            <Skeleton variant="text" width="100%" />
          </Typography>
          <Typography variant="body1">
            <Skeleton variant="text" width="100%" />
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
