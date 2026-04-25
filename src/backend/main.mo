import List "mo:core/List";
import AuthTypes "types/auth";
import HealthTypes "types/health";
import DietTypes "types/diet";
import ExerciseTypes "types/exercise";
import ProgressTypes "types/progress";
import AuthMixin "mixins/auth-api";
import HealthMixin "mixins/health-api";
import DietMixin "mixins/diet-api";
import ExerciseMixin "mixins/exercise-api";
import ProgressMixin "mixins/progress-api";
import ExerciseLib "lib/exercise";

actor {
  // ── User state ──────────────────────────────────────────────────────────────
  let users = List.empty<AuthTypes.UserProfile>();

  // ── Health analytics state ──────────────────────────────────────────────────
  let healthLogs = List.empty<HealthTypes.HealthMetricLog>();
  let nextHealthLogId = List.singleton<Nat>(0);

  // ── Diet management state ────────────────────────────────────────────────────
  let meals = List.empty<DietTypes.Meal>();
  let foodLogs = List.empty<DietTypes.FoodLogEntry>();
  let nextFoodLogId = List.singleton<Nat>(0);

  // ── Exercise library state ───────────────────────────────────────────────────
  let exercises = List.empty<ExerciseTypes.Exercise>();
  let routines = List.empty<ExerciseTypes.WorkoutRoutine>();
  let workoutLogs = List.empty<ExerciseTypes.WorkoutLogEntry>();
  let nextWorkoutLogId = List.singleton<Nat>(0);

  // Seed exercise data on first deploy (idempotent check)
  if (exercises.size() == 0) { ExerciseLib.seedExercises(exercises) };
  if (routines.size() == 0) { ExerciseLib.seedRoutines(routines) };

  // ── Progress tracking state ──────────────────────────────────────────────────
  let progressRecords = List.empty<ProgressTypes.ProgressRecord>();
  let nextProgressId = List.singleton<Nat>(0);

  // ── Mixin composition ────────────────────────────────────────────────────────
  include AuthMixin(users);
  include HealthMixin(users, healthLogs, nextHealthLogId);
  include DietMixin(users, meals, foodLogs, nextFoodLogId);
  include ExerciseMixin(users, exercises, routines, workoutLogs, nextWorkoutLogId);
  include ProgressMixin(users, progressRecords, nextProgressId);
};
