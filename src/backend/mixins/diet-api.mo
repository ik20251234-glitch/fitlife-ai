import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Common "../types/common";
import DietTypes "../types/diet";
import AuthTypes "../types/auth";
import DietLib "../lib/diet";

mixin (
  users : List.List<AuthTypes.UserProfile>,
  meals : List.List<DietTypes.Meal>,
  foodLogs : List.List<DietTypes.FoodLogEntry>,
  nextFoodLogId : List.List<Nat>,
) {
  // Seed meal library on first deploy (idempotent — only seeds when empty)
  DietLib.initMeals(meals);

  public shared query ({ caller }) func getMeals(
    isVegetarian : ?Bool,
    category : ?DietTypes.MealCategory,
  ) : async [DietTypes.Meal] {
    let pref : ?AuthTypes.DietaryPreference = switch (isVegetarian) {
      case (?true)  { ?#Vegetarian };
      case (?false) { ?#NonVegetarian };
      case null     { null };
    };
    DietLib.getMeals(meals, pref, category)
  };

  public shared query ({ caller }) func getMealById(
    mealId : Common.Id
  ) : async ?DietTypes.Meal {
    DietLib.getMealById(meals, mealId)
  };

  public shared query ({ caller }) func getMyDietPlan() : async ?DietTypes.DietPlan {
    switch (users.find(func(u) { Principal.equal(u.id, caller) })) {
      case null { null };
      case (?profile) {
        // Mifflin-St Jeor BMR inline (mirrors DietLib internal)
        let w = profile.weightKg;
        let h = profile.heightCm;
        let a = profile.age.toFloat();
        let bmr : Float = switch (profile.gender) {
          case (#Male)   { (10.0 * w) + (6.25 * h) - (5.0 * a) + 5.0 };
          case (#Female) { (10.0 * w) + (6.25 * h) - (5.0 * a) - 161.0 };
        };
        ?DietLib.generateDietPlan(
          meals,
          caller,
          bmr,
          profile.dietaryPreference,
          profile.goal,
          profile.activityLevel,
        )
      };
    }
  };

  public shared ({ caller }) func addFoodLog(
    req : DietTypes.AddFoodLogRequest
  ) : async DietTypes.FoodLogEntry {
    if (caller.isAnonymous()) {
      Runtime.trap("Authentication required");
    };
    let currentId = nextFoodLogId.at(0);
    let entry = DietLib.addFoodLog(foodLogs, currentId, caller, req);
    nextFoodLogId.put(0, currentId + 1);
    entry
  };

  public shared query ({ caller }) func getMyFoodLogs() : async [DietTypes.FoodLogEntry] {
    DietLib.getFoodLogs(foodLogs, caller)
  };

  public shared query ({ caller }) func getTodayCalories() : async Nat {
    DietLib.getTodayCalories(foodLogs, caller)
  };
};
