import { c as createLucideIcon, k as useActor, l as useQuery, m as useQueryClient, n as useMutation, o as createActor } from "./index-CSO-tJT7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
function useHealthLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["healthLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHealthLogs();
    },
    enabled: !!actor && !isFetching
  });
}
function useHealthSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["healthSummary"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHealthSummary();
    },
    enabled: !!actor && !isFetching
  });
}
function useLogHealthMetrics() {
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
    }
  });
}
export {
  Flame as F,
  Target as T,
  useHealthLogs as a,
  useLogHealthMetrics as b,
  useHealthSummary as u
};
