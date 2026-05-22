import React from 'react';
import { ShieldCheck, Settings, LogOut } from 'lucide-react';

export interface UserIdentityProps {
  name: string;
  email: string;
  isAdmin?: boolean;
  adminHref?: string;
  logoutHref?: string;
  translations?: {
    adminTitle?: string;
    logoutTitle?: string;
  };
  LinkComponent?: React.ComponentType<any>;
}

/**
 * 👤 UserIdentity
 * Presentation component for rendering user profile status and session controls.
 * Keep it pure, stateless, and style-compliant.
 */
export function UserIdentity({
  name,
  email,
  isAdmin = false,
  adminHref = '/admin',
  logoutHref = '/api/auth/logout',
  translations,
  LinkComponent
}: UserIdentityProps) {
  const adminTitle = translations?.adminTitle || 'Admin Console';
  const logoutTitle = translations?.logoutTitle || 'Logout';

  // Fallback to native 'a' if LinkComponent is not supplied
  const Link = LinkComponent || 'a';

  return (
    <div className="flex items-center gap-4 p-1 pl-4 bg-card border border-border rounded-md backdrop-blur-sm group transition-all hover:border-primary/20">
      <div className="flex flex-col items-end gap-0.5 py-1">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground font-bold">
          {name}
        </span>
        <div className="flex items-center gap-1.5">
          {isAdmin && <ShieldCheck className="w-3 h-3 text-primary/60" />}
          <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-muted-foreground/60">
            {email}
          </span>
        </div>
      </div>

      <div className="h-8 w-[1px] bg-border mx-1" />

      <div className="flex items-center">
        {isAdmin && (
          <Link 
            href={adminHref} 
            className="p-2 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors border-r border-border"
            title={adminTitle}
          >
            <Settings className="w-4 h-4" />
          </Link>
        )}
        
        <Link 
          href={logoutHref} 
          className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
          title={logoutTitle}
        >
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
