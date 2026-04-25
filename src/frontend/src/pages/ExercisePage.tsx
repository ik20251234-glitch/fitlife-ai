import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useExercises,
  useLogWorkout,
  useRoutines,
  useWorkoutLogs,
} from "@/hooks/useExercise";
import { FitnessLevel, MuscleGroup } from "@/types";
import type { Exercise, WorkoutRoutine } from "@/types";

import { format } from "date-fns";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  Dumbbell,
  Play,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pat of patterns) {
    const m = url.match(pat);
    if (m) return m[1];
  }
  return null;
}

const MUSCLE_GROUPS: { label: string; value: MuscleGroup | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Chest", value: MuscleGroup.Chest },
  { label: "Back", value: MuscleGroup.Back },
  { label: "Legs", value: MuscleGroup.Legs },
  { label: "Arms", value: MuscleGroup.Arms },
  { label: "Core", value: MuscleGroup.Core },
  { label: "Cardio", value: MuscleGroup.Cardio },
  { label: "Full Body", value: MuscleGroup.FullBody },
];

const FITNESS_LEVELS: { label: string; value: FitnessLevel | "All" }[] = [
  { label: "All Levels", value: "All" },
  { label: "Beginner", value: FitnessLevel.Beginner },
  { label: "Intermediate", value: FitnessLevel.Intermediate },
  { label: "Advanced", value: FitnessLevel.Advanced },
];

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "bg-primary/20 text-primary border-primary/30",
  Intermediate: "bg-secondary/20 text-secondary border-secondary/30",
  Advanced: "bg-destructive/20 text-destructive border-destructive/30",
};

const MUSCLE_COLOR: Record<string, string> = {
  Chest: "bg-accent/20 text-accent border-accent/30",
  Back: "bg-primary/20 text-primary border-primary/30",
  Legs: "bg-secondary/20 text-secondary border-secondary/30",
  Arms: "bg-accent/20 text-accent border-accent/30",
  Core: "bg-primary/15 text-primary border-primary/30",
  Cardio: "bg-destructive/20 text-destructive border-destructive/30",
  FullBody: "bg-muted-foreground/20 text-foreground border-border",
};

// ─── YouTube Embed ────────────────────────────────────────────────────────────

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (!playing) {
    return (
      <button
        type="button"
        className="relative w-full cursor-pointer group rounded-lg overflow-hidden bg-muted"
        style={{ aspectRatio: "16/9" }}
        onClick={() => setPlaying(true)}
        data-ocid="exercise.video_thumbnail"
        aria-label={`Play ${title} tutorial`}
      >
        <img
          src={thumb}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg transition-smooth group-hover:scale-110 group-hover:bg-primary/90">
            <Play
              className="w-7 h-7 text-primary-foreground ml-1"
              fill="currentColor"
            />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/80 text-foreground text-xs px-2 py-1 rounded">
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 fill-destructive"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          YouTube
        </div>
      </button>
    );
  }

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: "16/9" }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
      />
    </div>
  );
}

// ─── Exercise Card ────────────────────────────────────────────────────────────

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [expanded, setExpanded] = useState(false);
  const videoId = extractVideoId(exercise.youtubeUrl);

  return (
    <Card className="card-elevated overflow-hidden border border-border/60 hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold text-foreground leading-snug">
            {exercise.name}
          </CardTitle>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-muted/70 text-muted-foreground transition-smooth"
            aria-label={expanded ? "Collapse" : "Expand"}
            data-ocid="exercise.expand_toggle"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          <Badge
            variant="outline"
            className={`text-xs ${MUSCLE_COLOR[exercise.muscleGroup] ?? "bg-muted text-foreground"}`}
          >
            {exercise.muscleGroup}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs ${LEVEL_COLOR[exercise.fitnessLevel] ?? "bg-muted text-foreground"}`}
          >
            {exercise.fitnessLevel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {exercise.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {exercise.reps != null && (
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-primary" />
              {exercise.reps.toString()} reps
            </span>
          )}
          {exercise.durationSecs != null && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-secondary" />
              {Math.round(Number(exercise.durationSecs) / 60)} min
            </span>
          )}
        </div>

        {expanded && (
          <div className="pt-2">
            {videoId ? (
              <YouTubeEmbed videoId={videoId} title={exercise.name} />
            ) : (
              <div className="flex items-center justify-center h-24 bg-muted/40 rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                No video available
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Exercise Library Tab ─────────────────────────────────────────────────────

function ExerciseLibraryTab() {
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | "All">("All");
  const [levelFilter, setLevelFilter] = useState<FitnessLevel | "All">("All");
  const [search, setSearch] = useState("");

  const { data: exercises, isLoading } = useExercises(
    muscleFilter === "All" ? null : muscleFilter,
    levelFilter === "All" ? null : levelFilter,
  );

  const filtered = (exercises ?? []).filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
            data-ocid="exercise.search_input"
          />
        </div>
        <Select
          value={muscleFilter}
          onValueChange={(v) => setMuscleFilter(v as MuscleGroup | "All")}
        >
          <SelectTrigger
            className="w-full sm:w-44 bg-card border-border"
            data-ocid="exercise.muscle_filter"
          >
            <SelectValue placeholder="Muscle Group" />
          </SelectTrigger>
          <SelectContent>
            {MUSCLE_GROUPS.map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={levelFilter}
          onValueChange={(v) => setLevelFilter(v as FitnessLevel | "All")}
        >
          <SelectTrigger
            className="w-full sm:w-44 bg-card border-border"
            data-ocid="exercise.level_filter"
          >
            <SelectValue placeholder="Fitness Level" />
          </SelectTrigger>
          <SelectContent>
            {FITNESS_LEVELS.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <Skeleton key={k} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-3 py-20 text-center"
          data-ocid="exercise.empty_state"
        >
          <Dumbbell className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">
            No exercises match your filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMuscleFilter("All");
              setLevelFilter("All");
              setSearch("");
            }}
            data-ocid="exercise.clear_filters_button"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ex, i) => (
            <div key={String(ex.id)} data-ocid={`exercise.item.${i + 1}`}>
              <ExerciseCard exercise={ex} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Routine Card ─────────────────────────────────────────────────────────────

function RoutineCard({
  routine,
  exercises,
  onLogRoutine,
}: {
  routine: WorkoutRoutine;
  exercises: Exercise[];
  onLogRoutine: (name: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const routineExercises = exercises.filter((ex) =>
    routine.exerciseIds.includes(ex.id),
  );

  return (
    <Card className="card-elevated border border-border/60 hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold">
              {routine.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
              {routine.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-muted/70 text-muted-foreground transition-smooth"
            aria-label={expanded ? "Collapse" : "Expand"}
            data-ocid="routine.expand_toggle"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <Badge
            variant="outline"
            className={`text-xs ${LEVEL_COLOR[routine.fitnessLevel] ?? "bg-muted text-foreground"}`}
          >
            {routine.fitnessLevel}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Dumbbell className="w-3 h-3" />
            {routine.exerciseIds.length} exercises
          </span>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-3">
          {routineExercises.length > 0 ? (
            <ul className="space-y-2">
              {routineExercises.map((ex) => (
                <li
                  key={String(ex.id)}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border border-border/40"
                >
                  <Dumbbell className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium truncate block">
                      {ex.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {ex.muscleGroup}
                    </span>
                  </div>
                  {ex.reps != null && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {ex.reps.toString()} reps
                    </span>
                  )}
                  {ex.durationSecs != null && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {Math.round(Number(ex.durationSecs) / 60)} min
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Exercise details loading…
            </p>
          )}
          <Button
            className="w-full mt-1"
            onClick={() => onLogRoutine(routine.name)}
            data-ocid="routine.log_button"
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Log This Routine
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

// ─── Routines Tab ─────────────────────────────────────────────────────────────

function RoutinesTab({
  onLogRoutine,
}: { onLogRoutine: (name: string) => void }) {
  const [levelFilter, setLevelFilter] = useState<FitnessLevel | "All">("All");

  const { data: routines, isLoading: routinesLoading } = useRoutines(
    levelFilter === "All" ? null : levelFilter,
  );
  const { data: exercises } = useExercises(null, null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {routines?.length ?? 0} routine{routines?.length !== 1 ? "s" : ""}{" "}
          available
        </p>
        <Select
          value={levelFilter}
          onValueChange={(v) => setLevelFilter(v as FitnessLevel | "All")}
        >
          <SelectTrigger
            className="w-44 bg-card border-border"
            data-ocid="routine.level_filter"
          >
            <SelectValue placeholder="Fitness Level" />
          </SelectTrigger>
          <SelectContent>
            {FITNESS_LEVELS.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {routinesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["a", "b", "c", "d"].map((k) => (
            <Skeleton key={k} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : !routines?.length ? (
        <div
          className="flex flex-col items-center justify-center gap-3 py-20 text-center"
          data-ocid="routine.empty_state"
        >
          <BookOpen className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">
            No routines found for this level.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routines.map((r, i) => (
            <div key={String(r.id)} data-ocid={`routine.item.${i + 1}`}>
              <RoutineCard
                routine={r}
                exercises={exercises ?? []}
                onLogRoutine={onLogRoutine}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Workout Log Tab ──────────────────────────────────────────────────────────

function WorkoutLogTab({
  prefillRoutine,
  onPrefillConsumed,
}: {
  prefillRoutine?: string;
  onPrefillConsumed: () => void;
}) {
  const [routineName, setRoutineName] = useState(prefillRoutine ?? "");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(true);

  const { data: logs, isLoading } = useWorkoutLogs();
  const logWorkout = useLogWorkout();

  // Sync prefill when it changes
  if (prefillRoutine && prefillRoutine !== routineName) {
    setRoutineName(prefillRoutine);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routineName.trim()) {
      toast.error("Please enter a routine name.");
      return;
    }
    logWorkout.mutate(
      { routineName: routineName.trim(), notes, completed },
      {
        onSuccess: () => {
          toast.success("Workout logged successfully!");
          setRoutineName("");
          setNotes("");
          setCompleted(true);
          onPrefillConsumed();
        },
        onError: () => toast.error("Failed to log workout. Try again."),
      },
    );
  };

  return (
    <div className="space-y-8">
      {/* Log form */}
      <Card className="card-elevated border border-border/60">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Log a Workout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="workout_log.form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="routine-name">Routine Name</Label>
              <Input
                id="routine-name"
                placeholder="e.g. Full Body HIIT"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                className="bg-input border-border"
                data-ocid="workout_log.routine_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="How did it go? Any notes…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-input border-border resize-none min-h-[80px]"
                data-ocid="workout_log.notes_textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="completed"
                checked={completed}
                onCheckedChange={(v) => setCompleted(v === true)}
                data-ocid="workout_log.completed_checkbox"
              />
              <Label htmlFor="completed" className="cursor-pointer select-none">
                Mark as completed
              </Label>
            </div>
            <Button
              type="submit"
              disabled={logWorkout.isPending}
              className="w-full sm:w-auto"
              data-ocid="workout_log.submit_button"
            >
              {logWorkout.isPending ? "Saving…" : "Save Workout"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* History table */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Workout History
        </h3>

        {isLoading ? (
          <div className="space-y-2">
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-14 rounded-lg" />
            ))}
          </div>
        ) : !logs?.length ? (
          <div
            className="flex flex-col items-center justify-center gap-2 py-12 text-center"
            data-ocid="workout_log.empty_state"
          >
            <ClipboardList className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No workouts logged yet. Log your first session above!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border/60">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Routine
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr
                    key={String(log.id)}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`workout_log.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {format(
                        new Date(Number(log.date) / 1_000_000),
                        "MMM d, yyyy",
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium max-w-[160px] truncate">
                      {log.routineName}
                    </td>
                    <td className="px-4 py-3">
                      {log.completed ? (
                        <span className="inline-flex items-center gap-1 text-xs bg-primary/15 text-primary border border-primary/30 rounded-full px-2 py-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          Done
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground border border-border rounded-full px-2 py-0.5">
                          <XCircle className="w-3 h-3" />
                          Partial
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                      {log.notes || (
                        <span className="italic opacity-50">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExercisePage() {
  const [activeTab, setActiveTab] = useState("library");
  const [prefillRoutine, setPrefillRoutine] = useState<string | undefined>();

  const handleLogRoutine = (name: string) => {
    setPrefillRoutine(name);
    setActiveTab("log");
  };

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
      data-ocid="exercise.page"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Exercise Library
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse exercises, explore routines, and track your workouts
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-muted/50 border border-border/50 h-11 p-1">
          <TabsTrigger
            value="library"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            data-ocid="exercise.library_tab"
          >
            <Dumbbell className="w-4 h-4" />
            Exercise Library
          </TabsTrigger>
          <TabsTrigger
            value="routines"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            data-ocid="exercise.routines_tab"
          >
            <BookOpen className="w-4 h-4" />
            Routines
          </TabsTrigger>
          <TabsTrigger
            value="log"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            data-ocid="exercise.log_tab"
          >
            <ClipboardList className="w-4 h-4" />
            Workout Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="mt-0">
          <ExerciseLibraryTab />
        </TabsContent>

        <TabsContent value="routines" className="mt-0">
          <RoutinesTab onLogRoutine={handleLogRoutine} />
        </TabsContent>

        <TabsContent value="log" className="mt-0">
          <WorkoutLogTab
            prefillRoutine={prefillRoutine}
            onPrefillConsumed={() => setPrefillRoutine(undefined)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
