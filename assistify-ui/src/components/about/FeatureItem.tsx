import { SvgIconComponent } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface FeatureItemProps {
  icon: SvgIconComponent;
  title: string;
  text: string;
}

/**
 * FeatureItem component to display a feature with an icon, title, and text.
 *
 * @param {FeatureItemProps} props - The props for the component.
 * @returns {JSX.Element} The FeatureItem component.
 */
const FeatureItem = ({
  icon: Icon,
  title,
  text,
}: FeatureItemProps): JSX.Element => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Icon color="primary" />
      <Typography variant="body2" ml={1}>
        <span
          style={{
            fontFamily: "Dank Mono",
            fontStyle: "italic",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <span style={{ marginLeft: "0px" }}>:</span>
        <span style={{ marginLeft: "4px" }}>{text}</span>
      </Typography>
    </Box>
  );
};

export default FeatureItem;
