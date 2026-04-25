import Common "common";

module {
  public type MealCategory = {
    #Breakfast;
    #Lunch;
    #Dinner;
    #Snack;
  };

  public type Meal = {
    id : Common.Id;
    name : Text;
    calories : Nat;
    proteinG : Float;
    carbsG : Float;
    fatG : Float;
    prepTimeMinutes : Nat;
    isVegetarian : Bool;
    category : MealCategory;
    description : Text;
  };

  public type FoodLogEntry = {
    id : Common.Id;
    userId : Common.UserId;
    mealName : Text;
    calories : Nat;
    timestamp : Common.Timestamp;
  };

  public type DietPlan = {
    userId : Common.UserId;
    dailyCaloricTarget : Nat;
    meals : [Meal];
  };

  public type AddFoodLogRequest = {
    mealName : Text;
    calories : Nat;
  };
};
