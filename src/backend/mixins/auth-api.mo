import Runtime "mo:core/Runtime";
import List "mo:core/List";
import AuthTypes "../types/auth";
import AuthLib "../lib/auth";

mixin (users : List.List<AuthTypes.UserProfile>) {
  public shared ({ caller }) func getMyProfile() : async ?AuthTypes.UserProfilePublic {
    AuthLib.getProfile(users, caller);
  };

  public shared ({ caller }) func createMyProfile(
    req : AuthTypes.CreateProfileRequest
  ) : async AuthTypes.UserProfilePublic {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous principal not allowed");
    };
    AuthLib.createProfile(users, caller, req);
  };

  public shared ({ caller }) func updateMyProfile(
    req : AuthTypes.UpdateProfileRequest
  ) : async ?AuthTypes.UserProfilePublic {
    AuthLib.updateProfile(users, caller, req);
  };

  public shared query ({ caller }) func hasProfile() : async Bool {
    AuthLib.profileExists(users, caller);
  };
};
