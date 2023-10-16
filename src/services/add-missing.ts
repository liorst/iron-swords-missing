"use server";

import { Database } from "./db";

export async function createMissingPerson(data: any) {
  const db = new Database();
  return await db.createPerson(data);
}
