import * as React from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <Sidebar />
      <main className="lg:pl-[240px] pb-[80px] lg:pb-0">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-8 md:py-12">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
