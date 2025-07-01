import { styled } from "@mui/material/styles";

export const FilterStatusIndicator = styled("div")(
  ({ theme, status }: { theme: any; status: string }) => ({
    display: "inline-block",
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      status === "all"
        ? "#2196f3"
        : status === "done"
        ? "#4caf50"
        : status === "in progress"
        ? "#ff9800"
        : "#f44336",
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: 500,
  })
);
