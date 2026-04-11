import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/group-orders")({
  head: () => ({
    meta: [
      { title: "Group Orders — MAS Logistics" },
      { name: "description", content: "Join group orders to save on bulk shipping from Europe to Iceland. Container shipments with small deposits." },
      { property: "og:title", content: "Group Orders — MAS Logistics" },
      { property: "og:description", content: "Join group orders to save on bulk shipping from Europe to Iceland." },
    ],
  }),
  component: GroupOrdersPage,
});

function GroupOrdersPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          GROUP <span className="text-primary">ORDERS</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Join a container shipment and save on freight. Small deposit secures your spot.
        </p>
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No active campaigns yet. Check back soon!</p>
        </div>
      </div>
    </div>
  );
}
