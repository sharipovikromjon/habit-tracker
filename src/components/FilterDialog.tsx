import { useState } from "react";
import { useHabitStore } from "../store/habitStore";
import { type HabitStatus } from "../store/habitStore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ open, onClose }) => {
  const { filter, setFilter } = useHabitStore();
  const [selected, setSelected] = useState<HabitStatus | "all">(filter);

  const handleApply = () => {
    setFilter(selected);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Habits</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <RadioGroup
            value={selected}
            onChange={(e) => setSelected(e.target.value as HabitStatus | "all")}
          >
            <FormControlLabel value="all" control={<Radio />} label="all" />
            <FormControlLabel value="done" control={<Radio />} label="done" />
            <FormControlLabel
              value="in progress"
              control={<Radio />}
              label="In Progress"
            />
            <FormControlLabel
              value="not started"
              control={<Radio />}
              label="not Started"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
