import { c as createLucideIcon, a as useNavigate, d as useSearch, b as useProfile, e as useHasProfile, f as useCreateProfile, g as useUpdateProfile, r as reactExports, j as jsxRuntimeExports, S as Skeleton, H as HeartPulse, B as Button } from "./index-CSO-tJT7.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent, B as Badge } from "./index--1ePQYi4.js";
import { L as Label } from "./index-DaGsvhi7.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as ChevronUp, e as ChevronDown } from "./select-BdhisfQt.js";
import { S as Separator } from "./separator-CAmfc7Yt.js";
import { a as useHealthLogs, b as useLogHealthMetrics, F as Flame, T as Target } from "./useHealth-B1RtfeFF.js";
import { u as useRecordDailyProgress } from "./useProgress-Ks_iZDrU.js";
import { a as Gender, A as ActivityLevel, G as Goal, D as DietaryPreference, B as BMICategory } from "./backend.d-ULEQ2CBB.js";
import { A as Activity, S as Scale } from "./scale-Bpvlj-Zz.js";
import { C as CircleCheck } from "./Combination-Bta016gw.js";
import "./index-DWnt1IDt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$2);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function calcBMI(weightKg, heightCm) {
  if (heightCm <= 0) return 0;
  const h = heightCm / 100;
  return weightKg / (h * h);
}
function calcBMR(weightKg, heightCm, age, gender) {
  if (gender === Gender.Male) {
    return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  }
  return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
}
function getBMICategory(bmi) {
  if (bmi < 18.5) return BMICategory.Underweight;
  if (bmi < 25) return BMICategory.Normal;
  if (bmi < 30) return BMICategory.Overweight;
  return BMICategory.Obese;
}
function getCatStyle(cat) {
  switch (cat) {
    case BMICategory.Normal:
      return "bg-primary/15 text-primary border-primary/30";
    case BMICategory.Underweight:
      return "bg-secondary/15 text-secondary border-secondary/30";
    case BMICategory.Overweight:
      return "bg-accent/15 text-accent border-accent/30";
    case BMICategory.Obese:
      return "bg-destructive/15 text-destructive border-destructive/30";
  }
}
function getCatLabel(cat) {
  switch (cat) {
    case BMICategory.Normal:
      return "Normal Weight";
    case BMICategory.Underweight:
      return "Underweight";
    case BMICategory.Overweight:
      return "Overweight";
    case BMICategory.Obese:
      return "Obese";
  }
}
function formatTimestamp(ts) {
  const ms = Number(ts / BigInt(1e6));
  return new Date(ms).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function SliderField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
  ocid
}) {
  const pct = (value - min) / (max - min) * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-primary", children: [
        value,
        " ",
        unit
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min,
        max,
        value,
        onChange: (e) => onChange(Number(e.target.value)),
        "data-ocid": ocid,
        className: "w-full h-2 rounded-full appearance-none cursor-pointer accent-primary bg-muted",
        style: {
          background: `linear-gradient(to right, oklch(var(--primary)) ${pct}%, oklch(var(--muted)) ${pct}%)`
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        min,
        " ",
        unit
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        max,
        " ",
        unit
      ] })
    ] })
  ] });
}
function HealthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/layout/health" });
  const isOnboarding = search.onboarding === "true";
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: hasProfile } = useHasProfile();
  const { data: healthLogs, isLoading: logsLoading } = useHealthLogs();
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();
  const logHealth = useLogHealthMetrics();
  const recordProgress = useRecordDailyProgress();
  const [name, setName] = reactExports.useState("");
  const [age, setAge] = reactExports.useState(25);
  const [heightCm, setHeightCm] = reactExports.useState(170);
  const [weightKg, setWeightKg] = reactExports.useState(70);
  const [gender, setGender] = reactExports.useState(Gender.Male);
  const [activityLevel, setActivityLevel] = reactExports.useState(
    ActivityLevel.ModeratelyActive
  );
  const [goal, setGoal] = reactExports.useState(Goal.Maintain);
  const [dietPref, setDietPref] = reactExports.useState(
    DietaryPreference.Vegetarian
  );
  const [saved, setSaved] = reactExports.useState(false);
  const [showHistory, setShowHistory] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAge(Number(profile.age));
      setHeightCm(profile.heightCm);
      setWeightKg(profile.weightKg);
      setGender(profile.gender);
      setActivityLevel(profile.activityLevel);
      setGoal(profile.goal);
      setDietPref(profile.dietaryPreference);
    }
  }, [profile]);
  const liveBMI = reactExports.useMemo(
    () => calcBMI(weightKg, heightCm),
    [weightKg, heightCm]
  );
  const liveBMR = reactExports.useMemo(
    () => calcBMR(weightKg, heightCm, age, gender),
    [weightKg, heightCm, age, gender]
  );
  const liveBMICategory = getBMICategory(liveBMI);
  const isSubmitting = createProfile.isPending || updateProfile.isPending || logHealth.isPending || recordProgress.isPending;
  async function handleSubmit(e) {
    e.preventDefault();
    setSaved(false);
    const profileData = {
      name,
      age: BigInt(age),
      heightCm,
      weightKg,
      gender,
      activityLevel,
      goal,
      dietaryPreference: dietPref
    };
    if (hasProfile) {
      await updateProfile.mutateAsync(profileData);
    } else {
      await createProfile.mutateAsync(profileData);
    }
    const metric = await logHealth.mutateAsync();
    await recordProgress.mutateAsync({
      bmi: metric.bmi,
      weightKg: metric.weightKg,
      dailyCalories: BigInt(Math.round(metric.bmr * 1.55)),
      workoutsCompleted: BigInt(0)
    });
    setSaved(true);
    if (isOnboarding) {
      navigate({ to: "/dashboard" });
    }
  }
  const sortedLogs = healthLogs ? [...healthLogs].sort((a, b) => Number(b.timestamp - a.timestamp)) : [];
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-xl" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6", "data-ocid": "health.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "w-7 h-7 text-primary" }),
        isOnboarding ? "Welcome! Set Up Your Profile" : "Health Assessment"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: isOnboarding ? "Tell us about yourself to get personalized recommendations" : "Update your metrics and track your health over time" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "card-elevated border border-border/60",
          "data-ocid": "health.form_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg font-display font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-primary" }),
              "Physical Profile"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "name",
                    type: "text",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    required: true,
                    placeholder: "Your name",
                    "data-ocid": "health.name_input",
                    className: "w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "age", className: "text-sm font-medium", children: "Age" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "age",
                    type: "number",
                    min: 10,
                    max: 120,
                    value: age,
                    onChange: (e) => setAge(Number(e.target.value)),
                    required: true,
                    "data-ocid": "health.age_input",
                    className: "w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SliderField,
                {
                  label: "Height",
                  value: heightCm,
                  min: 100,
                  max: 250,
                  unit: "cm",
                  onChange: setHeightCm,
                  ocid: "health.height_slider"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SliderField,
                {
                  label: "Weight",
                  value: weightKg,
                  min: 30,
                  max: 200,
                  unit: "kg",
                  onChange: setWeightKg,
                  ocid: "health.weight_slider"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Gender" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [Gender.Male, Gender.Female].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setGender(g),
                    "data-ocid": `health.gender_${g.toLowerCase()}_radio`,
                    className: `flex-1 h-10 rounded-lg border text-sm font-medium transition-smooth ${gender === g ? "border-primary bg-primary/10 text-primary" : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
                    children: g
                  },
                  g
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Activity Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: activityLevel,
                    onValueChange: (v) => setActivityLevel(v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "w-full",
                          "data-ocid": "health.activity_level_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ActivityLevel.Sedentary, children: "Sedentary (little or no exercise)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ActivityLevel.LightlyActive, children: "Lightly Active (1–3 days/week)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ActivityLevel.ModeratelyActive, children: "Moderately Active (3–5 days/week)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ActivityLevel.VeryActive, children: "Very Active (6–7 days/week)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ActivityLevel.ExtraActive, children: "Extra Active (athlete / physical job)" })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Fitness Goal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
                  { val: Goal.LoseWeight, label: "Lose Weight" },
                  { val: Goal.Maintain, label: "Maintain" },
                  { val: Goal.GainWeight, label: "Gain Weight" }
                ].map(({ val, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setGoal(val),
                    "data-ocid": `health.goal_${val.toLowerCase()}_radio`,
                    className: `h-10 rounded-lg border text-sm font-medium transition-smooth ${goal === val ? "border-primary bg-primary/10 text-primary" : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
                    children: label
                  },
                  val
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Dietary Preference" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [
                  {
                    val: DietaryPreference.Vegetarian,
                    label: "🥦 Vegetarian"
                  },
                  {
                    val: DietaryPreference.NonVegetarian,
                    label: "🍗 Non-Vegetarian"
                  }
                ].map(({ val, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDietPref(val),
                    "data-ocid": `health.diet_${val.toLowerCase()}_radio`,
                    className: `flex-1 h-10 rounded-lg border text-sm font-medium transition-smooth ${dietPref === val ? "border-primary bg-primary/10 text-primary" : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
                    children: label
                  },
                  val
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full h-11",
                  disabled: isSubmitting || !name,
                  "data-ocid": "health.submit_button",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 animate-spin" }),
                    "Saving…"
                  ] }) : saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                    "Saved!"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                    hasProfile ? "Update Profile" : "Create Profile"
                  ] })
                }
              ),
              (createProfile.isError || updateProfile.isError || logHealth.isError) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-destructive text-center",
                  "data-ocid": "health.error_state",
                  children: "Something went wrong. Please try again."
                }
              ),
              saved && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-primary text-center",
                  "data-ocid": "health.success_state",
                  children: "Profile saved and metrics logged successfully!"
                }
              )
            ] }) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "card-elevated border border-primary/20 bg-primary/5",
            "data-ocid": "health.live_preview_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-primary" }),
                "Live Preview"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-4 h-4" }),
                      "BMI"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-xs font-semibold border ${getCatStyle(liveBMICategory)}`,
                        "data-ocid": "health.live_bmi_category_badge",
                        children: getCatLabel(liveBMICategory)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-4xl font-display font-bold text-foreground",
                      "data-ocid": "health.live_bmi_value",
                      children: [
                        liveBMI.toFixed(1),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-normal ml-1", children: "kg/m²" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4" }),
                    "BMR (Basal Metabolic Rate)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-3xl font-display font-bold text-foreground",
                      "data-ocid": "health.live_bmr_value",
                      children: [
                        Math.round(liveBMR).toLocaleString(),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-normal ml-1", children: "kcal/day" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "BMI Scale" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-3 rounded-full overflow-hidden flex", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-[3] bg-secondary/60" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-[3] bg-primary/70" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-[2] bg-accent/70" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-[2] bg-destructive/70" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Under" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Normal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Over" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Obese" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute w-2 h-2 rounded-full bg-foreground top-0 -translate-x-1/2 -translate-y-1/2",
                      style: {
                        left: `${Math.min(100, Math.max(0, (Math.min(liveBMI, 40) - 10) / 30 * 100))}%`
                      }
                    }
                  ) })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "card-elevated border border-border/60",
            "data-ocid": "health.caloric_card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-4 h-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Estimated Daily Calories" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-foreground", children: [
                Math.round(liveBMR * 1.55).toLocaleString(),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-normal ml-1", children: "kcal" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Based on moderate activity. Adjusts when you save your profile." })
            ] })
          }
        )
      ] })
    ] }),
    sortedLogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "card-elevated border border-border/60",
        "data-ocid": "health.history_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardHeader,
            {
              className: "pb-3 cursor-pointer select-none",
              onClick: () => setShowHistory((p) => !p),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display font-semibold text-foreground flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-primary" }),
                  "Health Metrics History",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs ml-1", children: [
                    sortedLogs.length,
                    " entries"
                  ] })
                ] }),
                showHistory ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
              ] })
            }
          ),
          showHistory && /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: logsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-2",
              "data-ocid": "health.history.loading_state",
              children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-lg" }, k))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-sm",
              "data-ocid": "health.history_table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Weight" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "BMI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "BMR" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Category" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sortedLogs.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border/40 hover:bg-muted/20 transition-colors",
                    "data-ocid": `health.history.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-foreground font-medium", children: formatTimestamp(log.timestamp) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-right text-foreground tabular-nums", children: [
                        log.weightKg.toFixed(1),
                        " kg"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-right text-foreground tabular-nums font-semibold", children: log.bmi.toFixed(1) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-right text-foreground tabular-nums", children: Math.round(log.bmr).toLocaleString() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: `text-xs font-medium border ${getCatStyle(log.bmiCategory)}`,
                          children: getCatLabel(log.bmiCategory)
                        }
                      ) })
                    ]
                  },
                  String(log.id)
                )) })
              ]
            }
          ) }) })
        ]
      }
    )
  ] });
}
export {
  HealthPage as default
};
