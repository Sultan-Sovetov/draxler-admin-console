import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth } from "./auth.store-CgNwkmlF.mjs";
import { e as easeOut, d as dur, c as cn } from "./motion-BPr3pHv4.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const FloatingLabelInput = reactExports.forwardRef(
  ({ label, error, className, value, defaultValue, id, ...props }, ref) => {
    const reactId = reactExports.useId();
    const inputId = id ?? reactId;
    const [isFocused, setIsFocused] = reactExports.useState(false);
    const [internalValue, setInternalValue] = reactExports.useState(defaultValue ?? "");
    const v = value !== void 0 ? value : internalValue;
    const filled = String(v ?? "").length > 0;
    const floated = isFocused || filled;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref,
          id: inputId,
          value,
          defaultValue,
          onFocus: (e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          },
          onBlur: (e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          },
          onChange: (e) => {
            if (value === void 0) setInternalValue(e.target.value);
            props.onChange?.(e);
          },
          className: cn(
            "peer w-full bg-transparent text-[15px] text-foreground pt-6 pb-2 px-0 outline-none",
            "border-0 border-b transition-colors",
            error ? "border-destructive" : "border-border focus:border-foreground",
            className
          ),
          ...props
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: inputId,
          className: cn(
            "absolute left-0 pointer-events-none transition-all duration-200 text-muted-foreground",
            floated ? "top-1 text-[11px] tracking-wider uppercase" : "top-5 text-[15px]"
          ),
          children: label
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[12px] text-destructive", children: error })
    ] });
  }
);
FloatingLabelInput.displayName = "FloatingLabelInput";
function LoginPage() {
  const login = useAuth((s) => s.login);
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  const [loginValue, setLoginValue] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [shake, setShake] = reactExports.useState(0);
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (user && path === "/login") navigate({
      to: "/"
    });
  }, [user, path, navigate]);
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = login(loginValue.trim(), password);
    if (!ok) {
      setSubmitting(false);
      setShake((n) => n + 1);
      toast.error("Неверный логин или пароль");
      return;
    }
    setTimeout(() => navigate({
      to: "/"
    }), 220);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen w-full bg-background flex items-center justify-center px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0,
    x: shake ? [0, -6, 6, -4, 4, 0] : 0
  }, transition: {
    duration: dur.base,
    ease: easeOut
  }, className: "w-full max-w-[380px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.32em] uppercase text-muted-foreground", children: "Admin Panel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[28px] font-semibold tracking-[-0.02em] text-foreground", children: "Draxler" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingLabelInput, { label: "Логин", autoComplete: "username", autoCapitalize: "off", spellCheck: false, value: loginValue, onChange: (e) => setLoginValue(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingLabelInput, { label: "Пароль", type: "password", autoComplete: "current-password", value: password, onChange: (e) => setPassword(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "w-full h-12 rounded-[2px] bg-primary text-primary-foreground text-[14px] font-medium tracking-[0.02em] hover:bg-primary/90 disabled:opacity-60 transition-colors", children: "Войти" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center text-[12px] text-muted-foreground", children: "Доступ предоставляется администратором" })
  ] }, shake) });
}
export {
  LoginPage as component
};
