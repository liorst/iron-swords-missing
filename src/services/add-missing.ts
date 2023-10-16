"use server";
import supabase from "@/services/supabase-service-role";
import { PersonData } from "../app/utils/types";

import { prisma } from "./prisma";
export async function createMissingPerson(data: any) {
  const person = await prisma.person.create({ data });

  console.debug(person);
  return person;
  // return { error, id };
}
export async function createMissingAnimal(data: any) {
  const person = await prisma.animal.create({ data });

  console.debug(person);
  return person;
  // return { error, id };
}
