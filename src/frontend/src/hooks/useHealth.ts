import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { HealthMetricLog, HealthSummary } from "../types";

export function useHealthLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HealthMetricLog[]>({
    queryKey: ["healthLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHealthLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHealthSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HealthSummary | null>({
    queryKey: ["healthSummary"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHealthSummary();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLogHealthMetrics() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.logHealthMetrics();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["healthLogs"] });
      queryClient.invalidateQueries({ queryKey: ["healthSummary"] });
      queryClient.invalidateQueries({ queryKey: ["progressHistory"] });
    },
  });
}
