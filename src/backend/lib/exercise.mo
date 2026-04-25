import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import ExerciseTypes "../types/exercise";

module {
  public func getExercises(
    exercises : List.List<ExerciseTypes.Exercise>,
    muscleGroup : ?ExerciseTypes.MuscleGroup,
    fitnessLevel : ?ExerciseTypes.FitnessLevel,
  ) : [ExerciseTypes.Exercise] {
    exercises.filter(func(e) {
      let mgMatch = switch (muscleGroup) {
        case null true;
        case (?mg) e.muscleGroup == mg;
      };
      let flMatch = switch (fitnessLevel) {
        case null true;
        case (?fl) e.fitnessLevel == fl;
      };
      mgMatch and flMatch
    }).toArray()
  };

  public func getExerciseById(
    exercises : List.List<ExerciseTypes.Exercise>,
    exerciseId : Common.Id,
  ) : ?ExerciseTypes.Exercise {
    exercises.find(func(e) { e.id == exerciseId })
  };

  public func getRoutines(
    routines : List.List<ExerciseTypes.WorkoutRoutine>,
    fitnessLevel : ?ExerciseTypes.FitnessLevel,
  ) : [ExerciseTypes.WorkoutRoutine] {
    routines.filter(func(r) {
      switch (fitnessLevel) {
        case null true;
        case (?fl) r.fitnessLevel == fl;
      }
    }).toArray()
  };

  public func getRoutineById(
    routines : List.List<ExerciseTypes.WorkoutRoutine>,
    routineId : Common.Id,
  ) : ?ExerciseTypes.WorkoutRoutine {
    routines.find(func(r) { r.id == routineId })
  };

  public func logWorkout(
    workoutLogs : List.List<ExerciseTypes.WorkoutLogEntry>,
    nextId : Nat,
    userId : Common.UserId,
    req : ExerciseTypes.LogWorkoutRequest,
  ) : ExerciseTypes.WorkoutLogEntry {
    let entry : ExerciseTypes.WorkoutLogEntry = {
      id = nextId;
      userId;
      routineName = req.routineName;
      date = Time.now();
      notes = req.notes;
      completed = req.completed;
    };
    workoutLogs.add(entry);
    entry
  };

  public func getWorkoutLogs(
    workoutLogs : List.List<ExerciseTypes.WorkoutLogEntry>,
    userId : Common.UserId,
  ) : [ExerciseTypes.WorkoutLogEntry] {
    workoutLogs.filter(func(e) { e.userId == userId }).toArray()
  };

  // ── Seed data ─────────────────────────────────────────────────────────────

  public func seedExercises(exercises : List.List<ExerciseTypes.Exercise>) {
    let data : [ExerciseTypes.Exercise] = [
      // ── CHEST (5) ───────────────────────────────────────────────────────
      { id = 1; name = "Push-Ups"; muscleGroup = #Chest; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=IODxDxX7oi4";
        description = "Classic bodyweight exercise. Keep core tight, lower chest to floor, push back up. 3 sets of 10-15 reps.";
        reps = ?12; durationSecs = null },
      { id = 2; name = "Incline Dumbbell Press"; muscleGroup = #Chest; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=DbFgADa2PL8";
        description = "Targets upper chest. Set bench to 30-45°, lower dumbbells to chest, press up. 3 sets of 8-12 reps.";
        reps = ?10; durationSecs = null },
      { id = 3; name = "Barbell Bench Press"; muscleGroup = #Chest; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=rT7DgCr-3pg";
        description = "Compound chest builder. Retract shoulder blades, lower bar to mid-chest, drive up explosively. 4 sets of 6-10 reps.";
        reps = ?8; durationSecs = null },
      { id = 4; name = "Cable Fly"; muscleGroup = #Chest; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=Iwe6AmxVf7o";
        description = "Isolation movement. Keep slight elbow bend, squeeze chest at centre. 3 sets of 12-15 reps.";
        reps = ?12; durationSecs = null },
      { id = 5; name = "Dips"; muscleGroup = #Chest; fitnessLevel = #Advanced;
        youtubeUrl = "https://www.youtube.com/watch?v=2z8JmcrW-As";
        description = "Lean forward for chest emphasis. Lower until elbows reach 90°, push through palms. 3 sets of 8-12 reps.";
        reps = ?10; durationSecs = null },

      // ── BACK (5) ────────────────────────────────────────────────────────
      { id = 6; name = "Pull-Ups"; muscleGroup = #Back; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=eGo4IYlbE5g";
        description = "Full hanging pull. Drive elbows to hips, chin above bar. 3 sets of 5-10 reps.";
        reps = ?8; durationSecs = null },
      { id = 7; name = "Lat Pulldown"; muscleGroup = #Back; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=CAwf7n6Luuc";
        description = "Machine lat isolation. Pull bar to upper chest, squeeze lats, control the return. 3 sets of 10-12 reps.";
        reps = ?10; durationSecs = null },
      { id = 8; name = "Bent-Over Barbell Row"; muscleGroup = #Back; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=FWJR5Ve8bnQ";
        description = "Hip-hinge to 45°, pull bar to lower ribcage, lead with elbows. 4 sets of 6-10 reps.";
        reps = ?8; durationSecs = null },
      { id = 9; name = "Single-Arm Dumbbell Row"; muscleGroup = #Back; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=roCP6wCXPqo";
        description = "Support on bench, row dumbbell to hip. Great for correcting imbalances. 3 sets of 10-12 reps each.";
        reps = ?10; durationSecs = null },
      { id = 10; name = "Deadlift"; muscleGroup = #Back; fitnessLevel = #Advanced;
        youtubeUrl = "https://www.youtube.com/watch?v=op9kVnSso6Q";
        description = "King of all lifts. Neutral spine, hip-hinge, drive floor away, lock out hips at top. 4 sets of 4-6 reps.";
        reps = ?5; durationSecs = null },

      // ── LEGS (5) ────────────────────────────────────────────────────────
      { id = 11; name = "Bodyweight Squat"; muscleGroup = #Legs; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=aclHkVaku9U";
        description = "Feet shoulder-width, sit back into hips, keep knees tracking toes. 3 sets of 15-20 reps.";
        reps = ?15; durationSecs = null },
      { id = 12; name = "Barbell Back Squat"; muscleGroup = #Legs; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=1oed-UmAxFs";
        description = "Bar on traps, brace core, squat to parallel or below. 4 sets of 6-10 reps.";
        reps = ?8; durationSecs = null },
      { id = 13; name = "Romanian Deadlift"; muscleGroup = #Legs; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=JCXUYuzwNrM";
        description = "Hamstring-dominant. Push hips back, lower bar to mid-shin, squeeze glutes on return. 3 sets of 8-12 reps.";
        reps = ?10; durationSecs = null },
      { id = 14; name = "Walking Lunges"; muscleGroup = #Legs; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=L8fvypPrzzs";
        description = "Step forward, lower back knee to hover above ground, drive front heel to stand. 3 sets of 12 reps each leg.";
        reps = ?12; durationSecs = null },
      { id = 15; name = "Bulgarian Split Squat"; muscleGroup = #Legs; fitnessLevel = #Advanced;
        youtubeUrl = "https://www.youtube.com/watch?v=2C-uNgKwPLE";
        description = "Rear foot elevated on bench. Lower into deep lunge, drive through front heel. 3 sets of 8 reps each.";
        reps = ?8; durationSecs = null },

      // ── ARMS (4) ────────────────────────────────────────────────────────
      { id = 16; name = "Dumbbell Bicep Curl"; muscleGroup = #Arms; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=ykJmrZ5v0Oo";
        description = "Supinate at top, keep elbows pinned to sides. 3 sets of 10-15 reps.";
        reps = ?12; durationSecs = null },
      { id = 17; name = "Hammer Curl"; muscleGroup = #Arms; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=TwD-YGVP4Bk";
        description = "Neutral grip targets brachialis. Curl dumbbell straight up, control the descent. 3 sets of 10-12 reps.";
        reps = ?10; durationSecs = null },
      { id = 18; name = "Tricep Dips (Bench)"; muscleGroup = #Arms; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=0326dy_-CzM";
        description = "Hands on bench, feet forward. Lower until elbows reach 90°, push back up. 3 sets of 12-15 reps.";
        reps = ?12; durationSecs = null },
      { id = 19; name = "Skull Crushers"; muscleGroup = #Arms; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=d_KZxkY_0cM";
        description = "EZ-bar to forehead. Keep upper arms vertical, lower bar controlled. 3 sets of 10-12 reps.";
        reps = ?10; durationSecs = null },

      // ── CORE (4) ────────────────────────────────────────────────────────
      { id = 20; name = "Plank"; muscleGroup = #Core; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=pSHjTRCQxIw";
        description = "Forearms down, hips neutral, squeeze glutes and abs. Hold 30-60 seconds, 3 sets.";
        reps = null; durationSecs = ?45 },
      { id = 21; name = "Crunches"; muscleGroup = #Core; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=Xyd_fa5zoEU";
        description = "Curl shoulders off mat, exhale at top, lower slowly. 3 sets of 15-20 reps.";
        reps = ?20; durationSecs = null },
      { id = 22; name = "Hanging Leg Raise"; muscleGroup = #Core; fitnessLevel = #Advanced;
        youtubeUrl = "https://www.youtube.com/watch?v=hdng3Nm1x_E";
        description = "Hang from bar, raise legs to 90° or higher, avoid swinging. 3 sets of 10-15 reps.";
        reps = ?12; durationSecs = null },
      { id = 23; name = "Russian Twist"; muscleGroup = #Core; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=wkD8rjkodUI";
        description = "Sit at 45°, feet off ground, rotate torso side to side with weight. 3 sets of 20 reps.";
        reps = ?20; durationSecs = null },

      // ── CARDIO (4) ──────────────────────────────────────────────────────
      { id = 24; name = "Jumping Jacks"; muscleGroup = #Cardio; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=iSSAk4XCsRA";
        description = "Full-body warm-up. Land softly, keep a steady rhythm. 3 sets of 45 seconds.";
        reps = null; durationSecs = ?45 },
      { id = 25; name = "Burpees"; muscleGroup = #Cardio; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=dZgVxmf6jkA";
        description = "Squat, kick back to plank, push-up, jump in, explosive jump. 3 sets of 10-15 reps.";
        reps = ?10; durationSecs = null },
      { id = 26; name = "High Knees"; muscleGroup = #Cardio; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=ZZZoCNMU48U";
        description = "Run in place, drive knees to hip height, pump arms. 3 sets of 30 seconds.";
        reps = null; durationSecs = ?30 },
      { id = 27; name = "Box Jumps"; muscleGroup = #Cardio; fitnessLevel = #Advanced;
        youtubeUrl = "https://www.youtube.com/watch?v=52r_Ul5k03g";
        description = "Explode from squat position onto box, land softly with bent knees. 4 sets of 8 reps.";
        reps = ?8; durationSecs = null },

      // ── FULLBODY (3) ────────────────────────────────────────────────────
      { id = 28; name = "Kettlebell Swing"; muscleGroup = #FullBody; fitnessLevel = #Intermediate;
        youtubeUrl = "https://www.youtube.com/watch?v=YSxHifyI6s8";
        description = "Hip hinge power movement. Drive hips forward, swing KB to shoulder height, hinge back. 4 sets of 15 reps.";
        reps = ?15; durationSecs = null },
      { id = 29; name = "Thruster"; muscleGroup = #FullBody; fitnessLevel = #Advanced;
        youtubeUrl = "https://www.youtube.com/watch?v=ioXhXDZsBmo";
        description = "Front squat into overhead press in one fluid motion. 3 sets of 8-10 reps.";
        reps = ?8; durationSecs = null },
      { id = 30; name = "Mountain Climbers"; muscleGroup = #FullBody; fitnessLevel = #Beginner;
        youtubeUrl = "https://www.youtube.com/watch?v=nmwgirgXLYM";
        description = "High plank position, drive knees to chest alternately in a running motion. 3 sets of 30 seconds.";
        reps = null; durationSecs = ?30 },
    ];
    for (e in data.vals()) {
      exercises.add(e)
    }
  };

  public func seedRoutines(routines : List.List<ExerciseTypes.WorkoutRoutine>) {
    let data : [ExerciseTypes.WorkoutRoutine] = [
      { id = 1; name = "Full Body Beginner";
        exerciseIds = [1, 11, 14, 16, 20, 24];
        fitnessLevel = #Beginner;
        description = "Perfect intro routine. Covers all major muscle groups using bodyweight and light loads. 3x per week." },
      { id = 2; name = "Upper Body Strength";
        exerciseIds = [3, 6, 8, 18, 19, 17];
        fitnessLevel = #Intermediate;
        description = "Focuses on chest, back, and arms. Progressive overload with compound and isolation moves. 2x per week." },
      { id = 3; name = "HIIT Cardio Blast";
        exerciseIds = [24, 25, 26, 27, 28, 30];
        fitnessLevel = #Intermediate;
        description = "High-intensity circuit to torch calories. Minimal rest between exercises. 20-30 minutes total." },
      { id = 4; name = "Core Blast";
        exerciseIds = [20, 21, 22, 23, 30, 25];
        fitnessLevel = #Advanced;
        description = "Comprehensive core workout targeting all abdominal regions. 3-4x per week on non-consecutive days." },
      { id = 5; name = "Leg Day";
        exerciseIds = [11, 12, 13, 14, 15, 27];
        fitnessLevel = #Intermediate;
        description = "Complete lower-body session from quads to hamstrings and glutes. Allow 48h recovery between sessions." },
      { id = 6; name = "Push Pull";
        exerciseIds = [1, 3, 5, 6, 7, 8];
        fitnessLevel = #Intermediate;
        description = "Classic push-pull split. Chest/triceps paired with back/biceps for balanced upper-body development." },
      { id = 7; name = "Beginner Cardio";
        exerciseIds = [24, 26, 30, 11, 14, 20];
        fitnessLevel = #Beginner;
        description = "Low-impact cardio routine to improve endurance and burn fat. Great for newcomers or active recovery." },
    ];
    for (r in data.vals()) {
      routines.add(r)
    }
  };
};
