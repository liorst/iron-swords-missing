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
    const results = await prisma.person.findMany({
      where: {
        firstName: { contains: searchName },
      },

      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(results);
  } catch (err) {
    console.log("PERSON_SEARCH_GET", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      contactName,
      contactPhone,
      lastSeen,
      identifyingDetails,
    } = body;
    console.log(body);

    const isDuplicate = await prisma.person.findFirst({
      where: {
        firstName,
        lastName,
      },
    });
    if (isDuplicate) {
      return new NextResponse("Missing person already exists", { status: 400 });
    }
    if (!firstName) {
      return new NextResponse("First Name is required", { status: 400 });
    }
    if (!lastName) {
      return new NextResponse("Last Name is required", { status: 400 });
    }

    if (!contactName) {
      return new NextResponse("Contact Name is required", { status: 400 });
    }
    if (!contactPhone) {
      return new NextResponse("Contact phone is required", { status: 400 });
    }
    if (!lastSeen) {
      return new NextResponse("Last seen info is required", { status: 400 });
    }
    if (!identifyingDetails) {
      return new NextResponse("Identifying details are required", {
        status: 400,
      });
    }

    const data = {
      firstName,
      lastName,
      contactName,
      contactPhone,
      lastSeen,
      identifyingDetails,
    };

    const person = await prisma.person.create({
      data,
    });
    return NextResponse.json(person);
  } catch (err) {
    console.log("ANIMALS_POST", err);
    return new NextResponse("error", { status: 500 });
  }
}
