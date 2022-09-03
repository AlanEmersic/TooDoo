import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Stack, Typography } from "@mui/material";

export default function PageNotFound() {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ color: "red", margin: "1rem 0", justifyContent: "center" }}
    >
      <ErrorOutlineRoundedIcon />
      <Typography variant="h5" component="div">
        Error 404 Page not found!
      </Typography>
    </Stack>
  );
}
