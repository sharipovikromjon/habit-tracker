import { create } from "zustand";
import { combine } from "zustand/middleware";

export type HabitStatus = "done" | "in progress" | "not started";

export interface Habit {
  id: number;
  name: string;
  description: string;
  status: HabitStatus;
}
export interface Goal {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const HABIT_STORAGE_KEY = "habit-tracker-habits";

function loadHabits(): Habit[] {
  const saved = localStorage.getItem(HABIT_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveHabits(habits: Habit[]) {
  localStorage.setItem(HABIT_STORAGE_KEY, JSON.stringify(habits));
}

export const useHabitStore = create(
  combine(
    // states
    {
      habits: loadHabits() as Habit[],
      filter: "all" as HabitStatus | "all",
      goals: [] as Goal[],
    },
    // actions
    (set) => ({
      // Add habit
      addHabit: (habit: Habit) => {
        set((state) => {
          const updated = [...state.habits, habit];
          saveHabits(updated);
          return { habits: updated };
        });
      },
      // Edit habit
      editHabit: (updatedHabit: Habit) => {
        set((state) => {
          const updated = state.habits.map((habit) =>
            habit.id === updatedHabit.id ? { ...habit, ...updatedHabit } : habit
          );
          saveHabits(updated);
          return { habits: updated };
        });
      },
      // Delete habit
      deleteHabit: (id: number) => {
        set((state) => {
          const updated = state.habits.filter((h) => h.id !== id);
          saveHabits(updated);
          return { habits: updated };
        });
      },
      // Set status
      setStatus: (id: number, status: HabitStatus) => {
        set((state) => {
          const updated = state.habits.map((habit) =>
            habit.id === id ? { ...habit, status } : habit
          );
          saveHabits(updated);
          return { habits: updated };
        });
      },
      setFilter: (filter: HabitStatus | "all") => set({ filter }),
      setGoal: (goal: Goal) =>
        set((state) => ({ goals: [...state.goals, goal] })),
    })
  )
);
