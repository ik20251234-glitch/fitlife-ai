import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Apple,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ChevronRight,
  Dumbbell,
  Flame,
  Heart,
  Minus,
  Scale,
  Target,
  TrendingUp,
  Utensils,
  Zap,
} from "lucide-react";
import { useFoodLogs, useTodayCalories } from "../hooks/useDiet";
import { useWorkoutLogs } from "../hooks/useExercise";
import { useHealthLogs, useHealthSummary } from "../hooks/useHealth";
import { useProfile } from "../hooks/useProfile";
import { BMICategory, Goal } from "../types";

function getBMICategoryStyle(cat: BMICategory) {
  switch (cat) {
    case BMICategory.Normal:
      return {
        badge: "bg-primary/15 text-primary border-primary/30",
        bar: "bg-primary",
        label: "Normal",
      };
    case BMICategory.Underweight:
      return {
        badge: "bg-secondary/15 text-secondary border-secondary/30",
        bar: "bg-secondary",
        label: "Underweight",
      };
    case BMICategory.Overweight:
      return {
        badge: "bg-accent/15 text-accent border-accent/30",
        bar: "bg-accent",
        label: "Overweight",
      };
    case BMICategory.Obese:
      return {
        badge: "bg-destructive/15 text-destructive border-destructive/30",
        bar: "bg-destructive",
        label: "Obese",
      };
  }
}

function getGoalLabel(goal: Goal) {
  switch (goal) {
    case Goal.LoseWeight:
      return "Lose Weight";
    case Goal.GainWeight:
      return "Gain Weight";
    case Goal.Maintain:
      return "Maintain Weight";
  }
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: summary, isLoading: summaryLoading } = useHealthSummary();
  const { data: healthLogs } = useHealthLogs();
  const { data: foodLogs, isLoading: foodLogsLoading } = useFoodLogs();
  const { data: workoutLogs, isLoading: workoutLogsLoading } = useWorkoutLogs();
  const { data: todayCalories } = useTodayCalories();

  const isLoading = profileLoading || summaryLoading;

  // Compute BMI trend: compare latest vs second-latest log
  const sortedLogs = healthLogs
    ? [...healthLogs].sort((a, b) => Number(b.timestamp - a.timestamp))
    : [];
  const latestLog = sortedLogs[0];
  const prevLog = sortedLogs[1];
  const bmiTrend =
    latestLog && prevLog
      ? latestLog.bmi > prevLog.bmi
        ? "up"
        : latestLog.bmi < prevLog.bmi
          ? "down"
          : "neutral"
      : "neutral";

  const todayCals = todayCalories ? Number(todayCalories) : 0;
  const caloricTarget = summary ? Math.round(summary.dailyCaloricNeeds) : 0;
  const caloriePercent =
    caloricTarget > 0
      ? Math.min(100, Math.round((todayCals / caloricTarget) * 100))
      : 0;

  const recentFood = foodLogs
    ? [...foodLogs]
        .sort((a, b) => Number(b.timestamp - a.timestamp))
        .slice(0, 3)
    : [];
  const recentWorkouts = workoutLogs
    ? [...workoutLogs].sort((a, b) => Number(b.date - a.date)).slice(0, 2)
    : [];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(["bmi", "bmr", "target", "intake"] as const).map((k) => (
            <Skeleton key={k} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  // No profile: onboarding prompt
  if (!profile) {
    return (
      <div
        className="p-6 flex items-center justify-center min-h-[60vh]"
        data-ocid="dashboard.page"
      >
        <Card
          className="max-w-md w-full border border-primary/20 bg-card shadow-lg"
          data-ocid="dashboard.onboarding_card"
        >
          <CardContent className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Welcome to FitLife AI
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Set up your health profile to unlock personalized BMI analysis,
                caloric targets, diet plans, and workout recommendations.
              </p>
            </div>
            <Link
              to="/health"
              search={{ onboarding: undefined }}
              className="block"
            >
              <Button
                className="w-full"
                size="lg"
                data-ocid="dashboard.setup_profile_button"
              >
                <Zap className="w-4 h-4 mr-2" />
                Set Up My Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const bmiCatStyle = summary ? getBMICategoryStyle(summary.bmiCategory) : null;

  return (
    <div className="p-4 md:p-6 space-y-6" data-ocid="dashboard.page">
      {/* Welcome row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Good day, <span className="text-primary">{profile.name}</span> 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's your health snapshot for today
          </p>
        </div>
        <div className="flex items-center gap-2">
          {summary && (
            <Badge
              variant="outline"
              className={`font-semibold text-xs px-3 py-1 ${bmiCatStyle?.badge}`}
              data-ocid="dashboard.goal_badge"
            >
              {getGoalLabel(profile.goal)}
            </Badge>
          )}
        </div>
      </div>

      {/* Hero stat cards */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.stats_section"
      >
        {/* BMI Card */}
        <Card
          className="col-span-2 lg:col-span-1 card-elevated border border-border/60"
          data-ocid="dashboard.bmi_card"
        >
          <CardContent className="p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              {summary && (
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold border ${bmiCatStyle?.badge}`}
                  data-ocid="dashboard.bmi_category_badge"
                >
                  {bmiCatStyle?.label}
                </Badge>
              )}
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Body Mass Index
              </p>
              {summary ? (
                <p className="text-3xl font-display font-bold text-foreground mt-1">
                  {summary.latestBMI.toFixed(1)}
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    kg/m²
                  </span>
                </p>
              ) : (
                <p className="text-muted-foreground text-sm mt-2">
                  Not calculated yet
                </p>
              )}
            </div>
            {/* BMI trend arrow */}
            <div className="flex items-center gap-1 text-xs">
              {bmiTrend === "up" ? (
                <span className="flex items-center text-destructive gap-0.5">
                  <ArrowUp className="w-3 h-3" /> Rising
                </span>
              ) : bmiTrend === "down" ? (
                <span className="flex items-center text-primary gap-0.5">
                  <ArrowDown className="w-3 h-3" /> Dropping
                </span>
              ) : (
                <span className="flex items-center text-muted-foreground gap-0.5">
                  <Minus className="w-3 h-3" /> Stable
                </span>
              )}
              <span className="text-muted-foreground">vs last entry</span>
            </div>
          </CardContent>
        </Card>

        {/* BMR Card */}
        <Card
          className="card-elevated border border-border/60"
          data-ocid="dashboard.bmr_card"
        >
          <CardContent className="p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Basal Metabolic Rate
              </p>
              {summary ? (
                <p className="text-3xl font-display font-bold text-foreground mt-1">
                  {Math.round(summary.latestBMR).toLocaleString()}
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    kcal
                  </span>
                </p>
              ) : (
                <p className="text-muted-foreground text-sm mt-2">No data</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Calories at rest</p>
          </CardContent>
        </Card>

        {/* Caloric Target Card */}
        <Card
          className="card-elevated border border-border/60"
          data-ocid="dashboard.caloric_target_card"
        >
          <CardContent className="p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Daily Caloric Target
              </p>
              {summary ? (
                <p className="text-3xl font-display font-bold text-foreground mt-1">
                  {Math.round(summary.dailyCaloricNeeds).toLocaleString()}
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    kcal
                  </span>
                </p>
              ) : (
                <p className="text-muted-foreground text-sm mt-2">No data</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Personalized goal</p>
          </CardContent>
        </Card>

        {/* Today's Intake Progress Card */}
        <Card
          className="card-elevated border border-border/60"
          data-ocid="dashboard.intake_card"
        >
          <CardContent className="p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Apple className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Today's Intake
              </p>
              <p className="text-3xl font-display font-bold text-foreground mt-1">
                {todayCals.toLocaleString()}
                {caloricTarget > 0 && (
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    / {caloricTarget.toLocaleString()}
                  </span>
                )}
              </p>
            </div>
            <div className="space-y-1">
              <Progress
                value={caloriePercent}
                className="h-2"
                data-ocid="dashboard.calorie_progress"
              />
              <p className="text-xs text-muted-foreground">
                {caloriePercent}% of daily goal
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity + Recent logs row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Food Logs */}
        <Card
          className="card-elevated border border-border/60"
          data-ocid="dashboard.food_logs_card"
        >
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-display font-semibold text-foreground flex items-center gap-2">
              <Utensils className="w-4 h-4 text-primary" />
              Recent Meals
            </CardTitle>
            <Link to="/diet">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
                data-ocid="dashboard.view_diet_link"
              >
                View all <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {foodLogsLoading ? (
              <div
                className="space-y-2"
                data-ocid="dashboard.food_logs.loading_state"
              >
                {(["a", "b", "c"] as const).map((k) => (
                  <Skeleton key={k} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : recentFood.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="dashboard.food_logs.empty_state"
              >
                <Apple className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No meals logged today</p>
                <Link to="/diet" className="block mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    data-ocid="dashboard.log_meal_button"
                  >
                    Log a meal
                  </Button>
                </Link>
              </div>
            ) : (
              recentFood.map((entry, i) => (
                <div
                  key={String(entry.id)}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  data-ocid={`dashboard.food_logs.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Utensils className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {entry.mealName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(entry.timestamp)}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs shrink-0 ml-2 border-primary/30 text-primary"
                  >
                    {Number(entry.calories)} kcal
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Workout Logs */}
        <Card
          className="card-elevated border border-border/60"
          data-ocid="dashboard.workout_logs_card"
        >
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-display font-semibold text-foreground flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-accent" />
              Recent Workouts
            </CardTitle>
            <Link to="/exercise">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
                data-ocid="dashboard.view_exercises_link"
              >
                Browse <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {workoutLogsLoading ? (
              <div
                className="space-y-2"
                data-ocid="dashboard.workout_logs.loading_state"
              >
                {(["a", "b"] as const).map((k) => (
                  <Skeleton key={k} className="h-12 rounded-lg" />
                ))}
              </div>
            ) : recentWorkouts.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="dashboard.workout_logs.empty_state"
              >
                <Dumbbell className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No workouts logged yet</p>
                <Link to="/exercise" className="block mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    data-ocid="dashboard.browse_exercises_button"
                  >
                    Browse exercises
                  </Button>
                </Link>
              </div>
            ) : (
              recentWorkouts.map((log, i) => (
                <div
                  key={String(log.id)}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  data-ocid={`dashboard.workout_logs.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Dumbbell className="w-4 h-4 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {log.routineName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(log.date)}
                      </p>
                    </div>
                  </div>
                  {log.completed ? (
                    <Badge
                      className="text-xs shrink-0 ml-2 bg-primary/15 text-primary border-primary/30"
                      variant="outline"
                    >
                      Done
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-xs shrink-0 ml-2 text-muted-foreground"
                    >
                      Partial
                    </Badge>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* CTA row */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        data-ocid="dashboard.cta_section"
      >
        <Link to="/health" search={{ onboarding: undefined }} className="block">
          <Button
            className="w-full h-12 gap-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-smooth"
            variant="outline"
            data-ocid="dashboard.log_metrics_button"
          >
            <Activity className="w-4 h-4" />
            Log Today's Metrics
            <ArrowRight className="w-3 h-3 ml-auto" />
          </Button>
        </Link>
        <Link to="/diet" className="block">
          <Button
            className="w-full h-12 gap-2 bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary hover:text-secondary-foreground transition-smooth"
            variant="outline"
            data-ocid="dashboard.view_diet_button"
          >
            <Utensils className="w-4 h-4" />
            View Diet Plan
            <ArrowRight className="w-3 h-3 ml-auto" />
          </Button>
        </Link>
        <Link to="/exercise" className="block">
          <Button
            className="w-full h-12 gap-2 bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-accent-foreground transition-smooth"
            variant="outline"
            data-ocid="dashboard.browse_exercises_cta_button"
          >
            <TrendingUp className="w-4 h-4" />
            Browse Exercises
            <ArrowRight className="w-3 h-3 ml-auto" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
