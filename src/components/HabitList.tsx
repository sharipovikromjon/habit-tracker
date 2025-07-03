import React, { useState } from "react";
import { useHabitStore } from "../store/habitStore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

const StatusIndicator = styled("div")(
  ({ theme, status }: { theme: any; status: string }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      status === "done"
        ? "#a5d6a7" // Light green for "Done"
        : status === "in progress"
        ? "#ffe0b2" // Light orange for "In Progress"
        : "#e0e0e0", // Light gray for "Not Started"
    color: status === "not started" ? "#616161" : "#000", // Dark gray for "Not Started," black for others
    fontSize: "0.75rem",
    fontWeight: 500,
  })
);

const HabitList: React.FC = () => {
  const { habits, filter, setStatus } = useHabitStore();
  const filteredHabits =
    filter === "all" ? habits : habits.filter((h) => h.status === filter);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);

  const open = Boolean(anchorEl);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    habitId: number
  ) => {
    setAnchorEl(event?.currentTarget as HTMLElement);
    setSelectedHabitId(habitId);
  };

  const handleClose = () => {
    setAnchorEl(null), setSelectedHabitId(null);
  };

  const handleStatusChange = (
    status: "done" | "in progress" | "not started"
  ) => {
    if (selectedHabitId !== null) {
      setStatus(selectedHabitId, status);
    }
    handleClose();
  };

  return (
    <List>
      {filteredHabits.map((habit) => (
        <ListItem
          key={habit.id}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          <Checkbox
            checked={habit.status === "done"}
            onChange={() =>
              setStatus(
                habit.id,
                habit.status === "done" ? "in progress" : "done"
              )
            }
          />
          <ListItemText primary={habit.name} secondary={habit.description} />
          <StatusIndicator status={habit.status}>
            {habit.status === "done" && "Done"}
            {habit.status === "in progress" && "In Progress"}
            {habit.status === "not started" && "Not Started"}
          </StatusIndicator>
          <IconButton onClick={(e) => handleMenuClick(e, habit.id)}>
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleStatusChange("done")}>Done</MenuItem>
        <MenuItem onClick={() => handleStatusChange("in progress")}>
          In Progress
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("not started")}>
          Not Started
        </MenuItem>
      </Menu>
    </List>
  );
};

export default HabitList;
