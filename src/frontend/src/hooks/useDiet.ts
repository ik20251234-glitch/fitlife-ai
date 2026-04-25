import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AddFoodLogRequest,
  DietPlan,
  FoodLogEntry,
  Meal,
  MealCategory,
} from "../types";

export function useMeals(
  isVegetarian?: boolean | null,
  category?: MealCategory | null,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Meal[]>({
    queryKey: ["meals", isVegetarian, category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMeals(isVegetarian ?? null, category ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDietPlan() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DietPlan | null>({
    queryKey: ["dietPlan"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyDietPlan();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFoodLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FoodLogEntry[]>({
    queryKey: ["foodLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyFoodLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTodayCalories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: ["todayCalories"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTodayCalories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFoodLog() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (req: AddFoodLogRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addFoodLog(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodLogs"] });
      queryClient.invalidateQueries({ queryKey: ["todayCalories"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStats"] });
    },
  });
}
