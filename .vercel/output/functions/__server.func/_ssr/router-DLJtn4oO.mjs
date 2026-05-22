import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-BRnHS-HZ.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.24em] uppercase text-muted-foreground", children: "Draxler" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[15px] text-muted-foreground", children: "Страница не найдена. Возможно, она была перемещена или удалена." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center h-11 px-6 rounded-[2px] bg-primary text-primary-foreground text-[14px] font-medium hover:bg-primary/90 transition-colors",
        children: "На главную"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.24em] uppercase text-muted-foreground", children: "Ошибка" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-foreground", children: "Что-то пошло не так" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[15px] text-muted-foreground", children: "Попробуйте обновить страницу или вернуться на главную." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center h-11 px-6 rounded-[2px] bg-primary text-primary-foreground text-[14px] font-medium hover:bg-primary/90 transition-colors",
          children: "Повторить"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center h-11 px-6 rounded-[2px] bg-muted text-foreground text-[14px] font-medium hover:bg-muted/70 transition-colors",
          children: "На главную"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Draxler — Admin" },
      { name: "description", content: "Админ-панель Draxler — публикация и управление каталогом премиальных дисков." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://rsms.me" },
      { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "ru", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toaster,
      {
        position: "bottom-center",
        toastOptions: {
          unstyled: false,
          classNames: {
            toast: "!bg-background !text-foreground !border !border-border !rounded-[2px] !shadow-elevated !text-[14px] !py-3 !px-4"
          }
        }
      }
    )
  ] });
}
const $$splitComponentImporter$6 = () => import("./login-D2bRq9hE.mjs");
const Route$6 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Вход — Draxler"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("../_app-C79VoJCY.mjs");
const Route$5 = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-D7neywn9.mjs");
const Route$4 = createFileRoute("/_app/")({
  head: () => ({
    meta: [{
      title: "Главный экран — Draxler"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./upload-Cfb4sMqZ.mjs");
const Route$3 = createFileRoute("/_app/upload")({
  head: () => ({
    meta: [{
      title: "Одиночная публикация — Draxler"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./queue-BtxWFhPu.mjs");
const Route$2 = createFileRoute("/_app/queue")({
  head: () => ({
    meta: [{
      title: "Очередь публикаций — Draxler"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./batch-De6PSy1S.mjs");
const Route$1 = createFileRoute("/_app/batch")({
  head: () => ({
    meta: [{
      title: "Пакетная загрузка — Draxler"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./archive-BynGNN4U.mjs");
const Route = createFileRoute("/_app/archive")({
  head: () => ({
    meta: [{
      title: "Архив контента — Draxler"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$7
});
const AppRoute = Route$5.update({
  id: "/_app",
  getParentRoute: () => Route$7
});
const AppIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppUploadRoute = Route$3.update({
  id: "/upload",
  path: "/upload",
  getParentRoute: () => AppRoute
});
const AppQueueRoute = Route$2.update({
  id: "/queue",
  path: "/queue",
  getParentRoute: () => AppRoute
});
const AppBatchRoute = Route$1.update({
  id: "/batch",
  path: "/batch",
  getParentRoute: () => AppRoute
});
const AppArchiveRoute = Route.update({
  id: "/archive",
  path: "/archive",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppArchiveRoute,
  AppBatchRoute,
  AppQueueRoute,
  AppUploadRoute,
  AppIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  LoginRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
