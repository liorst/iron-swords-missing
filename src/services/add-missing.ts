"use server";
import supabase from "@/services/supabase-service-role";
import { PersonData } from "../app/utils/types";

export async function insertMissingPerson(props: PersonData) {
  //: Promise<PersonData> {
  const {
    id,
    firstName,
    lastSeen,
    lastName,
    contactName,
    identifyingDetails,
    image,
    contactPhone,
    notes,
    status,
    source,
    // contactEmail,
  } = props;

  const { error } = await supabase.from("people").insert({
    id,
    contact_name: contactName,
    contact_phone: contactPhone,
    details: identifyingDetails,
    status: status,
    first_name: firstName,
    image: image,
    last_name: lastName,
    last_seen: lastSeen,
    source,
    notes,
  });

  return { error, id };
}
