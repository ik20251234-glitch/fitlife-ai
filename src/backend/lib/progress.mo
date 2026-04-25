import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Common "../types/common";
import ProgressTypes "../types/progress";

module {
  // ---------------------------------------------------------------------------
  // Date helpers — represent dates as YYYY-MM-DD Text strings.
  // The Internet Computer does not provide a date library, so we compute
  // calendar dates from epoch nanoseconds using the proleptic Gregorian rules.
  // ---------------------------------------------------------------------------

  /// Convert nanosecond epoch timestamp to "YYYY-MM-DD" string.
  public func timestampToDate(ns : Int) : Text {
    let secondsTotal : Int = ns / 1_000_000_000;
    let days : Int = secondsTotal / 86_400;
    // Gregorian calendar algorithm (days since 1970-01-01)
    let z : Int = days + 719_468;
    let era : Int = (if (z >= 0) z else z - 146_096) / 146_097;
    let doe : Int = z - era * 146_097;
    let yoe : Int = (doe - doe / 1_460 + doe / 36_524 - doe / 146_096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let d : Int = doy - (153 * mp + 2) / 5 + 1;
    let m : Int = if (mp < 10) mp + 3 else mp - 9;
    let yr : Int = if (m <= 2) y + 1 else y;
    yr.toText() # "-" # padTwo(m.toNat()) # "-" # padTwo(d.toNat())
  };

  func padTwo(n : Nat) : Text {
    if (n < 10) "0" # n.toText() else n.toText()
  };

  /// Return today's date string using the current canister time.
  func today() : Text {
    timestampToDate(Time.now())
  };

  /// Subtract `days` calendar days from a YYYY-MM-DD date string.
  /// Returns YYYY-MM-DD for (date - days).
  func subtractDays(date : Text, days : Nat) : Text {
    switch (parseDate(date)) {
      case null date;
      case (?(y, m, d)) {
        let epochDays : Int = dateToDays(y, m, d) - days.toInt();
        daysToDate(epochDays);
      };
    }
  };

  /// Parse a YYYY-MM-DD string into (year, month, day) tuple.
  func parseDate(date : Text) : ?(Int, Int, Int) {
    let parts = date.split(#char '-');
    var arr : [Text] = [];
    for (p in parts) { arr := arr.concat([p]) };
    if (arr.size() != 3) return null;
    switch (Int.fromText(arr[0]), Int.fromText(arr[1]), Int.fromText(arr[2])) {
      case (?y, ?m, ?d) ?(y, m, d);
      case _ null;
    }
  };

  /// Days since Unix epoch for a Gregorian calendar date.
  func dateToDays(y : Int, m : Int, d : Int) : Int {
    let yr = if (m <= 2) y - 1 else y;
    let era = (if (yr >= 0) yr else yr - 399) / 400;
    let yoe = yr - era * 400;
    let doy = (153 * (if (m > 2) m - 3 else m + 9) + 2) / 5 + d - 1;
    let doe = yoe * 365 + yoe / 4 - yoe / 100 + doy;
    era * 146_097 + doe - 719_468
  };

  /// Convert days-since-Unix-epoch back to YYYY-MM-DD string.
  func daysToDate(days : Int) : Text {
    let z : Int = days + 719_468;
    let era : Int = (if (z >= 0) z else z - 146_096) / 146_097;
    let doe : Int = z - era * 146_097;
    let yoe : Int = (doe - doe / 1_460 + doe / 36_524 - doe / 146_096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let d : Int = doy - (153 * mp + 2) / 5 + 1;
    let m : Int = if (mp < 10) mp + 3 else mp - 9;
    let yr : Int = if (m <= 2) y + 1 else y;
    yr.toText() # "-" # padTwo(m.toNat()) # "-" # padTwo(d.toNat())
  };

  // ---------------------------------------------------------------------------
  // Core functions
  // ---------------------------------------------------------------------------

  /// Record (or update) a daily progress entry for `userId` on today's date.
  /// If an entry already exists for the same user+date, it is replaced (dedup).
  public func recordProgress(
    records : List.List<ProgressTypes.ProgressRecord>,
    nextId : Nat,
    userId : Common.UserId,
    bmi : Float,
    weightKg : Float,
    dailyCalories : Nat,
    workoutsCompleted : Nat,
  ) : ProgressTypes.ProgressRecord {
    let dateStr = today();
    // Check for existing entry for this user on this date
    let existing = records.find(func(r : ProgressTypes.ProgressRecord) : Bool {
      Principal.equal(r.userId, userId) and r.date == dateStr
    });
    switch (existing) {
      case (?old) {
        // Update in place
        let updated : ProgressTypes.ProgressRecord = {
          id = old.id;
          userId = userId;
          date = dateStr;
          bmi = bmi;
          weightKg = weightKg;
          dailyCalories = dailyCalories;
          workoutsCompleted = workoutsCompleted;
        };
        records.mapInPlace(func(r : ProgressTypes.ProgressRecord) : ProgressTypes.ProgressRecord {
          if (r.id == old.id) updated else r
        });
        updated;
      };
      case null {
        let newRecord : ProgressTypes.ProgressRecord = {
          id = nextId;
          userId = userId;
          date = dateStr;
          bmi = bmi;
          weightKg = weightKg;
          dailyCalories = dailyCalories;
          workoutsCompleted = workoutsCompleted;
        };
        records.add(newRecord);
        newRecord;
      };
    }
  };

  /// Return all progress records for `userId`, sorted by date ascending.
  public func getProgressHistory(
    records : List.List<ProgressTypes.ProgressRecord>,
    userId : Common.UserId,
  ) : [ProgressTypes.ProgressRecord] {
    let userRecords = records.filter(func(r : ProgressTypes.ProgressRecord) : Bool {
      Principal.equal(r.userId, userId)
    });
    let arr = userRecords.toArray();
    arr.sort(func(a : ProgressTypes.ProgressRecord, b : ProgressTypes.ProgressRecord) : {#less; #equal; #greater} {
      Text.compare(a.date, b.date)
    })
  };

  /// Compute weekly stats (last 7 days) for `userId`.
  public func getWeeklyStats(
    records : List.List<ProgressTypes.ProgressRecord>,
    userId : Common.UserId,
  ) : ?ProgressTypes.WeeklyStats {
    let todayStr = today();
    let weekStartStr = subtractDays(todayStr, 6); // 7-day window inclusive

    // Collect last-7-days records for this user
    let window = records.filter(func(r : ProgressTypes.ProgressRecord) : Bool {
      Principal.equal(r.userId, userId) and
      r.date >= weekStartStr and r.date <= todayStr
    });

    let windowArr = window.toArray();
    let count = windowArr.size();

    if (count == 0) return null;

    var totalBMI : Float = 0.0;
    var totalWorkouts : Nat = 0;
    var totalCalories : Float = 0.0;

    for (r in windowArr.values()) {
      totalBMI += r.bmi;
      totalWorkouts += r.workoutsCompleted;
      totalCalories += r.dailyCalories.toFloat();
    };

    let countF : Float = count.toFloat();
    let averageBMI : Float = totalBMI / countF;
    let averageDailyCalories : Float = totalCalories / countF;

    // Streak: count consecutive days ending today that have at least 1 activity
    let streak = computeStreak(records, userId, todayStr);

    ?{
      weekStartDate = weekStartStr;
      averageBMI = averageBMI;
      totalWorkouts = totalWorkouts;
      averageDailyCalories = averageDailyCalories;
      streak = streak;
    }
  };

  /// Count consecutive days ending on `fromDate` (inclusive) where the user
  /// logged at least 1 workout or any calorie entry.
  func computeStreak(
    records : List.List<ProgressTypes.ProgressRecord>,
    userId : Common.UserId,
    fromDate : Text,
  ) : Nat {
    var streak : Nat = 0;
    var checkDate = fromDate;
    var keepGoing = true;
    // Guard: max 365 iterations
    var iterations : Nat = 0;
    while (keepGoing and iterations < 365) {
      iterations += 1;
      let hasEntry = records.any(func(r : ProgressTypes.ProgressRecord) : Bool {
        Principal.equal(r.userId, userId) and
        r.date == checkDate and
        (r.workoutsCompleted > 0 or r.dailyCalories > 0)
      });
      if (hasEntry) {
        streak += 1;
        checkDate := subtractDays(checkDate, 1);
      } else {
        keepGoing := false;
      };
    };
    streak
  };

  /// Return the most recent `limitDays` days of progress for `userId`,
  /// sorted by date ascending.
  public func getRecentProgress(
    records : List.List<ProgressTypes.ProgressRecord>,
    userId : Common.UserId,
    limitDays : Nat,
  ) : [ProgressTypes.ProgressRecord] {
    let todayStr = today();
    let startStr = subtractDays(todayStr, if (limitDays > 0) limitDays - 1 else 0);

    let window = records.filter(func(r : ProgressTypes.ProgressRecord) : Bool {
      Principal.equal(r.userId, userId) and
      r.date >= startStr and r.date <= todayStr
    });
    let arr = window.toArray();
    arr.sort(func(a : ProgressTypes.ProgressRecord, b : ProgressTypes.ProgressRecord) : {#less; #equal; #greater} {
      Text.compare(a.date, b.date)
    })
  };
};
