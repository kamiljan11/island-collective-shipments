import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, TrendingDown, Users, Package } from "lucide-react";

export const Route = createFileRoute("/shared-pallet")({
  head: () => ({
    meta: [
      { title: "Shared Pallet — Split a Pallet, Share the Savings | MAS Logistics" },
      { name: "description", content: "Buy cube slots on a shared pallet from Europe to Iceland. The more people join, the cheaper shipping gets for everyone." },
      { property: "og:title", content: "Shared Pallet — MAS Logistics" },
      { property: "og:description", content: "Buy cube slots on a shared pallet. More people = lower price for everyone." },
    ],
  }),
  component: SharedPalletPage,
});

const TOTAL_CUBES = 24;

/* ── Isometric pallet drawn with 2-D offsets (no CSS 3D) ── */
function PalletVisualization({ hoveredCubes, onCubeClick }: { hoveredCubes: number; onCubeClick: (n: number) => void }) {
  // 4 layers × 6 cubes (3 cols × 2 rows)
  const cubeW = 56;
  const cubeH = 32; // isometric height for top face
  const cubeD = 22; // depth of side faces
  const gapX = 4;
  const gapY = 4;
  const layerLift = 28; // vertical lift per layer

  // compute total size for centering
  const totalW = 3 * cubeW + 2 * gapX;
  const totalH = 2 * cubeH + gapY + 3 * layerLift + cubeD + 8;

  return (
    <div className="flex justify-center mb-6">
      <div className="relative" style={{ width: totalW, height: totalH }}>
        {/* Pallet base shadow */}
        <div
          className="absolute rounded-md"
          style={{
            left: 4,
            bottom: 0,
            width: totalW - 8,
            height: 8,
            background: "hsl(var(--primary) / 0.08)",
            filter: "blur(8px)",
          }}
        />
        {/* Wooden pallet base */}
        <div
          className="absolute rounded-md border"
          style={{
            left: 0,
            bottom: 0,
            width: totalW,
            height: cubeD + 6,
            background: "linear-gradient(180deg, hsl(30 30% 28%), hsl(30 25% 20%))",
            borderColor: "hsl(30 20% 16%)",
          }}
        >
          {/* Slats */}
          {[0.2, 0.5, 0.8].map((p) => (
            <div
              key={p}
              className="absolute"
              style={{
                left: `${p * 100}%`,
                top: 2,
                bottom: 2,
                width: 2,
                background: "hsl(30 15% 14%)",
                borderRadius: 1,
              }}
            />
          ))}
        </div>

        {/* Cubes */}
        {Array.from({ length: TOTAL_CUBES }).map((_, i) => {
          const layer = Math.floor(i / 6);
          const posInLayer = i % 6;
          const col = posInLayer % 3;
          const row = Math.floor(posInLayer / 3);
          const isFilled = i < hoveredCubes;

          const x = col * (cubeW + gapX);
          const y = totalH - cubeD - 6 - cubeH - row * (cubeH + gapY) - layer * layerLift;

          return (
            <motion.button
              key={i}
              onClick={() => onCubeClick(i + 1)}
              className="absolute"
              style={{
                left: x,
                top: y,
                width: cubeW,
                height: cubeH + cubeD,
                zIndex: layer * 10 + (1 - row) * 5 + col,
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Top face */}
              <div
                className="absolute left-0 top-0 rounded-t-sm transition-all duration-200"
                style={{
                  width: cubeW,
                  height: cubeH,
                  background: isFilled
                    ? "linear-gradient(135deg, hsl(var(--primary) / 0.35), hsl(var(--primary) / 0.2))"
                    : "linear-gradient(135deg, hsl(var(--secondary) / 0.6), hsl(var(--secondary) / 0.35))",
                  border: `1.5px solid ${isFilled ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border) / 0.5)"}`,
                  boxShadow: isFilled ? "inset 0 1px 4px hsl(var(--primary) / 0.15)" : "none",
                }}
              >
                {isFilled && (
                  <Package size={14} className="absolute inset-0 m-auto text-primary/50" />
                )}
              </div>
              {/* Front face */}
              <div
                className="absolute left-0 rounded-b-sm transition-all duration-200"
                style={{
                  top: cubeH - 1,
                  width: cubeW,
                  height: cubeD,
                  background: isFilled
                    ? "linear-gradient(180deg, hsl(var(--primary) / 0.22), hsl(var(--primary) / 0.12))"
                    : "linear-gradient(180deg, hsl(var(--secondary) / 0.4), hsl(var(--secondary) / 0.2))",
                  border: `1.5px solid ${isFilled ? "hsl(var(--primary) / 0.35)" : "hsl(var(--border) / 0.35)"}`,
                  borderTop: "none",
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

const priceTiers = [
  { filled: 6, pricePerCube: 12000, label: "25% full" },
  { filled: 12, pricePerCube: 9000, label: "50% full" },
  { filled: 18, pricePerCube: 7000, label: "75% full" },
  { filled: 24, pricePerCube: 5500, label: "100% full" },
];

function SharedPalletPage() {
  const [hoveredCubes, setHoveredCubes] = useState(12);

  const currentTier = priceTiers.reduce((prev, tier) =>
    hoveredCubes >= tier.filled ? tier : prev
  , priceTiers[0]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[640px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[10px] font-semibold tracking-wider bg-primary/15 text-primary px-3 py-1 rounded mb-4">
            COMING SOON
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Share a pallet.
            <br />
            <span className="text-primary">Split the cost.</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            A pallet is divided into cube slots. You buy the cubes you need. As more people fill the pallet, the price per cube drops for everyone — including you.
          </p>
        </motion.div>

        {/* Interactive pallet visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border/60 rounded-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Pallet preview</h2>
            <div className="text-xs text-muted-foreground">
              <span className="text-primary font-semibold">{hoveredCubes}</span> / {TOTAL_CUBES} cubes filled
            </div>
          </div>

          {/* 3D isometric pallet */}
          <PalletVisualization hoveredCubes={hoveredCubes} onCubeClick={setHoveredCubes} />

          {/* Price display */}
          <div className="bg-secondary/30 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Price per cube at {currentTier.label}</p>
            <p className="text-2xl font-bold text-primary">
              {currentTier.pricePerCube.toLocaleString()} ISK
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Click cubes above to see how the price changes
            </p>
          </div>
        </motion.div>

        {/* Price tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border/60 rounded-xl p-6 mb-8"
        >
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <TrendingDown size={16} className="text-primary" />
            More people = lower price
          </h2>
          <div className="space-y-3">
            {priceTiers.map((tier) => (
              <div
                key={tier.filled}
                className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                  hoveredCubes >= tier.filled ? "bg-primary/10" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-sm ${
                          i < (tier.filled / TOTAL_CUBES) * 4
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{tier.label}</span>
                </div>
                <span className={`text-sm font-semibold ${hoveredCubes >= tier.filled ? "text-primary" : "text-muted-foreground"}`}>
                  {tier.pricePerCube.toLocaleString()} ISK / cube
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-xl font-bold tracking-tight mb-8 text-center">How it works</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Pick your cubes", desc: "Choose how many cube slots you need on the pallet." },
              { num: "2", title: "Others join in", desc: "As more people buy cubes, the price per cube drops." },
              { num: "3", title: "Pallet ships", desc: "Once the pallet is full enough, we ship it to Iceland." },
              { num: "4", title: "Everyone saves", desc: "You pay the final (lower) price. VAT invoice included." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="text-xs font-semibold mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notify CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border/60 rounded-xl p-8 text-center"
        >
          <Users size={24} className="mx-auto mb-4 text-primary" />
          <h2 className="text-lg font-bold mb-2">Be the first to know</h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-5">
            We're launching this service soon. In the meantime, you can use our import service or check active bulk deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/import"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Import Service <ArrowRight size={14} />
            </Link>
            <Link
              to="/group-orders"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-secondary/80 transition-colors"
            >
              Bulk Deals <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
