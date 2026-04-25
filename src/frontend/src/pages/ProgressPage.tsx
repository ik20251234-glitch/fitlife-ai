import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  Minus,
  Plus,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { useHealthSummary } from "../hooks/useHealth";
import { useProfile } from "../hooks/useProfile";
import {
  useProgressHistory,
  useRecordDailyProgress,
  useWeeklyStats,
} from "../hooks/useProgress";
import type { ProgressRecord } from "../types";

// ── Helpers ────────────────────────────────────────────────────────────────────

function getBMILabel(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function bmiZoneColor(bmi: number): string {
  if (bmi < 18.5) return "hsl(var(--chart-2))";
  if (bmi < 25) return "hsl(var(--chart-1))";
  if (bmi < 30) return "hsl(var(--chart-3))";
  return "hsl(var(--destructive))";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function groupByWeek(
  records: ProgressRecord[],
): { week: string; totalWorkouts: number }[] {
  if (records.length === 0) return [];
  const sorted = [...records].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const weeks = new Map<string, ProgressRecord[]>();
  for (const r of sorted) {
    const d = new Date(r.date);
    const ws = new Date(d);
    ws.setDate(d.getDate() - d.getDay());
    const key = ws.toISOString().slice(0, 10);
    if (!weeks.has(key)) weeks.set(key, []);
    weeks.get(key)!.push(r);
  }
  const entries = Array.from(weeks.entries()).slice(-8);
  return entries.map(([, recs], i) => ({
    week: `Wk ${i + 1}`,
    totalWorkouts: recs.reduce((s, r) => s + Number(r.workoutsCompleted), 0),
  }));
}

function getDailyCalories(
  records: ProgressRecord[],
  target: number,
): { day: string; calories: number; target: number; over: boolean }[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const rec = records.find((r) => r.date === dateStr);
    const calories = rec ? Number(rec.dailyCalories) : 0;
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      calories,
      target,
      over: calories > target,
    };
  });
}

// ── Custom tooltip ─────────────────────────────────────────────────────────────

interface TooltipPayload {
  name?: string;
  value?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm shadow-lg">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-foreground font-semibold">
          {p.name}: {typeof p.value === "number" ? p.value.toFixed(1) : p.value}
        </p>
      ))}
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  ocid: string;
}

function StatCard({
  label,
  value,
  sub,
  icon,
  trend,
  trendLabel,
  ocid,
}: StatCardProps) {
  const trendColor =
    trend === "up"
      ? "text-primary"
      : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";
  const TrendIcon =
    trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  return (
    <Card className="card-elevated" data-ocid={ocid}>
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1 truncate">
              {label}
            </p>
            <p className="text-3xl font-display font-bold text-foreground">
              {value}
            </p>
            {sub && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {sub}
              </p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0 ml-2">
            {icon}
          </div>
        </div>
        {trendLabel && (
          <div
            className={`flex items-center gap-1 mt-3 text-xs font-medium ${trendColor}`}
          >
            <TrendIcon className="w-3 h-3" />
            {trendLabel}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Log Today Modal ────────────────────────────────────────────────────────────

interface LogModalProps {
  open: boolean;
  onClose: () => void;
  currentBmi: number;
  currentWeight: number;
}

function LogTodayModal({
  open,
  onClose,
  currentBmi,
  currentWeight,
}: LogModalProps) {
  const [weight, setWeight] = useState(
    currentWeight > 0 ? currentWeight.toFixed(1) : "",
  );
  const [calories, setCalories] = useState("");
  const [workouts, setWorkouts] = useState("1");
  const mutation = useRecordDailyProgress();

  function estimateBmi(wt: number): number {
    if (currentWeight <= 0 || currentBmi <= 0) return currentBmi;
    return currentBmi * (wt / currentWeight);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const wt = Number.parseFloat(weight);
    const cal = Number.parseInt(calories, 10);
    const wrk = Number.parseInt(workouts, 10);
    if (!wt || wt <= 0 || !cal || cal <= 0 || Number.isNaN(wrk) || wrk < 0) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    try {
      await mutation.mutateAsync({
        bmi: estimateBmi(wt),
        weightKg: wt,
        dailyCalories: BigInt(cal),
        workoutsCompleted: BigInt(Math.max(0, wrk)),
      });
      toast.success("Progress logged successfully!");
      setCalories("");
      setWorkouts("1");
      onClose();
    } catch {
      toast.error("Failed to log progress. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-ocid="log_today.dialog">
        <DialogHeader>
          <DialogTitle className="text-foreground font-display">
            Log Today's Progress
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="log-weight" className="text-foreground text-sm">
              Weight (kg)
            </Label>
            <Input
              id="log-weight"
              type="number"
              step="0.1"
              min="20"
              max="300"
              placeholder="e.g. 72.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-input border-border"
              data-ocid="log_today.weight.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="log-calories" className="text-foreground text-sm">
              Daily Calories Eaten (kcal)
            </Label>
            <Input
              id="log-calories"
              type="number"
              min="0"
              max="10000"
              placeholder="e.g. 1800"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="bg-input border-border"
              data-ocid="log_today.calories.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="log-workouts" className="text-foreground text-sm">
              Workouts Completed
            </Label>
            <Input
              id="log-workouts"
              type="number"
              min="0"
              max="10"
              value={workouts}
              onChange={(e) => setWorkouts(e.target.value)}
              className="bg-input border-border"
              data-ocid="log_today.workouts.input"
            />
          </div>
          <DialogFooter className="pt-2 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="log_today.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              data-ocid="log_today.submit_button"
            >
              {mutation.isPending ? "Saving…" : "Save Progress"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function ProgressPage() {
  const [logOpen, setLogOpen] = useState(false);

  const { data: history = [], isLoading: histLoading } = useProgressHistory();
  const { data: weeklyStats, isLoading: statsLoading } = useWeeklyStats();
  const { data: profile } = useProfile();
  const { data: healthSummary } = useHealthSummary();

  const isLoading = histLoading || statsLoading;

  const calorieTarget =
    healthSummary?.dailyCaloricNeeds ??
    weeklyStats?.averageDailyCalories ??
    2000;
  const weekData = groupByWeek(history);
  const dailyData = getDailyCalories(history, calorieTarget);

  // BMI trend (last 8 data points)
  const bmiTrend = [...history]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-8)
    .map((r, i, arr) => ({
      label:
        i === 0 || i === arr.length - 1 ? formatDate(r.date) : `Wk ${i + 1}`,
      bmi: Number.parseFloat(r.bmi.toFixed(1)),
    }));

  const avgBmi = weeklyStats?.averageBMI ?? 0;
  const totalWorkouts = weeklyStats ? Number(weeklyStats.totalWorkouts) : 0;
  const avgCalories = weeklyStats?.averageDailyCalories ?? 0;
  const streak = weeklyStats ? Number(weeklyStats.streak) : 0;

  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const startWeight = sortedHistory[0]?.weightKg ?? profile?.weightKg ?? 0;
  const currentWeight =
    sortedHistory[sortedHistory.length - 1]?.weightKg ?? profile?.weightKg ?? 0;
  const weightChange = currentWeight - startWeight;

  const bmiTrendDir: "up" | "down" | "neutral" =
    bmiTrend.length >= 2
      ? bmiTrend[bmiTrend.length - 1].bmi - bmiTrend[0].bmi > 0.1
        ? "up"
        : bmiTrend[bmiTrend.length - 1].bmi - bmiTrend[0].bmi < -0.1
          ? "down"
          : "neutral"
      : "neutral";

  const goal = profile?.goal ?? "Maintain";
  const calDiff = avgCalories - calorieTarget;
  const goalMessage =
    goal === "LoseWeight"
      ? calDiff < 0
        ? `On track for weight loss: ${Math.abs(Math.round(calDiff))} kcal deficit avg`
        : `Slightly over target by ${Math.round(calDiff)} kcal/day avg`
      : goal === "GainWeight"
        ? calDiff > 0
          ? `On track for weight gain: ${Math.round(calDiff)} kcal surplus avg`
          : `Below caloric surplus target by ${Math.abs(Math.round(calDiff))} kcal/day`
        : `Maintaining: ${Math.abs(Math.round(calDiff))} kcal ${calDiff >= 0 ? "over" : "under"} target avg`;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6" data-ocid="progress.loading_state">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["bmi-sk", "calorie-sk", "workout-sk", "streak-sk"].map((k) => (
            <Skeleton key={k} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto" data-ocid="progress.page">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-foreground">
            Progress Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your fitness journey — weekly analytics &amp; trends
          </p>
        </motion.div>
        <Button
          onClick={() => setLogOpen(true)}
          className="gap-2 flex-shrink-0"
          data-ocid="log_today.open_modal_button"
        >
          <Plus className="w-4 h-4" />
          Log Today
        </Button>
      </div>

      {/* Stat Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="progress.stats.section"
      >
        <StatCard
          label="Avg BMI This Week"
          value={avgBmi > 0 ? avgBmi.toFixed(1) : "—"}
          sub={avgBmi > 0 ? getBMILabel(avgBmi) : undefined}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={bmiTrendDir}
          trendLabel={
            bmiTrendDir === "up"
              ? "Rising"
              : bmiTrendDir === "down"
                ? "Declining"
                : "Stable"
          }
          ocid="progress.stats.bmi.card"
        />
        <StatCard
          label="Workouts This Week"
          value={totalWorkouts}
          sub="sessions completed"
          icon={<Dumbbell className="w-5 h-5" />}
          trend={
            totalWorkouts >= 3 ? "up" : totalWorkouts >= 1 ? "neutral" : "down"
          }
          trendLabel={
            totalWorkouts >= 3
              ? "Great consistency!"
              : totalWorkouts >= 1
                ? "Keep it up"
                : "No workouts logged"
          }
          ocid="progress.stats.workouts.card"
        />
        <StatCard
          label="Avg Daily Calories"
          value={
            avgCalories > 0 ? Math.round(avgCalories).toLocaleString() : "—"
          }
          sub={`Target: ${Math.round(calorieTarget).toLocaleString()} kcal`}
          icon={<Flame className="w-5 h-5" />}
          trend={
            avgCalories === 0
              ? "neutral"
              : Math.abs(avgCalories - calorieTarget) < 100
                ? "neutral"
                : avgCalories > calorieTarget
                  ? "up"
                  : "down"
          }
          trendLabel={
            avgCalories > 0
              ? `${Math.abs(Math.round(avgCalories - calorieTarget))} kcal ${avgCalories > calorieTarget ? "over" : "under"} target`
              : undefined
          }
          ocid="progress.stats.calories.card"
        />
        <StatCard
          label="Active Streak"
          value={streak}
          sub={`consecutive day${streak !== 1 ? "s" : ""}`}
          icon={<Calendar className="w-5 h-5" />}
          trend={streak >= 7 ? "up" : "neutral"}
          trendLabel={
            streak >= 7
              ? "🔥 Amazing streak!"
              : streak >= 3
                ? "Building momentum"
                : "Start your streak"
          }
          ocid="progress.stats.streak.card"
        />
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BMI Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card-elevated" data-ocid="progress.bmi_trend.card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display font-semibold text-foreground">
                BMI Trend
              </CardTitle>
              <CardDescription className="text-xs">
                Last 8 readings with zone reference lines
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bmiTrend.length === 0 ? (
                <div
                  className="h-56 flex flex-col items-center justify-center gap-2 text-muted-foreground"
                  data-ocid="progress.bmi_trend.empty_state"
                >
                  <TrendingUp className="w-10 h-10 opacity-30" />
                  <p className="text-sm">
                    No BMI data yet — log your first entry!
                  </p>
                </div>
              ) : (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={bmiTrend}
                      margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="label"
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        domain={["auto", "auto"]}
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        tickLine={false}
                        axisLine={false}
                        width={32}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine
                        y={18.5}
                        stroke="hsl(var(--chart-2))"
                        strokeDasharray="4 3"
                        label={{
                          value: "Underweight",
                          position: "insideTopRight",
                          fontSize: 10,
                          fill: "hsl(var(--chart-2))",
                        }}
                      />
                      <ReferenceLine
                        y={25}
                        stroke="hsl(var(--chart-3))"
                        strokeDasharray="4 3"
                        label={{
                          value: "Normal",
                          position: "insideTopRight",
                          fontSize: 10,
                          fill: "hsl(var(--chart-3))",
                        }}
                      />
                      <ReferenceLine
                        y={30}
                        stroke="hsl(var(--destructive))"
                        strokeDasharray="4 3"
                        label={{
                          value: "Overweight",
                          position: "insideTopRight",
                          fontSize: 10,
                          fill: "hsl(var(--destructive))",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="bmi"
                        name="BMI"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2.5}
                        dot={{
                          fill: "hsl(var(--chart-1))",
                          r: 4,
                          strokeWidth: 0,
                        }}
                        activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Caloric Intake */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card
            className="card-elevated"
            data-ocid="progress.calories_chart.card"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display font-semibold text-foreground">
                Caloric Intake
              </CardTitle>
              <CardDescription className="text-xs">
                Daily calories vs target — last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={dailyData}
                    margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{
                        fontSize: 11,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{
                        fontSize: 11,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={calorieTarget}
                      stroke="hsl(var(--chart-3))"
                      strokeDasharray="5 4"
                      strokeWidth={1.5}
                      label={{
                        value: `${Math.round(calorieTarget)} kcal target`,
                        position: "insideTopRight",
                        fontSize: 10,
                        fill: "hsl(var(--chart-3))",
                      }}
                    />
                    <Bar
                      dataKey="calories"
                      name="Calories"
                      radius={[4, 4, 0, 0]}
                    >
                      {dailyData.map((entry) => (
                        <Cell
                          key={`cell-${entry.day}`}
                          fill={
                            entry.over
                              ? "hsl(var(--chart-3))"
                              : "hsl(var(--chart-1))"
                          }
                          opacity={entry.calories === 0 ? 0.25 : 0.85}
                        />
                      ))}
                    </Bar>
                    <Legend
                      content={() => (
                        <div className="flex gap-4 justify-center mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-sm inline-block"
                              style={{ background: "hsl(var(--chart-1))" }}
                            />
                            At/Under Target
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-sm inline-block"
                              style={{ background: "hsl(var(--chart-3))" }}
                            />
                            Over Target
                          </span>
                        </div>
                      )}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Consistency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            className="card-elevated"
            data-ocid="progress.workout_consistency.card"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display font-semibold text-foreground">
                Workout Consistency
              </CardTitle>
              <CardDescription className="text-xs">
                Workouts per week — last 8 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {weekData.length === 0 ? (
                <div
                  className="h-56 flex flex-col items-center justify-center gap-2 text-muted-foreground"
                  data-ocid="progress.workout_consistency.empty_state"
                >
                  <Dumbbell className="w-10 h-10 opacity-30" />
                  <p className="text-sm">
                    Log workouts to see consistency trends
                  </p>
                </div>
              ) : weekData.length < 3 ? (
                <div className="space-y-2 py-1">
                  {sortedHistory
                    .slice(-6)
                    .reverse()
                    .map((r, i) => (
                      <div
                        key={r.id.toString()}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/40 border border-border"
                        data-ocid={`progress.workout_log.item.${i + 1}`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {formatDate(r.date)}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {Number(r.dailyCalories).toLocaleString()} kcal ·
                              BMI {r.bmi.toFixed(1)}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            Number(r.workoutsCompleted) >= 1
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs flex-shrink-0"
                        >
                          {Number(r.workoutsCompleted)} workout
                          {Number(r.workoutsCompleted) !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weekData}
                      margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="week"
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        tickLine={false}
                        axisLine={false}
                        width={28}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="totalWorkouts"
                        name="Workouts"
                        fill="hsl(var(--chart-5))"
                        radius={[4, 4, 0, 0]}
                        opacity={0.85}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card
            className="card-elevated h-full"
            data-ocid="progress.summary.card"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display font-semibold text-foreground">
                Progress Summary
              </CardTitle>
              <CardDescription className="text-xs">
                Goal alignment &amp; body composition trends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              {/* Goal status */}
              <div className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Goal:{" "}
                    {goal === "LoseWeight"
                      ? "Weight Loss"
                      : goal === "GainWeight"
                        ? "Weight Gain"
                        : "Maintenance"}
                  </span>
                </div>
                <p className="text-sm text-foreground font-medium">
                  {goalMessage}
                </p>
              </div>

              {/* Weight change */}
              <div className="flex items-center justify-between rounded-lg bg-muted/40 border border-border px-4 py-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                    Weight Change
                  </p>
                  <p className="text-xl font-display font-bold text-foreground mt-0.5">
                    {currentWeight > 0 ? `${currentWeight.toFixed(1)} kg` : "—"}
                  </p>
                  {startWeight > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Starting: {startWeight.toFixed(1)} kg
                    </p>
                  )}
                </div>
                {startWeight > 0 && currentWeight > 0 && (
                  <div
                    className={`flex flex-col items-center gap-0.5 ${
                      weightChange < 0
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    style={
                      weightChange > 0
                        ? { color: "hsl(var(--chart-3))" }
                        : undefined
                    }
                  >
                    {weightChange < 0 ? (
                      <TrendingDown className="w-6 h-6" />
                    ) : weightChange > 0 ? (
                      <TrendingUp className="w-6 h-6" />
                    ) : (
                      <Minus className="w-6 h-6" />
                    )}
                    <span className="text-sm font-bold">
                      {weightChange > 0 ? "+" : ""}
                      {weightChange.toFixed(1)} kg
                    </span>
                  </div>
                )}
              </div>

              {/* BMI change */}
              {bmiTrend.length >= 2 && (
                <div className="flex items-center justify-between rounded-lg bg-muted/40 border border-border px-4 py-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                      Current BMI
                    </p>
                    <p
                      className="text-xl font-display font-bold mt-0.5"
                      style={{
                        color: bmiZoneColor(bmiTrend[bmiTrend.length - 1].bmi),
                      }}
                    >
                      {bmiTrend[bmiTrend.length - 1].bmi.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getBMILabel(bmiTrend[bmiTrend.length - 1].bmi)} range
                    </p>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-0.5 ${
                      bmiTrendDir === "down"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    style={
                      bmiTrendDir === "up"
                        ? { color: "hsl(var(--chart-3))" }
                        : undefined
                    }
                  >
                    {bmiTrendDir === "down" ? (
                      <TrendingDown className="w-6 h-6" />
                    ) : bmiTrendDir === "up" ? (
                      <TrendingUp className="w-6 h-6" />
                    ) : (
                      <Minus className="w-6 h-6" />
                    )}
                    <span className="text-sm font-bold">
                      {bmiTrendDir === "up" ? "+" : ""}
                      {(
                        bmiTrend[bmiTrend.length - 1].bmi - bmiTrend[0].bmi
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
              )}

              {/* Last logged */}
              {history.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    Last logged:{" "}
                    {formatDate(
                      sortedHistory[sortedHistory.length - 1]?.date ?? "",
                    )}
                  </span>
                </div>
              )}

              {/* Empty state */}
              {history.length === 0 && (
                <div
                  className="flex flex-col items-center gap-3 py-4 text-center"
                  data-ocid="progress.summary.empty_state"
                >
                  <Target className="w-10 h-10 text-muted-foreground opacity-30" />
                  <p className="text-sm text-muted-foreground">
                    No progress recorded yet.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setLogOpen(true)}
                    data-ocid="progress.summary.log_button"
                  >
                    Log First Entry
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Log Today Modal */}
      <LogTodayModal
        open={logOpen}
        onClose={() => setLogOpen(false)}
        currentBmi={healthSummary?.latestBMI ?? avgBmi}
        currentWeight={
          sortedHistory[sortedHistory.length - 1]?.weightKg ??
          profile?.weightKg ??
          0
        }
      />
    </div>
  );
}
