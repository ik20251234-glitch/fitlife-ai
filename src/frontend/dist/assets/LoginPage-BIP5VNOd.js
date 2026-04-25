import { c as createLucideIcon, u as useInternetIdentity, a as useNavigate, r as reactExports, j as jsxRuntimeExports, Z as Zap, T as TrendingUp, D as Dumbbell, B as Button } from "./index-CSO-tJT7.js";
import { U as Utensils } from "./utensils-C-C-F5CI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const FEATURES = [
  { icon: TrendingUp, label: "Health Analytics", desc: "BMI & BMR tracking" },
  { icon: Utensils, label: "Diet Management", desc: "Personalized meal plans" },
  { icon: Dumbbell, label: "Exercise Library", desc: "Video-guided workouts" },
  { icon: Shield, label: "Progress Reports", desc: "Weekly visualizations" }
];
function LoginPage() {
  const { login, isAuthenticated, isInitializing, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col lg:flex-row",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:w-1/2 bg-card border-r border-border flex flex-col justify-center px-8 py-16 lg:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-2xl text-foreground", children: [
              "FitLife ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "AI" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl text-foreground mb-4 leading-tight", children: [
            "Your personal ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "fitness" }),
            " journey starts here"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-10", children: "Track nutrition, exercise, and health metrics in one intelligent dashboard — powered by real physiological data." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: FEATURES.map((feat) => {
            const Icon = feat.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: feat.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: feat.desc })
                  ] })
                ]
              },
              feat.label
            );
          }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:w-1/2 flex flex-col items-center justify-center px-8 py-16 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Sign in to your account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Authenticate securely with Internet Identity — no passwords required." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-8 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full h-12 text-base font-semibold gap-2",
                onClick: login,
                disabled: isInitializing || isLoggingIn,
                "data-ocid": "login.submit_button",
                children: isInitializing ? "Initializing..." : isLoggingIn ? "Opening login..." : "Sign in with Internet Identity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Internet Identity is a secure, anonymous authentication system for the Internet Computer. Your data stays private and under your control." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-2 justify-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "End-to-end encrypted · No passwords · Decentralized" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  LoginPage as default
};
