import Common "common";

module {
  public type Gender = { #Male; #Female };

  public type Goal = { #LoseWeight; #GainWeight; #Maintain };

  public type DietaryPreference = { #Vegetarian; #NonVegetarian };

  public type ActivityLevel = {
    #Sedentary;       // little or no exercise
    #LightlyActive;   // light exercise 1-3 days/week
    #ModeratelyActive; // moderate exercise 3-5 days/week
    #VeryActive;      // hard exercise 6-7 days/week
    #ExtraActive;     // very hard exercise & physical job
  };

  public type UserProfile = {
    id : Common.UserId;
    var name : Text;
    var age : Nat;
    var heightCm : Float;
    var weightKg : Float;
    var gender : Gender;
    var goal : Goal;
    var dietaryPreference : DietaryPreference;
    var activityLevel : ActivityLevel;
    createdAt : Common.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type UserProfilePublic = {
    id : Common.UserId;
    name : Text;
    age : Nat;
    heightCm : Float;
    weightKg : Float;
    gender : Gender;
    goal : Goal;
    dietaryPreference : DietaryPreference;
    activityLevel : ActivityLevel;
    createdAt : Common.Timestamp;
  };

  public type CreateProfileRequest = {
    name : Text;
    age : Nat;
    heightCm : Float;
    weightKg : Float;
    gender : Gender;
    goal : Goal;
    dietaryPreference : DietaryPreference;
    activityLevel : ActivityLevel;
  };

  public type UpdateProfileRequest = {
    name : ?Text;
    age : ?Nat;
    heightCm : ?Float;
    weightKg : ?Float;
    gender : ?Gender;
    goal : ?Goal;
    dietaryPreference : ?DietaryPreference;
    activityLevel : ?ActivityLevel;
  };
};
