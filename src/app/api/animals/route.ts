import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request) {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const searchName = searchParams.get("text") || undefined;
  try {
    if (!searchName) {
      return new NextResponse("Search text is required", { status: 400 });
    }
    const results = await prisma.animal.findMany({
      where: {
        name: { contains: searchName },
      },

      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(results);
  } catch (err) {
    console.log("_ANIMALS_SEARCH_GET", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const body = await req.json();
    const { name, animalType, contactName, contactPhone, lastSeen } = body;
    console.log(body);
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!animalType) {
      return new NextResponse("Animal type is required", { status: 400 });
    }
    if (!contactName) {
      return new NextResponse("Contact Name is required", { status: 400 });
    }
    if (!contactPhone) {
      return new NextResponse("Contact phone is required", { status: 400 });
    }

    console.log(name);

    const animal = await prisma.animal.create({
      data: {
        name,
        animalType,
        contactName,
        contactPhone,
        lastSeen,
      },
    });
    return NextResponse.json(animal);
  } catch (err) {
    console.log("ANIMALS_POST", err);
    return new NextResponse("error", { status: 500 });
  }
}
