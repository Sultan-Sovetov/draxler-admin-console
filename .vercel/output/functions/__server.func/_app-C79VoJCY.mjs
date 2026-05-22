import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { d as useNavigate, O as Outlet, e as useRouterState, L as Link } from "./_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./_ssr/auth.store-CgNwkmlF.mjs";
import { c as cn, s as spring } from "./_ssr/motion-BPr3pHv4.mjs";
import { L as LayoutGrid, C as CloudUpload, a as Layers, b as ListOrdered, A as Archive, c as LogOut } from "./_libs/lucide-react.mjs";
import { m as motion } from "./_libs/framer-motion.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/zustand.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/motion-dom.mjs";
import "./_libs/motion-utils.mjs";
const NAV_ITEMS = [
  { to: "/", label: "Главная", icon: LayoutGrid, exact: true },
  { to: "/upload", label: "Загрузка", icon: CloudUpload },
  { to: "/batch", label: "Пакет", icon: Layers },
  { to: "/queue", label: "Очередь", icon: ListOrdered },
  { to: "/archive", label: "Архив", icon: Archive }
];
function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const isActive = (to, exact) => exact ? path === to : path === to || path.startsWith(`${to}/`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex fixed inset-y-0 left-0 w-[240px] flex-col bg-sidebar border-r border-border z-40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-7 pt-9 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[20px] font-semibold tracking-[-0.02em] text-foreground", children: "Draxler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] tracking-[0.24em] uppercase text-muted-foreground", children: "Admin" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-4 space-y-0.5", children: NAV_ITEMS.map((item) => {
      const active = isActive(item.to, item.exact);
      const Icon = item.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          className: cn(
            "group flex items-center gap-3 px-3 h-11 rounded-[2px] text-[14px] transition-colors",
            active ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-[17px] h-[17px]", strokeWidth: 1.75 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-3 py-3 rounded-[2px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium text-foreground truncate", children: user?.name ?? "Гость" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "Администратор" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: logout,
          "aria-label": "Выйти",
          className: "w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center justify-center transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4", strokeWidth: 1.75 })
        }
      )
    ] }) })
  ] });
}
function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to, exact) => exact ? path === to : path === to || path.startsWith(`${to}/`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border pb-[env(safe-area-inset-bottom)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-5", children: NAV_ITEMS.map((item) => {
    const active = isActive(item.to, item.exact);
    const Icon = item.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: item.to,
        className: cn(
          "relative flex flex-col items-center justify-center gap-1 min-h-[58px] py-2 transition-colors",
          active ? "text-foreground" : "text-muted-foreground"
        ),
        children: [
          active && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              layoutId: "bottomnav-indicator",
              transition: spring,
              className: "absolute top-0 h-[2px] w-8 bg-foreground rounded-full"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-[19px] h-[19px]", strokeWidth: 1.75 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] tracking-wide", children: item.label })
        ]
      }
    ) }, item.to);
  }) }) });
}
function AppShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen w-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "lg:pl-[240px] pb-[80px] lg:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-8 md:py-12", children }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
function AppLayout() {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setHydrated(true);
  }, []);
  reactExports.useEffect(() => {
    if (hydrated && !user) {
      navigate({
        to: "/login"
      });
    }
  }, [hydrated, user, navigate]);
  if (!hydrated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background" });
  }
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
export {
  AppLayout as component
};
