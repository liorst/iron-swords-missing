"use server";

import { fetchDbData } from "@/services/fetch-db-data";
import { cookies } from "next/headers";

export async function fetchData(query: string) {
  const _cookies = cookies();
  return await fetchDbData({ name: query });
}
