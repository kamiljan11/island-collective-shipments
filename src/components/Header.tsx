import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Solution", href: "/#solution" },
  { label: "Industries", href: "/#industries" },
  { label: "Consolidation", href: "/#consolidation" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Group Orders", href: "/group-orders" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top banner */}
      <div className="bg-primary/10 border-b border-primary/20 py-1.5 px-4 text-center text-xs font-mono tracking-wider">
        <span className="text-primary">●</span>{" "}
        <span className="text-muted-foreground">B2B SUPPLY LINE:</span>{" "}
        <span className="text-primary font-semibold underline">
          NEXT CONSOLIDATION DEPARTS IN 14 DAYS
        </span>{" "}
        <span className="text-muted-foreground">(PL HUB)</span>
      </div>

      {/* Main nav */}
      <nav className="bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              MAS <span className="text-primary">LOGISTICS</span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
              Purchasing & Freight
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.href.startsWith("/group") ? (
                <Link
                  key={item.label}
                  to="/group-orders"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="/#quote"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              📋 QUOTE
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
            {navItems.map((item) =>
              item.href.startsWith("/group") ? (
                <Link
                  key={item.label}
                  to="/group-orders"
                  className="block text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="/#quote"
              className="block bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium text-center"
              onClick={() => setMobileOpen(false)}
            >
              📋 QUOTE
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
