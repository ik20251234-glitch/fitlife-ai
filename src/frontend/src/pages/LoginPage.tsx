import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Dumbbell, Shield, TrendingUp, Utensils, Zap } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  { icon: TrendingUp, label: "Health Analytics", desc: "BMI & BMR tracking" },
  { icon: Utensils, label: "Diet Management", desc: "Personalized meal plans" },
  { icon: Dumbbell, label: "Exercise Library", desc: "Video-guided workouts" },
  { icon: Shield, label: "Progress Reports", desc: "Weekly visualizations" },
];

export default function LoginPage() {
  const { login, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col lg:flex-row"
      data-ocid="login.page"
    >
      {/* Left panel — branding */}
      <div className="lg:w-1/2 bg-card border-r border-border flex flex-col justify-center px-8 py-16 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">
              FitLife <span className="text-primary">AI</span>
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl text-foreground mb-4 leading-tight">
            Your personal <span className="text-primary">fitness</span> journey
            starts here
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            Track nutrition, exercise, and health metrics in one intelligent
            dashboard — powered by real physiological data.
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-4">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.label}
                  className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {feat.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right panel — login */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center px-8 py-16 bg-background">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
              Sign in to your account
            </h2>
            <p className="text-muted-foreground text-sm">
              Authenticate securely with Internet Identity — no passwords
              required.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 shadow-md">
            <Button
              className="w-full h-12 text-base font-semibold gap-2"
              onClick={login}
              disabled={isInitializing || isLoggingIn}
              data-ocid="login.submit_button"
            >
              {isInitializing
                ? "Initializing..."
                : isLoggingIn
                  ? "Opening login..."
                  : "Sign in with Internet Identity"}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Internet Identity is a secure, anonymous authentication system
                for the Internet Computer. Your data stays private and under
                your control.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 justify-center text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>End-to-end encrypted · No passwords · Decentralized</span>
          </div>
        </div>
      </div>
    </div>
  );
}
