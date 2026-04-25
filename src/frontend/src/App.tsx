import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

// Lazy-loaded pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const HealthPage = lazy(() => import("./pages/HealthPage"));
const DietPage = lazy(() => import("./pages/DietPage"));
const ExercisePage = lazy(() => import("./pages/ExercisePage"));
const ProgressPage = lazy(() => import("./pages/ProgressPage"));

const PageSkeleton = () => (
  <div className="p-8 space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-48" />
    <div className="grid grid-cols-3 gap-4 mt-8">
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
    </div>
  </div>
);

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <Outlet />
    </Suspense>
  ),
});

// Public login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Protected layout route
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const healthRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/health",
  component: HealthPage,
  validateSearch: (search: Record<string, unknown>) => ({
    onboarding: search.onboarding as string | undefined,
  }),
});

const dietRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/diet",
  component: DietPage,
});

const exerciseRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/exercise",
  component: ExercisePage,
});

const progressRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/progress",
  component: ProgressPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  layoutRoute.addChildren([
    indexRoute,
    dashboardRoute,
    healthRoute,
    dietRoute,
    exerciseRoute,
    progressRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
