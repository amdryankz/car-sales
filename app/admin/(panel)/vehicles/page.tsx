import prisma from "@/lib/prisma";
import VehicleTableClient from "./VehicleTableClient";

export default async function VehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  });

  return <VehicleTableClient initialVehicles={vehicles} />;
}
