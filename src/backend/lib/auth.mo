import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Common "../types/common";
import AuthTypes "../types/auth";

module {
  public func toPublic(profile : AuthTypes.UserProfile) : AuthTypes.UserProfilePublic {
    {
      id = profile.id;
      name = profile.name;
      age = profile.age;
      heightCm = profile.heightCm;
      weightKg = profile.weightKg;
      gender = profile.gender;
      goal = profile.goal;
      dietaryPreference = profile.dietaryPreference;
      activityLevel = profile.activityLevel;
      createdAt = profile.createdAt;
    };
  };

  public func profileExists(
    users : List.List<AuthTypes.UserProfile>,
    userId : Common.UserId,
  ) : Bool {
    switch (users.find(func(u : AuthTypes.UserProfile) : Bool { u.id == userId })) {
      case (?_) true;
      case null false;
    };
  };

  public func getProfile(
    users : List.List<AuthTypes.UserProfile>,
    userId : Common.UserId,
  ) : ?AuthTypes.UserProfilePublic {
    switch (users.find(func(u : AuthTypes.UserProfile) : Bool { u.id == userId })) {
      case (?profile) ?toPublic(profile);
      case null null;
    };
  };

  public func createProfile(
    users : List.List<AuthTypes.UserProfile>,
    userId : Common.UserId,
    req : AuthTypes.CreateProfileRequest,
  ) : AuthTypes.UserProfilePublic {
    // Validate inputs
    if (req.age < 1 or req.age > 120) {
      Runtime.trap("Age must be between 1 and 120");
    };
    if (req.heightCm < 50.0 or req.heightCm > 300.0) {
      Runtime.trap("Height must be between 50 and 300 cm");
    };
    if (req.weightKg < 20.0 or req.weightKg > 500.0) {
      Runtime.trap("Weight must be between 20 and 500 kg");
    };
    if (profileExists(users, userId)) {
      Runtime.trap("Profile already exists");
    };

    let profile : AuthTypes.UserProfile = {
      id = userId;
      var name = req.name;
      var age = req.age;
      var heightCm = req.heightCm;
      var weightKg = req.weightKg;
      var gender = req.gender;
      var goal = req.goal;
      var dietaryPreference = req.dietaryPreference;
      var activityLevel = req.activityLevel;
      createdAt = Time.now();
    };
    users.add(profile);
    toPublic(profile);
  };

  public func updateProfile(
    users : List.List<AuthTypes.UserProfile>,
    userId : Common.UserId,
    req : AuthTypes.UpdateProfileRequest,
  ) : ?AuthTypes.UserProfilePublic {
    switch (users.find(func(u : AuthTypes.UserProfile) : Bool { u.id == userId })) {
      case null null;
      case (?profile) {
        switch (req.name) {
          case (?n) { profile.name := n };
          case null {};
        };
        switch (req.age) {
          case (?a) {
            if (a < 1 or a > 120) Runtime.trap("Age must be between 1 and 120");
            profile.age := a;
          };
          case null {};
        };
        switch (req.heightCm) {
          case (?h) {
            if (h < 50.0 or h > 300.0) Runtime.trap("Height must be between 50 and 300 cm");
            profile.heightCm := h;
          };
          case null {};
        };
        switch (req.weightKg) {
          case (?w) {
            if (w < 20.0 or w > 500.0) Runtime.trap("Weight must be between 20 and 500 kg");
            profile.weightKg := w;
          };
          case null {};
        };
        switch (req.gender) {
          case (?g) { profile.gender := g };
          case null {};
        };
        switch (req.goal) {
          case (?g) { profile.goal := g };
          case null {};
        };
        switch (req.dietaryPreference) {
          case (?d) { profile.dietaryPreference := d };
          case null {};
        };
        switch (req.activityLevel) {
          case (?al) { profile.activityLevel := al };
          case null {};
        };
        ?toPublic(profile);
      };
    };
  };
};
