export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-bold">
            MAS <span className="text-primary">LOGISTICS</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Mountain All Service ehf. • Purchasing & Freight
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mountain All Service ehf. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
