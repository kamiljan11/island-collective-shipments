import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold">
            MAS <span className="text-primary">Logistics</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Njarðarbraut 3i, 260 Njarðvík · mountainallservice@gmail.com
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mountain All Service ehf · KT: 690725-0450 {/* [ukryte 2026-07-21] · built by{" "}
          <a
            href="https://kamiljan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Kamil Jan
          </a> */}
        </p>
      </div>
    </footer>
  );
}
