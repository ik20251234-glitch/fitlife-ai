import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useHasProfile } from "../hooks/useProfile";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: hasProfile, isFetched: profileChecked } = useHasProfile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isInitializing = loginStatus === "initializing";

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  useEffect(() => {
    if (isAuthenticated && profileChecked && hasProfile === false) {
      navigate({ to: "/health", search: { onboarding: "true" } });
    }
  }, [isAuthenticated, profileChecked, hasProfile, navigate]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-4 w-40 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close navigation"
        />
      )}

      {/* Sidebar — desktop always visible, mobile slide-over */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 lg:relative lg:flex lg:z-auto transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-border sticky top-0 z-20">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            aria-label="Toggle navigation"
            data-ocid="nav.mobile_menu_button"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <span className="font-display font-bold text-lg text-foreground">
            FitLife <span className="text-primary">AI</span>
          </span>
        </header>

        <main className="flex-1 overflow-auto">{children ?? <Outlet />}</main>
        <footer className="py-3 px-6 text-center border-t border-border bg-muted/40">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
