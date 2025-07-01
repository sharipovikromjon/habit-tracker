import { useState } from "react";
import HabitList from "../components/HabitList";
import FilterDialog from "../components/FilterDialog";
import AddIcon from "@mui/icons-material/Add";
import AddHabitDialog from "../components/AddHabitDialog";
import { useHabitStore } from "../store/habitStore";
import { FilterStatusIndicator } from "../style/filterIndicator";
import {
  Button,
  Container,
  Typography,
  Fab,
  Menu,
  MenuItem,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

// Box
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: (theme.vars ?? theme).palette.text.secondary,
  boxShadow:
    "0px -3px 5px -1px rgba(0,0,0,0.05), 0px -2px 2px 0px rgba(0,0,0,0.07), 0px -1px 1px 0px rgba(0,0,0,0.06), 0px 3px 5px -1px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.07), 0px 1px 1px 0px rgba(0,0,0,0.06)",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Home = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [fabAnchorEl, setFabAnchorEl] = useState<null | HTMLElement>(null);
  const isFabMenuOpen = Boolean(fabAnchorEl);
  const { filter, habits } = useHabitStore(); // Import filter and habits from habitStore

  const openFabMenu = (e: React.MouseEvent<HTMLElement>) =>
    setFabAnchorEl(e.currentTarget);
  const closeFabMenu = () => {
    setFabAnchorEl(null);
  };

  const statisticsData = {
    labels: ["Done", "In Progress", "Not Started"],
    datasets: [
      {
        data: [
          habits.filter((habit) => habit.status === "done").length,
          habits.filter((habit) => habit.status === "in progress").length,
          habits.filter((habit) => habit.status === "not started").length,
        ],
        backgroundColor: ["#a5d6a7", "#ffe0b2", "#e0e0e0"], // Light green, orange, and gray
        hoverBackgroundColor: ["#81c784", "#ffcc80", "#bdbdbd"], // Slightly darker shades for hover
      },
    ],
  };

  const statisticsOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce(
              (acc: number, value: number) => acc + value,
              0
            );
            const value = dataset.data[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Container sx={{ p: "10px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={5}>
            {/* Statistics */}
            <Item>
              <Typography variant="h5" gutterBottom>
                Statistics
              </Typography>
              <Pie data={statisticsData} options={statisticsOptions} />
            </Item>
          </Grid>
          <Grid size={7}>
            {/* Habits List */}
            <Item>
              <Typography variant="h4" gutterBottom>
                Habit Tracker List
              </Typography>

              <Button onClick={() => setIsFilterOpen(true)} variant="outlined">
                Filter
              </Button>
              <FilterStatusIndicator status={filter}>
                {filter === "all" && "All"}
                {filter === "done" && "Done"}
                {filter === "in progress" && "In Progress"}
                {filter === "not started" && "Not Started"}
              </FilterStatusIndicator>
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
              <Menu
                anchorEl={fabAnchorEl}
                open={!!fabAnchorEl}
                onClose={closeFabMenu}
              >
                <MenuItem
                  onClick={() => {
                    setIsAddHabitOpen(true);
                    closeFabMenu();
                  }}
                >
                  Add Habit
                </MenuItem>
                <MenuItem onClick={closeFabMenu}>
                  Add Goal (Coming Soon)
                </MenuItem>
              </Menu>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
