import { useState } from "react";
import HabitList from "../components/HabitList";
import FilterDialog from "../components/FilterDialog";
import AddIcon from "@mui/icons-material/Add";
import AddHabitDialog from "../components/AddHabitDialog";
import {
  Button,
  Container,
  Typography,
  Fab,
  Menu,
  MenuItem,
} from "@mui/material";

const Home = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [fabAnchorEl, setFabAnchorEl] = useState<null | HTMLElement>(null);
  const isFabMenuOpen = Boolean(fabAnchorEl);

  const openFabMenu = (e: React.MouseEvent<HTMLElement>) =>
    setFabAnchorEl(e.currentTarget);
  const closeFabMenu = () => {
    setFabAnchorEl(null);
  };

  // inside return JSX:

  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h4" gutterBottom>
        Habit Tracker
      </Typography>

      <Button onClick={() => setIsFilterOpen(true)} variant="outlined">
        Filter
      </Button>
      <HabitList />
      <FilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <AddHabitDialog
        open={isAddHabitOpen}
        onClose={() => setIsAddHabitOpen(false)}
      />
      <Fab
        color="primary"
        onClick={openFabMenu}
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>
      <Menu anchorEl={fabAnchorEl} open={!!fabAnchorEl} onClose={closeFabMenu}>
        <MenuItem
          onClick={() => {
            setIsAddHabitOpen(true);
            closeFabMenu();
          }}
        >
          Add Habit
        </MenuItem>
        <MenuItem onClick={closeFabMenu}>Add Goal (Coming Soon)</MenuItem>
      </Menu>
    </Container>
  );
};

export default Home;
