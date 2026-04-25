import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import ProgressLib "../lib/progress";
import ProgressTypes "../types/progress";
import AuthTypes "../types/auth";

mixin (
  users : List.List<AuthTypes.UserProfile>,
  progressRecords : List.List<ProgressTypes.ProgressRecord>,
  nextProgressId : List.List<Nat>,
) {
  /// Record today's progress for the calling user. Deduplicates by date.
  public shared ({ caller }) func recordDailyProgress(
    bmi : Float,
    weightKg : Float,
    dailyCalories : Nat,
    workoutsCompleted : Nat,
  ) : async ProgressTypes.ProgressRecord {
    // Caller must have a profile
    switch (users.find(func(u : AuthTypes.UserProfile) : Bool { Principal.equal(u.id, caller) })) {
      case null Runtime.trap("User profile not found. Please register first.");
      case _ {};
    };
    let currentId = nextProgressId.at(0);
    let record = ProgressLib.recordProgress(
      progressRecords,
      currentId,
      caller,
      bmi,
      weightKg,
      dailyCalories,
      workoutsCompleted,
    );
    // Increment counter only when a new record was inserted (id matches currentId)
    if (record.id == currentId) {
      nextProgressId.put(0, currentId + 1);
    };
    record
  };

  /// Retrieve full progress history for the calling user, sorted ascending by date.
  public shared query ({ caller }) func getProgressHistory() : async [ProgressTypes.ProgressRecord] {
    ProgressLib.getProgressHistory(progressRecords, caller)
  };

  /// Compute weekly stats (last 7 days) for the calling user.
  public shared query ({ caller }) func getWeeklyStats() : async ?ProgressTypes.WeeklyStats {
    ProgressLib.getWeeklyStats(progressRecords, caller)
  };

  /// Return the most recent `limitDays` days of progress for the calling user.
  public shared query ({ caller }) func getRecentProgress(
    limitDays : Nat
  ) : async [ProgressTypes.ProgressRecord] {
    ProgressLib.getRecentProgress(progressRecords, caller, limitDays)
  };
};
