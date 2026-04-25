import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Activity,
  BarChart2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Flame,
  HeartPulse,
  Scale,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useHealthLogs, useLogHealthMetrics } from "../hooks/useHealth";
import {
  useCreateProfile,
  useHasProfile,
  useProfile,
  useUpdateProfile,
} from "../hooks/useProfile";
import { useRecordDailyProgress } from "../hooks/useProgress";
import {
  ActivityLevel,
  BMICategory,
  DietaryPreference,
  Gender,
  Goal,
} from "../types";

// ─── BMI / BMR helpers ──────────────────────────────────────────────────────

function calcBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0) return 0;
  const h = heightCm / 100;
  return weightKg / (h * h);
}

function calcBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
): number {
  if (gender === Gender.Male) {
    return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  }
  return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
}

function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return BMICategory.Underweight;
  if (bmi < 25) return BMICategory.Normal;
  if (bmi < 30) return BMICategory.Overweight;
  return BMICategory.Obese;
}

function getCatStyle(cat: BMICategory) {
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

function getCatLabel(cat: BMICategory) {
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

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── Slider ─────────────────────────────────────────────────────────────────

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
  ocid: string;
}

function SliderField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
  ocid,
}: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <span className="text-sm font-semibold text-primary">
          {value} {unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          data-ocid={ocid}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary bg-muted"
          style={{
            background: `linear-gradient(to right, oklch(var(--primary)) ${pct}%, oklch(var(--muted)) ${pct}%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HealthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/layout/health" }) as {
    onboarding?: string;
  };
  const isOnboarding = search.onboarding === "true";

  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: hasProfile } = useHasProfile();
  const { data: healthLogs, isLoading: logsLoading } = useHealthLogs();
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();
  const logHealth = useLogHealthMetrics();
  const recordProgress = useRecordDailyProgress();

  // Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState(25);
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    ActivityLevel.ModeratelyActive,
  );
  const [goal, setGoal] = useState<Goal>(Goal.Maintain);
  const [dietPref, setDietPref] = useState<DietaryPreference>(
    DietaryPreference.Vegetarian,
  );
  const [saved, setSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Seed form when profile loads
  useEffect(() => {
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

  // Live preview
  const liveBMI = useMemo(
    () => calcBMI(weightKg, heightCm),
    [weightKg, heightCm],
  );
  const liveBMR = useMemo(
    () => calcBMR(weightKg, heightCm, age, gender),
    [weightKg, heightCm, age, gender],
  );
  const liveBMICategory = getBMICategory(liveBMI);

  const isSubmitting =
    createProfile.isPending ||
    updateProfile.isPending ||
    logHealth.isPending ||
    recordProgress.isPending;

  async function handleSubmit(e: React.FormEvent) {
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
      dietaryPreference: dietPref,
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
      workoutsCompleted: BigInt(0),
    });

    setSaved(true);
    if (isOnboarding) {
      navigate({ to: "/dashboard" });
    }
  }

  const sortedLogs = healthLogs
    ? [...healthLogs].sort((a, b) => Number(b.timestamp - a.timestamp))
    : [];

  if (profileLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6" data-ocid="health.page">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
          <HeartPulse className="w-7 h-7 text-primary" />
          {isOnboarding ? "Welcome! Set Up Your Profile" : "Health Assessment"}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isOnboarding
            ? "Tell us about yourself to get personalized recommendations"
            : "Update your metrics and track your health over time"}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form */}
        <div className="xl:col-span-2">
          <Card
            className="card-elevated border border-border/60"
            data-ocid="health.form_card"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Physical Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    data-ocid="health.name_input"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age
                  </Label>
                  <input
                    id="age"
                    type="number"
                    min={10}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    required
                    data-ocid="health.age_input"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  />
                </div>

                {/* Sliders */}
                <SliderField
                  label="Height"
                  value={heightCm}
                  min={100}
                  max={250}
                  unit="cm"
                  onChange={setHeightCm}
                  ocid="health.height_slider"
                />
                <SliderField
                  label="Weight"
                  value={weightKg}
                  min={30}
                  max={200}
                  unit="kg"
                  onChange={setWeightKg}
                  ocid="health.weight_slider"
                />

                <Separator />

                {/* Gender */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gender</Label>
                  <div className="flex gap-3">
                    {[Gender.Male, Gender.Female].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        data-ocid={`health.gender_${g.toLowerCase()}_radio`}
                        className={`flex-1 h-10 rounded-lg border text-sm font-medium transition-smooth ${
                          gender === g
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activity Level */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Activity Level</Label>
                  <Select
                    value={activityLevel}
                    onValueChange={(v) => setActivityLevel(v as ActivityLevel)}
                  >
                    <SelectTrigger
                      className="w-full"
                      data-ocid="health.activity_level_select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ActivityLevel.Sedentary}>
                        Sedentary (little or no exercise)
                      </SelectItem>
                      <SelectItem value={ActivityLevel.LightlyActive}>
                        Lightly Active (1–3 days/week)
                      </SelectItem>
                      <SelectItem value={ActivityLevel.ModeratelyActive}>
                        Moderately Active (3–5 days/week)
                      </SelectItem>
                      <SelectItem value={ActivityLevel.VeryActive}>
                        Very Active (6–7 days/week)
                      </SelectItem>
                      <SelectItem value={ActivityLevel.ExtraActive}>
                        Extra Active (athlete / physical job)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goal */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Fitness Goal</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: Goal.LoseWeight, label: "Lose Weight" },
                      { val: Goal.Maintain, label: "Maintain" },
                      { val: Goal.GainWeight, label: "Gain Weight" },
                    ].map(({ val, label }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setGoal(val)}
                        data-ocid={`health.goal_${val.toLowerCase()}_radio`}
                        className={`h-10 rounded-lg border text-sm font-medium transition-smooth ${
                          goal === val
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Preference */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Dietary Preference
                  </Label>
                  <div className="flex gap-3">
                    {[
                      {
                        val: DietaryPreference.Vegetarian,
                        label: "🥦 Vegetarian",
                      },
                      {
                        val: DietaryPreference.NonVegetarian,
                        label: "🍗 Non-Vegetarian",
                      },
                    ].map(({ val, label }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDietPref(val)}
                        data-ocid={`health.diet_${val.toLowerCase()}_radio`}
                        className={`flex-1 h-10 rounded-lg border text-sm font-medium transition-smooth ${
                          dietPref === val
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isSubmitting || !name}
                  data-ocid="health.submit_button"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-spin" />
                      Saving…
                    </span>
                  ) : saved ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Saved!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {hasProfile ? "Update Profile" : "Create Profile"}
                    </span>
                  )}
                </Button>

                {(createProfile.isError ||
                  updateProfile.isError ||
                  logHealth.isError) && (
                  <p
                    className="text-sm text-destructive text-center"
                    data-ocid="health.error_state"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
                {saved && (
                  <p
                    className="text-sm text-primary text-center"
                    data-ocid="health.success_state"
                  >
                    Profile saved and metrics logged successfully!
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview Sidebar */}
        <div className="space-y-4">
          {/* Live BMI/BMR preview */}
          <Card
            className="card-elevated border border-primary/20 bg-primary/5"
            data-ocid="health.live_preview_card"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display font-semibold text-foreground flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* BMI */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Scale className="w-4 h-4" />
                    BMI
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold border ${getCatStyle(liveBMICategory)}`}
                    data-ocid="health.live_bmi_category_badge"
                  >
                    {getCatLabel(liveBMICategory)}
                  </Badge>
                </div>
                <p
                  className="text-4xl font-display font-bold text-foreground"
                  data-ocid="health.live_bmi_value"
                >
                  {liveBMI.toFixed(1)}
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    kg/m²
                  </span>
                </p>
              </div>

              <Separator />

              {/* BMR */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Flame className="w-4 h-4" />
                  BMR (Basal Metabolic Rate)
                </div>
                <p
                  className="text-3xl font-display font-bold text-foreground"
                  data-ocid="health.live_bmr_value"
                >
                  {Math.round(liveBMR).toLocaleString()}
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    kcal/day
                  </span>
                </p>
              </div>

              <Separator />

              {/* BMI Scale visual */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  BMI Scale
                </p>
                <div className="relative h-3 rounded-full overflow-hidden flex">
                  <div className="flex-[3] bg-secondary/60" />
                  <div className="flex-[3] bg-primary/70" />
                  <div className="flex-[2] bg-accent/70" />
                  <div className="flex-[2] bg-destructive/70" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Under</span>
                  <span>Normal</span>
                  <span>Over</span>
                  <span>Obese</span>
                </div>
                {/* Pointer */}
                <div className="relative h-1">
                  <div
                    className="absolute w-2 h-2 rounded-full bg-foreground top-0 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${Math.min(100, Math.max(0, ((Math.min(liveBMI, 40) - 10) / 30) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Caloric needs estimate */}
          <Card
            className="card-elevated border border-border/60"
            data-ocid="health.caloric_card"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  Estimated Daily Calories
                </span>
              </div>
              <p className="text-3xl font-display font-bold text-foreground">
                {Math.round(liveBMR * 1.55).toLocaleString()}
                <span className="text-sm text-muted-foreground font-normal ml-1">
                  kcal
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Based on moderate activity. Adjusts when you save your profile.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Health Metrics History */}
      {sortedLogs.length > 0 && (
        <Card
          className="card-elevated border border-border/60"
          data-ocid="health.history_card"
        >
          <CardHeader
            className="pb-3 cursor-pointer select-none"
            onClick={() => setShowHistory((p) => !p)}
          >
            <CardTitle className="text-base font-display font-semibold text-foreground flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" />
                Health Metrics History
                <Badge variant="outline" className="text-xs ml-1">
                  {sortedLogs.length} entries
                </Badge>
              </span>
              {showHistory ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </CardTitle>
          </CardHeader>

          {showHistory && (
            <CardContent className="pt-0">
              {logsLoading ? (
                <div
                  className="space-y-2"
                  data-ocid="health.history.loading_state"
                >
                  {(["a", "b", "c"] as const).map((k) => (
                    <Skeleton key={k} className="h-10 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="health.history_table"
                  >
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Date
                        </th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Weight
                        </th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          BMI
                        </th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          BMR
                        </th>
                        <th className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Category
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedLogs.map((log, i) => (
                        <tr
                          key={String(log.id)}
                          className="border-b border-border/40 hover:bg-muted/20 transition-colors"
                          data-ocid={`health.history.item.${i + 1}`}
                        >
                          <td className="py-3 px-3 text-foreground font-medium">
                            {formatTimestamp(log.timestamp)}
                          </td>
                          <td className="py-3 px-3 text-right text-foreground tabular-nums">
                            {log.weightKg.toFixed(1)} kg
                          </td>
                          <td className="py-3 px-3 text-right text-foreground tabular-nums font-semibold">
                            {log.bmi.toFixed(1)}
                          </td>
                          <td className="py-3 px-3 text-right text-foreground tabular-nums">
                            {Math.round(log.bmr).toLocaleString()}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <Badge
                              variant="outline"
                              className={`text-xs font-medium border ${getCatStyle(log.bmiCategory)}`}
                            >
                              {getCatLabel(log.bmiCategory)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}
