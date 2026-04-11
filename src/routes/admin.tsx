import { createFileRoute, Outlet, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — MAS Logistics" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginRoute = location.pathname === "/admin/login";
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoginRoute) {
      return;
    }

    let isMounted = true;

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          if (isMounted) {
            setChecking(false);
            void navigate({ to: "/admin/login" });
          }
          return;
        }

        if (!isMounted) return;
        setUser(session.user);

        const { data: hasAdmin, error } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });

        if (error || !hasAdmin) {
          await supabase.auth.signOut();

          if (isMounted) {
            setIsAdmin(false);
            setChecking(false);
            void navigate({ to: "/admin/login" });
          }
          return;
        }

        if (isMounted) {
          setIsAdmin(true);
          setChecking(false);
        }
      } catch {
        if (isMounted) {
          setIsAdmin(false);
          setChecking(false);
          void navigate({ to: "/admin/login" });
        }
      }
    };

    void checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && isMounted) {
        setIsAdmin(false);
        setChecking(false);
        void navigate({ to: "/admin/login" });
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isLoginRoute, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (isLoginRoute) {
    return <Outlet />;
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const navItems = [
    { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/campaigns" as const, label: "Campaigns", icon: Package },
    { to: "/admin/orders" as const, label: "Orders", icon: ShoppingCart },
    { to: "/admin/quotes" as const, label: "Quotes", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card border border-border rounded-md p-2"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-black tracking-tight">
            MAS <span className="text-primary">ADMIN</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              activeOptions={{ exact: item.exact }}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-secondary" }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary w-full transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-0 min-h-screen">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
