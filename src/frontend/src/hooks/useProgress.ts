import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ProgressRecord, WeeklyStats } from "../types";

export function useProgressHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProgressRecord[]>({
    queryKey: ["progressHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProgressHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecentProgress(limitDays: bigint = BigInt(7)) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProgressRecord[]>({
    queryKey: ["recentProgress", limitDays.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentProgress(limitDays);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWeeklyStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WeeklyStats | null>({
    queryKey: ["weeklyStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWeeklyStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordDailyProgress() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      bmi,
      weightKg,
      dailyCalories,
      workoutsCompleted,
    }: {
      bmi: number;
      weightKg: number;
      dailyCalories: bigint;
      workoutsCompleted: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.recordDailyProgress(
        bmi,
        weightKg,
        dailyCalories,
        workoutsCompleted,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressHistory"] });
      queryClient.invalidateQueries({ queryKey: ["recentProgress"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStats"] });
    },
  });
}
