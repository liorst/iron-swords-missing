import { PersonData } from "../app/utils/types";
import supabase from "./supabase";
import validator from "validator";

type Props = {
  name?: string;
  id?: string;
};
const MIN_QUERY_LENGTH = 3;

export async function fetchDbData(props?: Props): Promise<PersonData[]> {
  const { name, id } = props ?? { name: "", id: null };

  const isFullName = name?.includes(" ");

  const isHebrewEnglishOrWhiteSpace =
    /^[\u0020\u0041-\u005A\u0061-\u007A\u0590-\u05FF]+$/.test(name || "");

  const sanitizedName = validator.escape(name || "");
  const isIdValid = validator.isAlphanumeric(id || "");

  if (
    sanitizedName &&
    (!isHebrewEnglishOrWhiteSpace || sanitizedName.length < MIN_QUERY_LENGTH)
  ) {
    return [];
  }

  if (id && !isIdValid) {
    return [];
  }

  const firstName = (
    isFullName ? sanitizedName.split(" ")[0] : sanitizedName
  ).trim();

  const lastName = (
    isFullName ? sanitizedName.split(" ")[1] : sanitizedName
  ).trim();

  if (!firstName && !lastName && !id) {
    return [];
  }
  const nameQuery = `first_name.ilike.%${firstName}%,last_name.ilike.%${lastName}%`;
  const idQuery = id ? `id.eq.${validator.escape(id)}` : "";

  let query = isFullName ? `and(${nameQuery})` : `or(${nameQuery})`;
  if (id) query = `or(${idQuery})`;

  const { data = [] } = await supabase.from("people").select("*").or(query);

  // @ts-ignore
  return (
    data?.map(
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
    ) ?? []
  );
}
