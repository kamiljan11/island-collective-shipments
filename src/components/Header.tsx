import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "SERVICES", href: "/#services" },
  { label: "GROUP ORDERS", href: "/group-orders", isRoute: true },
  { label: "WHY MAS", href: "/#solution" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav */}
      <nav className="bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight">
              MAS <span className="text-primary">LOGISTICS</span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
              Purchasing & Freight
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to="/group-orders"
                  className="text-xs font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="/#quote"
              className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-xs font-semibold tracking-wider hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              📋 QUOTE
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-background border-b border-border px-6 pb-4 space-y-3">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to="/group-orders"
                  className="block text-xs font-medium tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-xs font-medium tracking-wider text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="/#quote"
              className="block bg-primary text-primary-foreground px-5 py-2 rounded-md text-xs font-semibold tracking-wider text-center"
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
