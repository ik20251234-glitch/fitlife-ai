export {
  ActivityLevel,
  BMICategory,
  DietaryPreference,
  FitnessLevel,
  Gender,
  Goal,
  MealCategory,
  MuscleGroup,
} from "../backend.d";

export type {
  AddFoodLogRequest,
  CreateProfileRequest,
  DietPlan,
  Exercise,
  FoodLogEntry,
  HealthMetricLog,
  HealthSummary,
  Id,
  LogWorkoutRequest,
  Meal,
  ProgressRecord,
  Timestamp,
  UpdateProfileRequest,
  UserProfilePublic,
  UserId,
  WeeklyStats,
  WorkoutLogEntry,
  WorkoutRoutine,
} from "../backend.d";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
}
