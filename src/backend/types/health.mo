import Common "common";

module {
  public type BMICategory = {
    #Underweight;
    #Normal;
    #Overweight;
    #Obese;
  };

  public type HealthMetricLog = {
    id : Common.Id;
    userId : Common.UserId;
    timestamp : Common.Timestamp;
    weightKg : Float;
    heightCm : Float;
    bmi : Float;
    bmr : Float;
    bmiCategory : BMICategory;
  };

  public type HealthSummary = {
    latestBMI : Float;
    latestBMR : Float;
    bmiCategory : BMICategory;
    dailyCaloricNeeds : Float; // BMR adjusted for activity level
  };
};
