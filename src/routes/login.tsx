import * as React from "react";
import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/store/auth.store";
import { FloatingLabelInput } from "@/components/primitives/FloatingLabelInput";
import { dur, easeOut } from "@/lib/motion";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Вход — Draxler" }] }),
  component: LoginPage,
});

function LoginPage() {
  const login = useAuth((s) => s.login);
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const [loginValue, setLoginValue] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [shake, setShake] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (user && path === "/login") navigate({ to: "/" });
  }, [user, path, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = login(loginValue.trim(), password);
    if (!ok) {
      setSubmitting(false);
      setShake((n) => n + 1);
      toast.error("Неверный логин или пароль");
      return;
    }
    setTimeout(() => navigate({ to: "/" }), 220);
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-5">
      <motion.div
        key={shake}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          x: shake ? [0, -6, 6, -4, 4, 0] : 0,
        }}
        transition={{ duration: dur.base, ease: easeOut }}
        className="w-full max-w-[380px]"
      >
        <div className="mb-10 text-center">
          <div className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
            Admin Panel
          </div>
          <div className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-foreground">
            Draxler
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-7">
          <FloatingLabelInput
            label="Логин"
            autoComplete="username"
            autoCapitalize="off"
            spellCheck={false}
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
          />
          <FloatingLabelInput
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 rounded-[2px] bg-primary text-primary-foreground text-[14px] font-medium tracking-[0.02em] hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            Войти
          </button>
        </form>
        <div className="mt-10 text-center text-[12px] text-muted-foreground">
          Доступ предоставляется администратором
        </div>
      </motion.div>
    </div>
  );
}
