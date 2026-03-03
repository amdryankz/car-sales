import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/vehicles — fetch all vehicles with their variants
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: { variants: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("[GET /api/vehicles]", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

// POST /api/vehicles — create a new vehicle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, category, description, imageUrl, isFeatured } = body;

    if (!name || !slug || !category) {
      return NextResponse.json(
        { error: "name, slug, and category are required" },
        { status: 400 }
      );
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        slug,
        category,
        description: description ?? null,
        imageUrl: imageUrl ?? null,
        isFeatured: isFeatured ?? false,
      },
      include: { variants: true },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("[POST /api/vehicles]", error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
