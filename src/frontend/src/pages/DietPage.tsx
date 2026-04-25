import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddFoodLog,
  useDietPlan,
  useFoodLogs,
  useMeals,
  useTodayCalories,
} from "@/hooks/useDiet";
import { useProfile } from "@/hooks/useProfile";
import { MealCategory } from "@/types";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Macro bar ───────────────────────────────────────────────────────────────
function MacroBar({
  protein,
  carbs,
  fat,
}: { protein: number; carbs: number; fat: number }) {
  const total = protein + carbs + fat || 1;
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted gap-px">
      <div
        style={{
          width: `${(protein / total) * 100}%`,
          background: "hsl(var(--chart-2))",
        }}
        className="rounded-l-full transition-smooth"
        title={`Protein ${protein}g`}
      />
      <div
        style={{
          width: `${(carbs / total) * 100}%`,
          background: "hsl(var(--chart-4))",
        }}
        className="transition-smooth"
        title={`Carbs ${carbs}g`}
      />
      <div
        style={{
          width: `${(fat / total) * 100}%`,
          background: "hsl(var(--destructive))",
        }}
        className="rounded-r-full transition-smooth"
        title={`Fat ${fat}g`}
      />
    </div>
  );
}

// ─── Meal card ────────────────────────────────────────────────────────────────
interface MealCardProps {
  id: bigint;
  name: string;
  calories: bigint;
  proteinG: number;
  carbsG: number;
  fatG: number;
  prepTimeMinutes: bigint;
  isVegetarian: boolean;
  category: MealCategory;
  onAddToLog?: (id: bigint, name: string, calories: bigint) => void;
  index: number;
}
function MealCard({
  id,
  name,
  calories,
  proteinG,
  carbsG,
  fatG,
  prepTimeMinutes,
  isVegetarian,
  category,
  onAddToLog,
  index,
}: MealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      data-ocid={`meal.item.${index + 1}`}
    >
      <Card className="card-elevated h-full flex flex-col">
        <CardHeader className="pb-2 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="font-display text-base leading-tight">
              {name}
            </CardTitle>
            <Badge
              variant="outline"
              className={`shrink-0 text-xs font-medium ${isVegetarian ? "border-primary/40 text-primary bg-primary/10" : "border-accent/40 text-accent bg-accent/10"}`}
            >
              {isVegetarian ? "Veg" : "Non-Veg"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {Number(prepTimeMinutes)} min prep
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold font-display text-foreground">
              {Number(calories)}
            </span>
            <span className="text-muted-foreground text-sm">kcal</span>
          </div>
          <MacroBar protein={proteinG} carbs={carbsG} fat={fatG} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: "hsl(var(--chart-2))" }}
              />
              P {proteinG}g
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: "hsl(var(--chart-4))" }}
              />
              C {carbsG}g
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: "hsl(var(--destructive))" }}
              />
              F {fatG}g
            </span>
          </div>
          {onAddToLog && (
            <Button
              variant="outline"
              size="sm"
              className="mt-auto w-full border-primary/30 text-primary hover:bg-primary/10 transition-smooth"
              onClick={() => onAddToLog(id, name, calories)}
              data-ocid={`meal.add_button.${index + 1}`}
            >
              + Add to Log
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Category badge filter ────────────────────────────────────────────────────
const CATEGORIES: Array<MealCategory | "All"> = [
  "All",
  MealCategory.Breakfast,
  MealCategory.Lunch,
  MealCategory.Dinner,
  MealCategory.Snack,
];

export default function DietPage() {
  const { data: profile } = useProfile();
  const { data: dietPlan, isLoading: planLoading } = useDietPlan();
  const { data: todayCalories, isLoading: calLoading } = useTodayCalories();
  const { data: foodLogs, isLoading: logsLoading } = useFoodLogs();
  const addFoodLog = useAddFoodLog();

  // Veg filter state
  const [planVeg, setPlanVeg] = useState<boolean | null>(null);
  const [libVeg, setLibVeg] = useState<boolean | null>(null);
  const [libCategory, setLibCategory] = useState<MealCategory | null>(null);

  // Library meals
  const { data: libraryMeals, isLoading: libLoading } = useMeals(
    libVeg,
    libCategory,
  );

  // Food log form
  const [logMealName, setLogMealName] = useState("");
  const [logCalories, setLogCalories] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dailyTarget = Number(
    (dietPlan?.dailyCaloricTarget ?? profile?.goal) ? 2200 : 2000,
  );
  const consumed = Number(todayCalories ?? 0);
  const progressPct = Math.min(100, Math.round((consumed / dailyTarget) * 100));
  const remaining = Math.max(0, dailyTarget - consumed);

  // Filter plan meals
  const planMeals = (dietPlan?.meals ?? []).filter((m) =>
    planVeg === null ? true : m.isVegetarian === planVeg,
  );

  // Group plan meals by category
  const grouped = [
    MealCategory.Breakfast,
    MealCategory.Lunch,
    MealCategory.Dinner,
    MealCategory.Snack,
  ].reduce<Record<string, typeof planMeals>>((acc, cat) => {
    acc[cat] = planMeals.filter((m) => m.category === cat);
    return acc;
  }, {});

  async function handleAddToLog(_id: bigint, name: string, calories: bigint) {
    try {
      await addFoodLog.mutateAsync({ mealName: name, calories });
      toast.success(`${name} added to your food log!`, { duration: 4000 });
    } catch {
      toast.error("Failed to add meal to log. Please try again.");
    }
  }

  async function handleManualLog(e: React.FormEvent) {
    e.preventDefault();
    if (!logMealName.trim() || !logCalories) return;
    setIsSubmitting(true);
    try {
      await addFoodLog.mutateAsync({
        mealName: logMealName.trim(),
        calories: BigInt(Math.round(Number(logCalories))),
      });
      toast.success("Entry added to your food log!", { duration: 4000 });
      setLogMealName("");
      setLogCalories("");
    } catch {
      toast.error("Failed to save food log entry.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function formatTimestamp(ts: bigint): string {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const totalLoggedCals = (foodLogs ?? []).reduce(
    (sum, e) => sum + Number(e.calories),
    0,
  );

  return (
    <div className="min-h-full bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-3xl font-bold text-foreground">
              Diet & Nutrition
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your meals, hit your caloric goals, and stay on plan.
            </p>
          </motion.div>

          {/* Daily caloric progress */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4"
            data-ocid="diet.header.section"
          >
            <Card className="bg-primary/10 border-primary/20 col-span-1 sm:col-span-2">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Today's Progress
                    </p>
                    {calLoading ? (
                      <Skeleton className="h-8 w-40 mt-1" />
                    ) : (
                      <p className="text-2xl font-bold font-display text-foreground">
                        <span className="text-primary">
                          {consumed.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground text-lg">
                          {" "}
                          / {dailyTarget.toLocaleString()} kcal
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-xl font-bold font-display text-accent">
                      {remaining.toLocaleString()} kcal
                    </p>
                  </div>
                </div>
                <Progress
                  value={progressPct}
                  className="h-3"
                  data-ocid="diet.calories_progress"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {progressPct}% of daily target
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-4 pb-4 h-full flex flex-col justify-between">
                <p className="text-sm text-muted-foreground">Daily Target</p>
                {planLoading ? (
                  <Skeleton className="h-10 w-28 mt-2" />
                ) : (
                  <p className="text-3xl font-bold font-display text-foreground mt-2">
                    {dailyTarget.toLocaleString()}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">kcal/day</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="plan" data-ocid="diet.tabs">
          <TabsList className="mb-6 bg-muted/40 border border-border">
            <TabsTrigger
              value="plan"
              data-ocid="diet.plan.tab"
              className="font-medium"
            >
              My Diet Plan
            </TabsTrigger>
            <TabsTrigger
              value="library"
              data-ocid="diet.library.tab"
              className="font-medium"
            >
              Meal Library
            </TabsTrigger>
            <TabsTrigger
              value="log"
              data-ocid="diet.log.tab"
              className="font-medium"
            >
              Food Log
            </TabsTrigger>
          </TabsList>

          {/* ── My Diet Plan ───────────────────────────────────────────────── */}
          <TabsContent value="plan">
            {/* Veg toggle */}
            <div
              className="flex items-center gap-2 mb-6"
              data-ocid="diet.plan.filter"
            >
              <span className="text-sm text-muted-foreground mr-1">
                Filter:
              </span>
              {[
                { label: "All", value: null },
                { label: "🥦 Vegetarian", value: true },
                { label: "🍗 Non-Veg", value: false },
              ].map(({ label, value }) => (
                <Button
                  key={label}
                  variant={planVeg === value ? "default" : "outline"}
                  size="sm"
                  className="transition-smooth"
                  onClick={() => setPlanVeg(value)}
                  data-ocid={`diet.plan.filter_${label.toLowerCase().replace(/\s|🥦|🍗/g, "")}`}
                >
                  {label}
                </Button>
              ))}
            </div>

            {planLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["sk-p1", "sk-p2", "sk-p3", "sk-p4", "sk-p5", "sk-p6"].map(
                  (k) => (
                    <Skeleton key={k} className="h-52 rounded-xl" />
                  ),
                )}
              </div>
            ) : !dietPlan ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
                data-ocid="diet.plan.empty_state"
              >
                <div className="text-6xl mb-4">🥗</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No plan generated yet
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Complete your health profile to get a personalized diet plan
                  tailored to your goals.
                </p>
                <Button variant="default" asChild>
                  <a
                    href="/health?onboarding=true"
                    data-ocid="diet.plan.empty_cta"
                  >
                    Complete Profile
                  </a>
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {(
                  Object.entries(grouped) as [MealCategory, typeof planMeals][]
                ).map(
                  ([cat, meals]) =>
                    meals.length > 0 && (
                      <section
                        key={cat}
                        data-ocid={`diet.plan.${cat.toLowerCase()}_section`}
                      >
                        <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                          {cat === MealCategory.Breakfast && "🌅"}
                          {cat === MealCategory.Lunch && "☀️"}
                          {cat === MealCategory.Dinner && "🌙"}
                          {cat === MealCategory.Snack && "🍎"}
                          {cat}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {meals.map((meal, i) => (
                            <MealCard
                              key={String(meal.id)}
                              {...meal}
                              index={i}
                              onAddToLog={handleAddToLog}
                            />
                          ))}
                        </div>
                      </section>
                    ),
                )}
                {planMeals.length === 0 && (
                  <div
                    className="text-center py-16 text-muted-foreground"
                    data-ocid="diet.plan.filtered_empty_state"
                  >
                    No meals match the current filter. Try switching to "All".
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* ── Meal Library ───────────────────────────────────────────────── */}
          <TabsContent value="library">
            <div
              className="flex flex-wrap items-center gap-3 mb-6"
              data-ocid="diet.library.filters"
            >
              {/* Veg toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Diet:</span>
                {[
                  { label: "All", value: null },
                  { label: "🥦 Veg", value: true },
                  { label: "🍗 Non-Veg", value: false },
                ].map(({ label, value }) => (
                  <Button
                    key={label}
                    variant={libVeg === value ? "default" : "outline"}
                    size="sm"
                    className="transition-smooth"
                    onClick={() => setLibVeg(value)}
                    data-ocid={`diet.library.diet_${label.toLowerCase().replace(/\s|🥦|🍗/g, "")}`}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <Separator
                orientation="vertical"
                className="h-6 hidden sm:block"
              />
              {/* Category toggle */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Category:</span>
                {CATEGORIES.map((cat) => (
                  <Button
                    key={cat}
                    variant={
                      (
                        cat === "All"
                          ? libCategory === null
                          : libCategory === cat
                      )
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    className="transition-smooth"
                    onClick={() => setLibCategory(cat === "All" ? null : cat)}
                    data-ocid={`diet.library.cat_${cat.toLowerCase()}`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {libLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[
                  "sk-l1",
                  "sk-l2",
                  "sk-l3",
                  "sk-l4",
                  "sk-l5",
                  "sk-l6",
                  "sk-l7",
                  "sk-l8",
                ].map((k) => (
                  <Skeleton key={k} className="h-52 rounded-xl" />
                ))}
              </div>
            ) : (libraryMeals ?? []).length === 0 ? (
              <div
                className="text-center py-16 text-muted-foreground"
                data-ocid="diet.library.empty_state"
              >
                <div className="text-5xl mb-3">🔍</div>
                <p>No meals found for the selected filters.</p>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                data-ocid="diet.library.list"
              >
                {(libraryMeals ?? []).map((meal, i) => (
                  <MealCard
                    key={String(meal.id)}
                    {...meal}
                    index={i}
                    onAddToLog={handleAddToLog}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── Food Log ───────────────────────────────────────────────────── */}
          <TabsContent value="log">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add entry form */}
              <div className="lg:col-span-1">
                <Card className="card-elevated sticky top-4">
                  <CardHeader>
                    <CardTitle className="font-display text-lg">
                      Log a Meal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleManualLog}
                      className="space-y-4"
                      data-ocid="diet.log.form"
                    >
                      <div className="space-y-1.5">
                        <Label htmlFor="meal-name">Meal Name</Label>
                        <Input
                          id="meal-name"
                          placeholder="e.g. Grilled Chicken Salad"
                          value={logMealName}
                          onChange={(e) => setLogMealName(e.target.value)}
                          required
                          data-ocid="diet.log.meal_name.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="calories">Calories (kcal)</Label>
                        <Input
                          id="calories"
                          type="number"
                          min={0}
                          max={9999}
                          placeholder="e.g. 450"
                          value={logCalories}
                          onChange={(e) => setLogCalories(e.target.value)}
                          required
                          data-ocid="diet.log.calories.input"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full transition-smooth"
                        disabled={
                          isSubmitting || !logMealName.trim() || !logCalories
                        }
                        data-ocid="diet.log.submit_button"
                      >
                        {isSubmitting ? "Saving…" : "Add Entry"}
                      </Button>
                      {isSubmitting && (
                        <p
                          className="text-xs text-muted-foreground text-center"
                          data-ocid="diet.log.loading_state"
                        >
                          Saving your entry…
                        </p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Log table */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Today's Entries
                  </h2>
                  <Badge
                    variant="secondary"
                    className="text-sm font-semibold"
                    data-ocid="diet.log.total_badge"
                  >
                    {totalLoggedCals.toLocaleString()} kcal total
                  </Badge>
                </div>

                {logsLoading ? (
                  <div className="space-y-3">
                    {["sk-e1", "sk-e2", "sk-e3", "sk-e4"].map((k) => (
                      <Skeleton key={k} className="h-14 rounded-lg" />
                    ))}
                  </div>
                ) : (foodLogs ?? []).length === 0 ? (
                  <Card
                    className="border-dashed border-border"
                    data-ocid="diet.log.empty_state"
                  >
                    <CardContent className="text-center py-12">
                      <div className="text-5xl mb-3">📋</div>
                      <p className="font-display text-base font-medium text-foreground mb-1">
                        No meals logged today
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Use the form to add your first entry.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <ScrollArea className="h-[480px] pr-2">
                    <div className="space-y-2" data-ocid="diet.log.list">
                      {(foodLogs ?? []).map((entry, i) => (
                        <motion.div
                          key={String(entry.id)}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          data-ocid={`diet.log.item.${i + 1}`}
                        >
                          <Card className="bg-card border-border">
                            <CardContent className="py-3 px-4 flex items-center justify-between">
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">
                                  {entry.mealName}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {formatTimestamp(entry.timestamp)}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="ml-3 shrink-0 text-primary border-primary/30 bg-primary/10 font-semibold"
                              >
                                {Number(entry.calories).toLocaleString()} kcal
                              </Badge>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                )}

                {/* Summary footer */}
                {(foodLogs ?? []).length > 0 && (
                  <Card
                    className="bg-muted/30 border-border"
                    data-ocid="diet.log.summary"
                  >
                    <CardContent className="py-3 px-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Total logged today
                        </span>
                        <span className="font-bold font-display text-foreground text-lg">
                          {totalLoggedCals.toLocaleString()}{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            kcal
                          </span>
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Daily target
                        </span>
                        <span className="text-foreground font-medium">
                          {dailyTarget.toLocaleString()} kcal
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Remaining</span>
                        <span
                          className={`font-semibold ${remaining === 0 ? "text-accent" : "text-primary"}`}
                        >
                          {remaining === 0
                            ? "Goal reached! 🎉"
                            : `${remaining.toLocaleString()} kcal`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
