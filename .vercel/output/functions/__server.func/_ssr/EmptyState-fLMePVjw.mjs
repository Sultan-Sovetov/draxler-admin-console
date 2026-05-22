import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function EmptyState({ title, description, action, icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center py-16 md:py-24", children: [
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 w-12 h-12 rounded-full bg-muted text-muted-foreground inline-flex items-center justify-center", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[18px] font-semibold text-foreground", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-sm text-[14px] text-muted-foreground", children: description }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: action })
  ] });
}
export {
  EmptyState as E
};
