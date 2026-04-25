import Runtime "mo:core/Runtime";
import List "mo:core/List";
import AuthTypes "../types/auth";
import HealthTypes "../types/health";
import AuthLib "../lib/auth";
import HealthLib "../lib/health";

mixin (
  users : List.List<AuthTypes.UserProfile>,
  healthLogs : List.List<HealthTypes.HealthMetricLog>,
  nextHealthLogId : List.List<Nat>,
) {
  public shared ({ caller }) func logHealthMetrics() : async HealthTypes.HealthMetricLog {
    let profile = switch (AuthLib.getProfile(users, caller)) {
      case (?p) p;
      case null Runtime.trap("Profile not found — create a profile first");
    };
    let currentId = nextHealthLogId.at(0);
    let entry = HealthLib.logMetric(
      healthLogs,
      currentId,
      caller,
      profile.weightKg,
      profile.heightCm,
      profile.age,
      profile.gender,
    );
    nextHealthLogId.put(0, currentId + 1);
    entry;
  };

  public shared query ({ caller }) func getHealthLogs() : async [HealthTypes.HealthMetricLog] {
    HealthLib.getMetricLogs(healthLogs, caller);
  };

  public shared query ({ caller }) func getHealthSummary() : async ?HealthTypes.HealthSummary {
    let profile = switch (AuthLib.getProfile(users, caller)) {
      case (?p) p;
      case null return null;
    };
    HealthLib.getHealthSummary(healthLogs, caller, profile.activityLevel);
  };
};
