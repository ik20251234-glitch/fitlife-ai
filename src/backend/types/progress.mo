import Common "common";

module {
  public type ProgressRecord = {
    id : Common.Id;
    userId : Common.UserId;
    date : Text; // YYYY-MM-DD format
    bmi : Float;
    weightKg : Float;
    dailyCalories : Nat;
    workoutsCompleted : Nat;
  };

  public type WeeklyStats = {
    weekStartDate : Text; // YYYY-MM-DD of 7 days ago
    averageBMI : Float;
    totalWorkouts : Nat;
    averageDailyCalories : Float;
    streak : Nat; // consecutive active days
  };
};
