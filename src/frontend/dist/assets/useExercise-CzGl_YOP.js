import { k as useActor, l as useQuery, m as useQueryClient, n as useMutation, o as createActor } from "./index-CSO-tJT7.js";
function useExercises(muscleGroup, fitnessLevel) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["exercises", muscleGroup, fitnessLevel],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExercises(muscleGroup ?? null, fitnessLevel ?? null);
    },
    enabled: !!actor && !isFetching
  });
}
function useRoutines(fitnessLevel) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["routines", fitnessLevel],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRoutines(fitnessLevel ?? null);
    },
    enabled: !!actor && !isFetching
  });
}
function useWorkoutLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["workoutLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyWorkoutLogs();
    },
    enabled: !!actor && !isFetching
  });
}
function useLogWorkout() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not available");
      return actor.logWorkout(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workoutLogs"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStats"] });
      queryClient.invalidateQueries({ queryKey: ["progressHistory"] });
    }
  });
}
export {
  useExercises as a,
  useRoutines as b,
  useLogWorkout as c,
  useWorkoutLogs as u
};
