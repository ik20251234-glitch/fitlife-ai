import { c as createLucideIcon, b as useProfile, j as jsxRuntimeExports, S as Skeleton, L as Link, B as Button, Z as Zap, D as Dumbbell, T as TrendingUp } from "./index-CSO-tJT7.js";
import { C as Card, a as CardContent, B as Badge, b as CardHeader, c as CardTitle } from "./index--1ePQYi4.js";
import { u as useFoodLogs, a as useTodayCalories, P as Progress } from "./useDiet-1nya6gvE.js";
import { u as useWorkoutLogs } from "./useExercise-CzGl_YOP.js";
import { u as useHealthSummary, a as useHealthLogs, F as Flame, T as Target } from "./useHealth-B1RtfeFF.js";
import { B as BMICategory, G as Goal } from "./backend.d-ULEQ2CBB.js";
import { S as Scale, A as Activity } from "./scale-Bpvlj-Zz.js";
import { A as ArrowUp, a as ArrowDown, M as Minus } from "./minus-DGhZjvSR.js";
import { U as Utensils } from "./utensils-C-C-F5CI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z",
      key: "3s7exb"
    }
  ],
  ["path", { d: "M10 2c1 .5 2 2 2 5", key: "fcco2y" }]
];
const Apple = createLucideIcon("apple", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode);
function getBMICategoryStyle(cat) {
  switch (cat) {
    case BMICategory.Normal:
      return {
        badge: "bg-primary/15 text-primary border-primary/30",
        bar: "bg-primary",
        label: "Normal"
      };
    case BMICategory.Underweight:
      return {
        badge: "bg-secondary/15 text-secondary border-secondary/30",
        bar: "bg-secondary",
        label: "Underweight"
      };
    case BMICategory.Overweight:
      return {
        badge: "bg-accent/15 text-accent border-accent/30",
        bar: "bg-accent",
        label: "Overweight"
      };
    case BMICategory.Obese:
      return {
        badge: "bg-destructive/15 text-destructive border-destructive/30",
        bar: "bg-destructive",
        label: "Obese"
      };
  }
}
function getGoalLabel(goal) {
  switch (goal) {
    case Goal.LoseWeight:
      return "Lose Weight";
    case Goal.GainWeight:
      return "Gain Weight";
    case Goal.Maintain:
      return "Maintain Weight";
  }
}
function formatTimestamp(ts) {
  const ms = Number(ts / BigInt(1e6));
  return new Date(ms).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatDate(ts) {
  const ms = Number(ts / BigInt(1e6));
  return new Date(ms).toLocaleDateString([], {
    month: "short",
    day: "numeric"
  });
}
function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: summary, isLoading: summaryLoading } = useHealthSummary();
  const { data: healthLogs } = useHealthLogs();
  const { data: foodLogs, isLoading: foodLogsLoading } = useFoodLogs();
  const { data: workoutLogs, isLoading: workoutLogsLoading } = useWorkoutLogs();
  const { data: todayCalories } = useTodayCalories();
  const isLoading = profileLoading || summaryLoading;
  const sortedLogs = healthLogs ? [...healthLogs].sort((a, b) => Number(b.timestamp - a.timestamp)) : [];
  const latestLog = sortedLogs[0];
  const prevLog = sortedLogs[1];
  const bmiTrend = latestLog && prevLog ? latestLog.bmi > prevLog.bmi ? "up" : latestLog.bmi < prevLog.bmi ? "down" : "neutral" : "neutral";
  const todayCals = todayCalories ? Number(todayCalories) : 0;
  const caloricTarget = summary ? Math.round(summary.dailyCaloricNeeds) : 0;
  const caloriePercent = caloricTarget > 0 ? Math.min(100, Math.round(todayCals / caloricTarget * 100)) : 0;
  const recentFood = foodLogs ? [...foodLogs].sort((a, b) => Number(b.timestamp - a.timestamp)).slice(0, 3) : [];
  const recentWorkouts = workoutLogs ? [...workoutLogs].sort((a, b) => Number(b.date - a.date)).slice(0, 2) : [];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: ["bmi", "bmr", "target", "intake"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, k)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" })
    ] });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-6 flex items-center justify-center min-h-[60vh]",
        "data-ocid": "dashboard.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "max-w-md w-full border border-primary/20 bg-card shadow-lg",
            "data-ocid": "dashboard.onboarding_card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 text-center space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Welcome to FitLife AI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Set up your health profile to unlock personalized BMI analysis, caloric targets, diet plans, and workout recommendations." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/health",
                  search: { onboarding: void 0 },
                  className: "block",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "w-full",
                      size: "lg",
                      "data-ocid": "dashboard.setup_profile_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 mr-2" }),
                        "Set Up My Profile"
                      ]
                    }
                  )
                }
              )
            ] })
          }
        )
      }
    );
  }
  const bmiCatStyle = summary ? getBMICategoryStyle(summary.bmiCategory) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground", children: [
          "Good day, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: profile.name }),
          " 👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Here's your health snapshot for today" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: summary && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: `font-semibold text-xs px-3 py-1 ${bmiCatStyle == null ? void 0 : bmiCatStyle.badge}`,
          "data-ocid": "dashboard.goal_badge",
          children: getGoalLabel(profile.goal)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "dashboard.stats_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "col-span-2 lg:col-span-1 card-elevated border border-border/60",
              "data-ocid": "dashboard.bmi_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-5 h-5 text-primary" }) }),
                  summary && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-xs font-semibold border ${bmiCatStyle == null ? void 0 : bmiCatStyle.badge}`,
                      "data-ocid": "dashboard.bmi_category_badge",
                      children: bmiCatStyle == null ? void 0 : bmiCatStyle.label
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Body Mass Index" }),
                  summary ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-foreground mt-1", children: [
                    summary.latestBMI.toFixed(1),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-normal ml-1", children: "kg/m²" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Not calculated yet" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs", children: [
                  bmiTrend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-destructive gap-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3 h-3" }),
                    " Rising"
                  ] }) : bmiTrend === "down" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-primary gap-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3 h-3" }),
                    " Dropping"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-muted-foreground gap-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" }),
                    " Stable"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "vs last entry" })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "card-elevated border border-border/60",
              "data-ocid": "dashboard.bmr_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Basal Metabolic Rate" }),
                  summary ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-foreground mt-1", children: [
                    Math.round(summary.latestBMR).toLocaleString(),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-normal ml-1", children: "kcal" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "No data" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Calories at rest" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "card-elevated border border-border/60",
              "data-ocid": "dashboard.caloric_target_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5 text-secondary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Daily Caloric Target" }),
                  summary ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-foreground mt-1", children: [
                    Math.round(summary.dailyCaloricNeeds).toLocaleString(),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-normal ml-1", children: "kcal" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "No data" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Personalized goal" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "card-elevated border border-border/60",
              "data-ocid": "dashboard.intake_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Today's Intake" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-foreground mt-1", children: [
                    todayCals.toLocaleString(),
                    caloricTarget > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-normal ml-1", children: [
                      "/ ",
                      caloricTarget.toLocaleString()
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Progress,
                    {
                      value: caloriePercent,
                      className: "h-2",
                      "data-ocid": "dashboard.calorie_progress"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    caloriePercent,
                    "% of daily goal"
                  ] })
                ] })
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "card-elevated border border-border/60",
          "data-ocid": "dashboard.food_logs_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "w-4 h-4 text-primary" }),
                "Recent Meals"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/diet", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs h-7 px-2 text-muted-foreground hover:text-foreground",
                  "data-ocid": "dashboard.view_diet_link",
                  children: [
                    "View all ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 ml-1" })
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: foodLogsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-2",
                "data-ocid": "dashboard.food_logs.loading_state",
                children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, k))
              }
            ) : recentFood.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 text-muted-foreground",
                "data-ocid": "dashboard.food_logs.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No meals logged today" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/diet", className: "block mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "text-xs",
                      "data-ocid": "dashboard.log_meal_button",
                      children: "Log a meal"
                    }
                  ) })
                ]
              }
            ) : recentFood.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors",
                "data-ocid": `dashboard.food_logs.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: entry.mealName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatTimestamp(entry.timestamp) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs shrink-0 ml-2 border-primary/30 text-primary",
                      children: [
                        Number(entry.calories),
                        " kcal"
                      ]
                    }
                  )
                ]
              },
              String(entry.id)
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "card-elevated border border-border/60",
          "data-ocid": "dashboard.workout_logs_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-4 h-4 text-accent" }),
                "Recent Workouts"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exercise", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs h-7 px-2 text-muted-foreground hover:text-foreground",
                  "data-ocid": "dashboard.view_exercises_link",
                  children: [
                    "Browse ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 ml-1" })
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: workoutLogsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-2",
                "data-ocid": "dashboard.workout_logs.loading_state",
                children: ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, k))
              }
            ) : recentWorkouts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 text-muted-foreground",
                "data-ocid": "dashboard.workout_logs.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-8 h-8 mx-auto mb-2 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No workouts logged yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exercise", className: "block mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "text-xs",
                      "data-ocid": "dashboard.browse_exercises_button",
                      children: "Browse exercises"
                    }
                  ) })
                ]
              }
            ) : recentWorkouts.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors",
                "data-ocid": `dashboard.workout_logs.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-4 h-4 text-accent" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: log.routineName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(log.date) })
                    ] })
                  ] }),
                  log.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "text-xs shrink-0 ml-2 bg-primary/15 text-primary border-primary/30",
                      variant: "outline",
                      children: "Done"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs shrink-0 ml-2 text-muted-foreground",
                      children: "Partial"
                    }
                  )
                ]
              },
              String(log.id)
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
        "data-ocid": "dashboard.cta_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/health", search: { onboarding: void 0 }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full h-12 gap-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-smooth",
              variant: "outline",
              "data-ocid": "dashboard.log_metrics_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" }),
                "Log Today's Metrics",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-auto" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/diet", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full h-12 gap-2 bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary hover:text-secondary-foreground transition-smooth",
              variant: "outline",
              "data-ocid": "dashboard.view_diet_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "w-4 h-4" }),
                "View Diet Plan",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-auto" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/exercise", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full h-12 gap-2 bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-accent-foreground transition-smooth",
              variant: "outline",
              "data-ocid": "dashboard.browse_exercises_cta_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
                "Browse Exercises",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-auto" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  DashboardPage as default
};
