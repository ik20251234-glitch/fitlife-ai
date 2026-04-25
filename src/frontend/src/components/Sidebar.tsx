import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Dumbbell,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  TrendingUp,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Health", href: "/health", icon: HeartPulse },
  { label: "Diet Plan", href: "/diet", icon: UtensilsCrossed },
  { label: "Exercise Library", href: "/exercise", icon: Dumbbell },
  { label: "Progress", href: "/progress", icon: TrendingUp },
];

export default function Sidebar() {
  const location = useLocation();
  const { clear, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useProfile();

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-card border-r border-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-xl text-foreground">
          FitLife <span className="text-primary">AI</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/dashboard" &&
              location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="px-3 py-4 border-t border-border">
        {isLoading ? (
          <div className="flex items-center gap-3 px-3 py-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {profile?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {profile?.name ?? "FitLife User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {profile?.goal?.replace(/([A-Z])/g, " $1").trim() ??
                  "Set your goal"}
              </p>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
            data-ocid="nav.logout_button"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        )}
      </div>
    </aside>
  );
}
