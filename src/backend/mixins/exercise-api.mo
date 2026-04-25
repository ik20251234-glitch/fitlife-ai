import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Common "../types/common";
import ExerciseTypes "../types/exercise";
import AuthTypes "../types/auth";
import ExerciseLib "../lib/exercise";

mixin (
  users : List.List<AuthTypes.UserProfile>,
  exercises : List.List<ExerciseTypes.Exercise>,
  routines : List.List<ExerciseTypes.WorkoutRoutine>,
  workoutLogs : List.List<ExerciseTypes.WorkoutLogEntry>,
  nextWorkoutLogId : List.List<Nat>,
) {
  public shared query ({ caller = _ }) func getExercises(
    muscleGroup : ?ExerciseTypes.MuscleGroup,
    fitnessLevel : ?ExerciseTypes.FitnessLevel,
  ) : async [ExerciseTypes.Exercise] {
    ExerciseLib.getExercises(exercises, muscleGroup, fitnessLevel)
  };

  public shared query ({ caller = _ }) func getExerciseById(
    exerciseId : Common.Id
  ) : async ?ExerciseTypes.Exercise {
    ExerciseLib.getExerciseById(exercises, exerciseId)
  };

  public shared query ({ caller = _ }) func getRoutines(
    fitnessLevel : ?ExerciseTypes.FitnessLevel
  ) : async [ExerciseTypes.WorkoutRoutine] {
    ExerciseLib.getRoutines(routines, fitnessLevel)
  };

  public shared query ({ caller = _ }) func getRoutineById(
    routineId : Common.Id
  ) : async ?ExerciseTypes.WorkoutRoutine {
    ExerciseLib.getRoutineById(routines, routineId)
  };

  public shared ({ caller }) func logWorkout(
    req : ExerciseTypes.LogWorkoutRequest
  ) : async ExerciseTypes.WorkoutLogEntry {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    let currentId = nextWorkoutLogId.at(0);
    let entry = ExerciseLib.logWorkout(workoutLogs, currentId, caller, req);
    nextWorkoutLogId.put(0, currentId + 1);
    entry
  };

  public shared query ({ caller }) func getMyWorkoutLogs() : async [ExerciseTypes.WorkoutLogEntry] {
    ExerciseLib.getWorkoutLogs(workoutLogs, caller)
  };
};
