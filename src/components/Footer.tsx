export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-black text-sm">
            MAS LOGISTICS
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Njarðarbraut 3i, 260 Njarðvík
          </p>
          <p className="text-xs text-muted-foreground">
            mountainallservice@gmail.com
          </p>
        </div>
        <p className="text-xs text-muted-foreground tracking-wider">
          © {new Date().getFullYear()} MOUNTAIN ALL SERVICE EHF | KT: 690725-0450 | VSK: 158052
        </p>
      </div>
    </footer>
  );
}
