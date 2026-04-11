const brands = [
  "WÜRTH", "BOSCH PROFESSIONAL", "HILTI", "MAKITA", "MILWAUKEE",
  "DEWALT", "SIEMENS", "ABB", "DANFOSS", "MAN TRUCK",
  "SCANIA", "IKEA BUSINESS", "CISCO", "DELL", "HP",
];

export function BrandMarquee() {
  return (
    <div className="border-y border-border py-6 overflow-hidden bg-secondary/30">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...brands, ...brands].map((brand, i) => (
          <span
            key={i}
            className="mx-8 text-lg font-bold tracking-wider text-muted-foreground/50"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
