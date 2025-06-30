import React, { useState } from "react";
import { useHabitStore } from "../store/habitStore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

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
        <ListItem key={habit.id}>
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
