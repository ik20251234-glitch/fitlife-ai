import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Common "../types/common";
import DietTypes "../types/diet";
import AuthTypes "../types/auth";

module {

  // ── Meal seed data ──────────────────────────────────────────────────────────

  let seedMeals : [DietTypes.Meal] = [
    // ── VEGETARIAN BREAKFAST ──
    { id = 1;  name = "Oatmeal with Berries";      calories = 320; proteinG = 10.0; carbsG = 55.0; fatG = 6.0;  prepTimeMinutes = 10; isVegetarian = true;  category = #Breakfast; description = "Rolled oats with fresh mixed berries and honey" },
    { id = 2;  name = "Greek Yogurt Parfait";       calories = 280; proteinG = 18.0; carbsG = 38.0; fatG = 5.0;  prepTimeMinutes = 5;  isVegetarian = true;  category = #Breakfast; description = "Layered Greek yogurt with granola and seasonal fruit" },
    { id = 3;  name = "Avocado Toast";              calories = 340; proteinG = 9.0;  carbsG = 36.0; fatG = 18.0; prepTimeMinutes = 8;  isVegetarian = true;  category = #Breakfast; description = "Multigrain toast topped with smashed avocado, lemon and chilli flakes" },
    { id = 4;  name = "Veggie Omelette";            calories = 310; proteinG = 20.0; carbsG = 8.0;  fatG = 22.0; prepTimeMinutes = 12; isVegetarian = true;  category = #Breakfast; description = "Three-egg omelette stuffed with bell peppers, onions and mushrooms" },
    // ── VEGETARIAN LUNCH ──
    { id = 5;  name = "Paneer Tikka";               calories = 380; proteinG = 24.0; carbsG = 12.0; fatG = 26.0; prepTimeMinutes = 25; isVegetarian = true;  category = #Lunch; description = "Marinated paneer cubes grilled with spiced yogurt coating" },
    { id = 6;  name = "Dal Tadka with Rice";        calories = 420; proteinG = 18.0; carbsG = 68.0; fatG = 8.0;  prepTimeMinutes = 30; isVegetarian = true;  category = #Lunch; description = "Yellow lentils tempered with cumin, garlic and dry red chillies, served with steamed rice" },
    { id = 7;  name = "Quinoa Buddha Bowl";         calories = 460; proteinG = 20.0; carbsG = 58.0; fatG = 16.0; prepTimeMinutes = 20; isVegetarian = true;  category = #Lunch; description = "Quinoa, roasted chickpeas, cucumber, tomato and tahini dressing" },
    { id = 8;  name = "Lentil Soup";                calories = 290; proteinG = 16.0; carbsG = 44.0; fatG = 4.0;  prepTimeMinutes = 25; isVegetarian = true;  category = #Lunch; description = "Hearty red lentil soup with spinach and turmeric" },
    // ── VEGETARIAN DINNER ──
    { id = 9;  name = "Palak Paneer";               calories = 410; proteinG = 22.0; carbsG = 16.0; fatG = 28.0; prepTimeMinutes = 30; isVegetarian = true;  category = #Dinner; description = "Cottage cheese cubes in a creamy spinach and spice gravy" },
    { id = 10; name = "Vegetable Stir Fry";         calories = 350; proteinG = 12.0; carbsG = 48.0; fatG = 12.0; prepTimeMinutes = 15; isVegetarian = true;  category = #Dinner; description = "Mixed vegetables sautéed in garlic-ginger sauce with tofu" },
    { id = 11; name = "Chickpea Curry";             calories = 400; proteinG = 18.0; carbsG = 54.0; fatG = 10.0; prepTimeMinutes = 30; isVegetarian = true;  category = #Dinner; description = "Spiced chickpea curry in tomato-onion masala base" },
    { id = 12; name = "Mushroom Risotto";           calories = 430; proteinG = 14.0; carbsG = 62.0; fatG = 14.0; prepTimeMinutes = 35; isVegetarian = true;  category = #Dinner; description = "Creamy Arborio rice with sautéed mushrooms and parmesan" },
    // ── VEGETARIAN SNACK ──
    { id = 13; name = "Mixed Nuts and Seeds";       calories = 200; proteinG = 6.0;  carbsG = 8.0;  fatG = 17.0; prepTimeMinutes = 2;  isVegetarian = true;  category = #Snack; description = "Almonds, walnuts, pumpkin seeds and sunflower seeds" },
    { id = 14; name = "Hummus with Veggie Sticks";  calories = 180; proteinG = 7.0;  carbsG = 22.0; fatG = 8.0;  prepTimeMinutes = 5;  isVegetarian = true;  category = #Snack; description = "Chickpea hummus served with carrot, celery and cucumber sticks" },
    { id = 15; name = "Fruit Smoothie";             calories = 220; proteinG = 5.0;  carbsG = 45.0; fatG = 3.0;  prepTimeMinutes = 5;  isVegetarian = true;  category = #Snack; description = "Banana, mango and spinach blended with almond milk" },
    { id = 16; name = "Roasted Chickpeas";          calories = 160; proteinG = 8.0;  carbsG = 24.0; fatG = 4.0;  prepTimeMinutes = 30; isVegetarian = true;  category = #Snack; description = "Crispy oven-roasted chickpeas with paprika and cumin" },
    // ── NON-VEGETARIAN BREAKFAST ──
    { id = 17; name = "Egg White Omelette";         calories = 280; proteinG = 30.0; carbsG = 6.0;  fatG = 14.0; prepTimeMinutes = 10; isVegetarian = false; category = #Breakfast; description = "Fluffy egg-white omelette with spinach, tomato and low-fat cheese" },
    { id = 18; name = "Chicken Breakfast Burrito";  calories = 420; proteinG = 32.0; carbsG = 38.0; fatG = 14.0; prepTimeMinutes = 15; isVegetarian = false; category = #Breakfast; description = "Scrambled eggs with diced chicken, peppers, and salsa in a whole-wheat wrap" },
    { id = 19; name = "Smoked Salmon Bagel";        calories = 390; proteinG = 28.0; carbsG = 36.0; fatG = 12.0; prepTimeMinutes = 8;  isVegetarian = false; category = #Breakfast; description = "Toasted bagel with cream cheese, smoked salmon and capers" },
    { id = 20; name = "Turkey Bacon and Eggs";      calories = 350; proteinG = 28.0; carbsG = 4.0;  fatG = 24.0; prepTimeMinutes = 12; isVegetarian = false; category = #Breakfast; description = "Two sunny-side-up eggs with crispy turkey bacon strips" },
    // ── NON-VEGETARIAN LUNCH ──
    { id = 21; name = "Grilled Chicken Salad";      calories = 380; proteinG = 42.0; carbsG = 12.0; fatG = 16.0; prepTimeMinutes = 15; isVegetarian = false; category = #Lunch; description = "Grilled chicken breast over mixed greens with olive oil and lemon dressing" },
    { id = 22; name = "Tuna Salad Wrap";            calories = 360; proteinG = 34.0; carbsG = 30.0; fatG = 12.0; prepTimeMinutes = 10; isVegetarian = false; category = #Lunch; description = "Light tuna with celery, onion and Greek yogurt in a whole-wheat wrap" },
    { id = 23; name = "Chicken Curry";              calories = 480; proteinG = 38.0; carbsG = 22.0; fatG = 24.0; prepTimeMinutes = 35; isVegetarian = false; category = #Lunch; description = "Tender chicken pieces in a fragrant tomato-coconut curry sauce" },
    { id = 24; name = "Beef Stir Fry";              calories = 440; proteinG = 36.0; carbsG = 30.0; fatG = 18.0; prepTimeMinutes = 20; isVegetarian = false; category = #Lunch; description = "Lean beef strips with broccoli, bell peppers and oyster sauce" },
    // ── NON-VEGETARIAN DINNER ──
    { id = 25; name = "Baked Salmon";               calories = 450; proteinG = 46.0; carbsG = 6.0;  fatG = 26.0; prepTimeMinutes = 25; isVegetarian = false; category = #Dinner; description = "Herb-crusted salmon fillet baked with lemon and garlic, served with steamed asparagus" },
    { id = 26; name = "Grilled Chicken Breast";     calories = 320; proteinG = 48.0; carbsG = 2.0;  fatG = 12.0; prepTimeMinutes = 20; isVegetarian = false; category = #Dinner; description = "Marinated grilled chicken breast with rosemary and thyme" },
    { id = 27; name = "Prawn Stir Fry";             calories = 380; proteinG = 36.0; carbsG = 28.0; fatG = 12.0; prepTimeMinutes = 15; isVegetarian = false; category = #Dinner; description = "Juicy prawns tossed with bok choy, snap peas and garlic sauce" },
    { id = 28; name = "Lamb Keema";                 calories = 520; proteinG = 40.0; carbsG = 18.0; fatG = 30.0; prepTimeMinutes = 30; isVegetarian = false; category = #Dinner; description = "Spiced minced lamb cooked with peas, tomatoes and aromatic spices" },
    // ── NON-VEGETARIAN SNACK ──
    { id = 29; name = "Boiled Eggs";                calories = 150; proteinG = 12.0; carbsG = 1.0;  fatG = 10.0; prepTimeMinutes = 10; isVegetarian = false; category = #Snack; description = "Two hard-boiled eggs, a great high-protein snack" },
    { id = 30; name = "Chicken Protein Shake";      calories = 240; proteinG = 35.0; carbsG = 12.0; fatG = 4.0;  prepTimeMinutes = 3;  isVegetarian = false; category = #Snack; description = "Whey protein with milk and banana for a post-workout boost" },
    { id = 31; name = "Tuna Rice Cakes";            calories = 180; proteinG = 18.0; carbsG = 20.0; fatG = 3.0;  prepTimeMinutes = 5;  isVegetarian = false; category = #Snack; description = "Light tuna on crispy rice cakes with a squeeze of lemon" },
    { id = 32; name = "Jerky and Cheese";           calories = 200; proteinG = 20.0; carbsG = 6.0;  fatG = 11.0; prepTimeMinutes = 2;  isVegetarian = false; category = #Snack; description = "Lean beef jerky paired with a slice of cheddar cheese" },
  ];

  // ── Public helpers ──────────────────────────────────────────────────────────

  public func initMeals(meals : List.List<DietTypes.Meal>) {
    if (meals.size() == 0) {
      meals.addAll(seedMeals.values());
    };
  };

  public func getMeals(
    meals : List.List<DietTypes.Meal>,
    dietaryPreference : ?AuthTypes.DietaryPreference,
    category : ?DietTypes.MealCategory,
  ) : [DietTypes.Meal] {
    meals.filter(func(m) {
      let passesVeg = switch (dietaryPreference) {
        case (?#Vegetarian)    { m.isVegetarian };
        case (?#NonVegetarian) { true }; // non-veg users can see all meals
        case null              { true };
      };
      let passesCat = switch (category) {
        case (?cat) { m.category == cat };
        case null   { true };
      };
      passesVeg and passesCat
    }).toArray()
  };

  public func getMealById(
    meals : List.List<DietTypes.Meal>,
    mealId : Common.Id,
  ) : ?DietTypes.Meal {
    meals.find(func(m) { m.id == mealId })
  };

  // Activity multiplier for BMR → TDEE
  func activityMultiplier(level : AuthTypes.ActivityLevel) : Float {
    switch (level) {
      case (#Sedentary)        { 1.2 };
      case (#LightlyActive)    { 1.375 };
      case (#ModeratelyActive) { 1.55 };
      case (#VeryActive)       { 1.725 };
      case (#ExtraActive)      { 1.9 };
    }
  };

  // Pick the best meals to fill a caloric budget for a given category
  func pickMealsForCategory(
    candidates : [DietTypes.Meal],
    cat : DietTypes.MealCategory,
    budgetCal : Nat,
  ) : [DietTypes.Meal] {
    let pool = candidates.filter(func(m) { m.category == cat });
    if (pool.size() == 0) { return [] };
    // Sort by proximity to budget (closest under-budget first)
    let sorted = pool.sort(func(a, b) {
      let bI = budgetCal.toInt();
      let da : Int = if (a.calories.toInt() <= bI) { bI - a.calories.toInt() } else { a.calories.toInt() - bI };
      let db : Int = if (b.calories.toInt() <= bI) { bI - b.calories.toInt() } else { b.calories.toInt() - bI };
      Int.compare(da, db)
    });
    // Take the single best-fit meal for this category
    [sorted[0]]
  };

  public func generateDietPlan(
    meals : List.List<DietTypes.Meal>,
    userId : Common.UserId,
    bmr : Float,
    dietaryPreference : AuthTypes.DietaryPreference,
    goal : AuthTypes.Goal,
    activityLevel : AuthTypes.ActivityLevel,
  ) : DietTypes.DietPlan {
    // TDEE
    let tdee = bmr * activityMultiplier(activityLevel);
    // Goal adjustment
    let adjustment : Float = switch (goal) {
      case (#LoseWeight) { -500.0 };
      case (#GainWeight) { 500.0 };
      case (#Maintain)   { 0.0 };
    };
    let targetFloat = tdee + adjustment;
    let dailyCaloricTarget : Nat = if (targetFloat > 0.0) { Int.abs(targetFloat.toInt()) } else { 1500 };

    // Filter pool by dietary preference
    let pool = getMeals(meals, ?dietaryPreference, null);

    // Distribute ~daily target across 4 meals: Breakfast 25%, Lunch 35%, Dinner 30%, Snack 10%
    let bfBudget  = (dailyCaloricTarget * 25) / 100;
    let lunchBudget = (dailyCaloricTarget * 35) / 100;
    let dinnerBudget = (dailyCaloricTarget * 30) / 100;
    let snackBudget  = (dailyCaloricTarget * 10) / 100;

    let selected =
      pickMealsForCategory(pool, #Breakfast, bfBudget)
        .concat(pickMealsForCategory(pool, #Lunch, lunchBudget))
        .concat(pickMealsForCategory(pool, #Dinner, dinnerBudget))
        .concat(pickMealsForCategory(pool, #Snack, snackBudget));

    { userId; dailyCaloricTarget; meals = selected }
  };

  public func addFoodLog(
    foodLogs : List.List<DietTypes.FoodLogEntry>,
    nextId : Nat,
    userId : Common.UserId,
    req : DietTypes.AddFoodLogRequest,
  ) : DietTypes.FoodLogEntry {
    let entry : DietTypes.FoodLogEntry = {
      id = nextId;
      userId;
      mealName = req.mealName;
      calories = req.calories;
      timestamp = Time.now();
    };
    foodLogs.add(entry);
    entry
  };

  public func getFoodLogs(
    foodLogs : List.List<DietTypes.FoodLogEntry>,
    userId : Common.UserId,
  ) : [DietTypes.FoodLogEntry] {
    foodLogs.filter(func(e) { Principal.equal(e.userId, userId) }).toArray()
  };

  public func getTodayCalories(
    foodLogs : List.List<DietTypes.FoodLogEntry>,
    userId : Common.UserId,
  ) : Nat {
    let now = Time.now();
    // 86_400_000_000_000 nanoseconds in a day
    let dayNs : Int = 86_400_000_000_000;
    let startOfDay : Int = (now / dayNs) * dayNs;

    let total : Int = foodLogs
      .filter(func(e) {
        Principal.equal(e.userId, userId) and e.timestamp >= startOfDay and e.timestamp < startOfDay + dayNs
      })
      .foldLeft(0 : Int, func(acc : Int, e : DietTypes.FoodLogEntry) : Int { acc + e.calories.toInt() });
    Int.abs(total)
  };
};
