import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  CreateProfileRequest,
  UpdateProfileRequest,
  UserProfilePublic,
} from "../types";

export function useProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfilePublic | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHasProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["hasProfile"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (req: CreateProfileRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createMyProfile(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["hasProfile"] });
      queryClient.invalidateQueries({ queryKey: ["healthSummary"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (req: UpdateProfileRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateMyProfile(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["healthSummary"] });
    },
  });
}
