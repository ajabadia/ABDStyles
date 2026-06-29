import React from "react";
import { LogIn } from "lucide-react";

export interface SubtleLoginButtonProps {
  href: string;
  label: string;
  hint?: string;
}

export function SubtleLoginButton({
  href,
  label,
  hint,
}: SubtleLoginButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <a
        href={href}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 rounded-lg"
      >
        <LogIn className="w-3.5 h-3.5" />
        {label}
      </a>
      {hint && (
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/50">
          {hint}
        </span>
      )}
    </div>
  );
}
