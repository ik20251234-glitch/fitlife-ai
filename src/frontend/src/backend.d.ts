import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Meal {
    id: Id;
    fatG: number;
    calories: bigint;
    name: string;
    description: string;
    isVegetarian: boolean;
    category: MealCategory;
    carbsG: number;
    prepTimeMinutes: bigint;
    proteinG: number;
}
export interface FoodLogEntry {
    id: Id;
    userId: UserId;
    calories: bigint;
    timestamp: Timestamp;
    mealName: string;
}
export type Timestamp = bigint;
export interface Exercise {
    id: Id;
    durationSecs?: bigint;
    fitnessLevel: FitnessLevel;
    name: string;
    reps?: bigint;
    description: string;
    muscleGroup: MuscleGroup;
    youtubeUrl: string;
}
export interface CreateProfileRequest {
    age: bigint;
    activityLevel: ActivityLevel;
    heightCm: number;
    goal: Goal;
    name: string;
    weightKg: number;
    gender: Gender;
    dietaryPreference: DietaryPreference;
}
export interface WorkoutRoutine {
    id: Id;
    fitnessLevel: FitnessLevel;
    exerciseIds: Array<Id>;
    name: string;
    description: string;
}
export interface UserProfilePublic {
    id: UserId;
    age: bigint;
    activityLevel: ActivityLevel;
    heightCm: number;
    goal: Goal;
    name: string;
    createdAt: Timestamp;
    weightKg: number;
    gender: Gender;
    dietaryPreference: DietaryPreference;
}
export interface AddFoodLogRequest {
    calories: bigint;
    mealName: string;
}
export type UserId = Principal;
export interface WeeklyStats {
    streak: bigint;
    averageDailyCalories: number;
    weekStartDate: string;
    totalWorkouts: bigint;
    averageBMI: number;
}
export interface UpdateProfileRequest {
    age?: bigint;
    activityLevel?: ActivityLevel;
    heightCm?: number;
    goal?: Goal;
    name?: string;
    weightKg?: number;
    gender?: Gender;
    dietaryPreference?: DietaryPreference;
}
export interface ProgressRecord {
    id: Id;
    bmi: number;
    userId: UserId;
    date: string;
    weightKg: number;
    dailyCalories: bigint;
    workoutsCompleted: bigint;
}
export interface LogWorkoutRequest {
    completed: boolean;
    routineName: string;
    notes: string;
}
export type Id = bigint;
export interface HealthMetricLog {
    id: Id;
    bmi: number;
    bmr: number;
    heightCm: number;
    bmiCategory: BMICategory;
    userId: UserId;
    weightKg: number;
    timestamp: Timestamp;
}
export interface HealthSummary {
    bmiCategory: BMICategory;
    latestBMI: number;
    latestBMR: number;
    dailyCaloricNeeds: number;
}
export interface DietPlan {
    meals: Array<Meal>;
    userId: UserId;
    dailyCaloricTarget: bigint;
}
export interface WorkoutLogEntry {
    id: Id;
    userId: UserId;
    date: Timestamp;
    completed: boolean;
    routineName: string;
    notes: string;
}
export enum ActivityLevel {
    Sedentary = "Sedentary",
    VeryActive = "VeryActive",
    LightlyActive = "LightlyActive",
    ModeratelyActive = "ModeratelyActive",
    ExtraActive = "ExtraActive"
}
export enum BMICategory {
    Normal = "Normal",
    Overweight = "Overweight",
    Obese = "Obese",
    Underweight = "Underweight"
}
export enum DietaryPreference {
    Vegetarian = "Vegetarian",
    NonVegetarian = "NonVegetarian"
}
export enum FitnessLevel {
    Beginner = "Beginner",
    Advanced = "Advanced",
    Intermediate = "Intermediate"
}
export enum Gender {
    Male = "Male",
    Female = "Female"
}
export enum Goal {
    Maintain = "Maintain",
    GainWeight = "GainWeight",
    LoseWeight = "LoseWeight"
}
export enum MealCategory {
    Lunch = "Lunch",
    Snack = "Snack",
    Breakfast = "Breakfast",
    Dinner = "Dinner"
}
export enum MuscleGroup {
    Arms = "Arms",
    Back = "Back",
    Core = "Core",
    FullBody = "FullBody",
    Legs = "Legs",
    Chest = "Chest",
    Cardio = "Cardio"
}
export interface backendInterface {
    addFoodLog(req: AddFoodLogRequest): Promise<FoodLogEntry>;
    createMyProfile(req: CreateProfileRequest): Promise<UserProfilePublic>;
    getExerciseById(exerciseId: Id): Promise<Exercise | null>;
    getExercises(muscleGroup: MuscleGroup | null, fitnessLevel: FitnessLevel | null): Promise<Array<Exercise>>;
    getHealthLogs(): Promise<Array<HealthMetricLog>>;
    getHealthSummary(): Promise<HealthSummary | null>;
    getMealById(mealId: Id): Promise<Meal | null>;
    getMeals(isVegetarian: boolean | null, category: MealCategory | null): Promise<Array<Meal>>;
    getMyDietPlan(): Promise<DietPlan | null>;
    getMyFoodLogs(): Promise<Array<FoodLogEntry>>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    getMyWorkoutLogs(): Promise<Array<WorkoutLogEntry>>;
    getProgressHistory(): Promise<Array<ProgressRecord>>;
    getRecentProgress(limitDays: bigint): Promise<Array<ProgressRecord>>;
    getRoutineById(routineId: Id): Promise<WorkoutRoutine | null>;
    getRoutines(fitnessLevel: FitnessLevel | null): Promise<Array<WorkoutRoutine>>;
    getTodayCalories(): Promise<bigint>;
    getWeeklyStats(): Promise<WeeklyStats | null>;
    hasProfile(): Promise<boolean>;
    logHealthMetrics(): Promise<HealthMetricLog>;
    logWorkout(req: LogWorkoutRequest): Promise<WorkoutLogEntry>;
    recordDailyProgress(bmi: number, weightKg: number, dailyCalories: bigint, workoutsCompleted: bigint): Promise<ProgressRecord>;
    updateMyProfile(req: UpdateProfileRequest): Promise<UserProfilePublic | null>;
}
