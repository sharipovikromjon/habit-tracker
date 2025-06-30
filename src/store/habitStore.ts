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

export const useHabitStore = create(
  combine(
    // states
    {
      habits: [] as Habit[],
      filter: "all" as HabitStatus | "all",
      goals: [] as Goal[],
    },
    // actions
    (set) => ({
      addHabit: (habit: Habit) =>
        set((state) => ({ habits: [...state.habits, habit] })),
      setStatus: (id: number, status: HabitStatus) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, status } : habit
          ),
        })),
      setFilter: (filter: HabitStatus | "all") => set({ filter }),
      setGoal: (goal: Goal) =>
        set((state) => ({ goals: [...state.goals, goal] })),
      editHabit: (updatedHabit: Habit) =>
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === updatedHabit.id ? { ...h, ...updatedHabit } : h
          ),
        })),
      deleteHabit: (id: number) =>
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        })),
    })
  )
);
