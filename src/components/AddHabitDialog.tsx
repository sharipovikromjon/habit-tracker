import { useState } from "react";
import { useHabitStore } from "../store/habitStore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface HabitDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddHabitDialog: React.FC<HabitDialogProps> = ({ open, onClose }) => {
  const { addHabit } = useHabitStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (name.trim()) {
      addHabit({ id: Date.now(), name, description, status: "not started" });
      onClose();
      setName("");
      setDescription("");
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Habit</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHabitDialog;
