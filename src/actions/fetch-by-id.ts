"use server";
import { cookies } from "next/headers";
import supabase from "@/services/supabase-service-role";
import validator from "validator";

export async function fetchById({ id }: { id: string }) {
  const _cookies = cookies();
  let query = `or(id.eq.${validator.escape(id)})`;
  const { data = [] } = await supabase.from("people").select("*").or(query);
  // @ts-ignore
  return (data?.map(
    ({
      id,
      contact_name,
      contact_phone,
      details,
      first_name,
      image,
      last_name,
      last_seen,
      notes,
      status,
      source,
    }) => ({
      id,
      contactName: contact_name,
      contactPhone: contact_phone,
      identifyingDetails: details,
      firstName: first_name,
      image,
      lastName: last_name,
      lastSeen: last_seen,
      notes,
      status,
      source,
    }),
  ) ?? [])[0];
}
