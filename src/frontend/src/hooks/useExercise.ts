import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Exercise,
  FitnessLevel,
  LogWorkoutRequest,
  MuscleGroup,
  WorkoutLogEntry,
  WorkoutRoutine,
} from "../types";

export function useExercises(
  muscleGroup?: MuscleGroup | null,
  fitnessLevel?: FitnessLevel | null,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Exercise[]>({
    queryKey: ["exercises", muscleGroup, fitnessLevel],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExercises(muscleGroup ?? null, fitnessLevel ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRoutines(fitnessLevel?: FitnessLevel | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WorkoutRoutine[]>({
    queryKey: ["routines", fitnessLevel],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRoutines(fitnessLevel ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWorkoutLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WorkoutLogEntry[]>({
    queryKey: ["workoutLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyWorkoutLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLogWorkout() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (req: LogWorkoutRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.logWorkout(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workoutLogs"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyStats"] });
      queryClient.invalidateQueries({ queryKey: ["progressHistory"] });
    },
  });
}
