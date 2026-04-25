import { m as useQueryClient, k as useActor, n as useMutation, l as useQuery, o as createActor } from "./index-CSO-tJT7.js";
function useProgressHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["progressHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProgressHistory();
    },
    enabled: !!actor && !isFetching
  });
}
function useWeeklyStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["weeklyStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWeeklyStats();
    },
    enabled: !!actor && !isFetching
  });
}
function useRecordDailyProgress() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      bmi,
      weightKg,
      dailyCalories,
      workoutsCompleted
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.recordDailyProgress(
        bmi,
        weightKg,
        dailyCalories,
        workoutsCompleted
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressHistory"] });
      queryClient.invalidateQueries({ queryKey: ["recentProgress"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStats"] });
    }
  });
}
export {
  useProgressHistory as a,
  useWeeklyStats as b,
  useRecordDailyProgress as u
};
