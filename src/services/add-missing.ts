"use server";

import { prisma } from "./prisma";
export async function createMissingPerson(data: any) {
  return await prisma.person.create({ data });
}
