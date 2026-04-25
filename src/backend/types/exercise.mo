import Common "common";

module {
  public type MuscleGroup = {
    #Chest;
    #Back;
    #Legs;
    #Arms;
    #Core;
    #Cardio;
    #FullBody;
  };

  public type FitnessLevel = {
    #Beginner;
    #Intermediate;
    #Advanced;
  };

  public type Exercise = {
    id : Common.Id;
    name : Text;
    muscleGroup : MuscleGroup;
    fitnessLevel : FitnessLevel;
    youtubeUrl : Text;
    description : Text;
    reps : ?Nat;          // null if duration-based
    durationSecs : ?Nat;  // null if rep-based
  };

  public type WorkoutRoutine = {
    id : Common.Id;
    name : Text;
    exerciseIds : [Common.Id];
    fitnessLevel : FitnessLevel;
    description : Text;
  };

  public type WorkoutLogEntry = {
    id : Common.Id;
    userId : Common.UserId;
    routineName : Text;
    date : Common.Timestamp;
    notes : Text;
    completed : Bool;
  };

  public type LogWorkoutRequest = {
    routineName : Text;
    notes : Text;
    completed : Bool;
  };
};
