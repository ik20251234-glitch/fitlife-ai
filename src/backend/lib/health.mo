import List "mo:core/List";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Common "../types/common";
import HealthTypes "../types/health";
import AuthTypes "../types/auth";

module {
  /// Round a Float to 2 decimal places
  func round2(x : Float) : Float {
    Float.nearest(x * 100.0) / 100.0;
  };

  /// BMI = weight(kg) / (height(m))^2
  public func calculateBMI(weightKg : Float, heightCm : Float) : Float {
    let heightM = heightCm / 100.0;
    round2(weightKg / (heightM * heightM));
  };

  /// Mifflin-St Jeor:
  /// Male:   BMR = 10*weight(kg) + 6.25*height(cm) - 5*age + 5
  /// Female: BMR = 10*weight(kg) + 6.25*height(cm) - 5*age - 161
  public func calculateBMR(
    weightKg : Float,
    heightCm : Float,
    age : Nat,
    gender : AuthTypes.Gender,
  ) : Float {
    let ageF : Float = age.toFloat();
    let base = 10.0 * weightKg + 6.25 * heightCm - 5.0 * ageF;
    let bmr = switch (gender) {
      case (#Male) base + 5.0;
      case (#Female) base - 161.0;
    };
    round2(bmr);
  };

  public func bmiCategory(bmi : Float) : HealthTypes.BMICategory {
    if (bmi < 18.5) #Underweight
    else if (bmi < 25.0) #Normal
    else if (bmi < 30.0) #Overweight
    else #Obese;
  };

  /// Returns BMR * activity multiplier
  public func dailyCaloricNeeds(
    bmr : Float,
    activityLevel : AuthTypes.ActivityLevel,
  ) : Float {
    let multiplier = switch (activityLevel) {
      case (#Sedentary) 1.2;
      case (#LightlyActive) 1.375;
      case (#ModeratelyActive) 1.55;
      case (#VeryActive) 1.725;
      case (#ExtraActive) 1.9;
    };
    round2(bmr * multiplier);
  };

  public func logMetric(
    logs : List.List<HealthTypes.HealthMetricLog>,
    nextId : Nat,
    userId : Common.UserId,
    weightKg : Float,
    heightCm : Float,
    age : Nat,
    gender : AuthTypes.Gender,
  ) : HealthTypes.HealthMetricLog {
    let bmi = calculateBMI(weightKg, heightCm);
    let bmr = calculateBMR(weightKg, heightCm, age, gender);
    let entry : HealthTypes.HealthMetricLog = {
      id = nextId;
      userId;
      timestamp = Time.now();
      weightKg;
      heightCm;
      bmi;
      bmr;
      bmiCategory = bmiCategory(bmi);
    };
    logs.add(entry);
    entry;
  };

  public func getMetricLogs(
    logs : List.List<HealthTypes.HealthMetricLog>,
    userId : Common.UserId,
  ) : [HealthTypes.HealthMetricLog] {
    logs.filter(func(log : HealthTypes.HealthMetricLog) : Bool {
      log.userId == userId
    }).toArray();
  };

  public func getHealthSummary(
    logs : List.List<HealthTypes.HealthMetricLog>,
    userId : Common.UserId,
    activityLevel : AuthTypes.ActivityLevel,
  ) : ?HealthTypes.HealthSummary {
    let userLogs = logs.filter(func(log : HealthTypes.HealthMetricLog) : Bool {
      log.userId == userId
    });
    switch (userLogs.last()) {
      case null null;
      case (?latest) {
        ?{
          latestBMI = latest.bmi;
          latestBMR = latest.bmr;
          bmiCategory = latest.bmiCategory;
          dailyCaloricNeeds = dailyCaloricNeeds(latest.bmr, activityLevel);
        };
      };
    };
  };
};
