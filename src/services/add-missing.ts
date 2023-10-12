"use server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { PersonData } from "../app/utils/types";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

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
