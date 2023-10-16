"use server";
import { cookies } from "next/headers";
import { fetchDbData } from "@/services/fetch-db-data";

export async function fetchById({ id }: { id: string }) {
  const _cookies = cookies();
  const data = await fetchDbData({ id });
  return data[0];
}
