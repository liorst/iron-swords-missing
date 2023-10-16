"use server";
import { createHash } from "crypto";

import { uploadImage } from "../services/imageUpload";
import { createMissingPerson } from "../services/add-missing";

const generateFileHash = async (stream) => {
  const hash = createHash("sha256");
  for await (const chunk of stream) {
    hash.update(chunk);
  }
  return hash.digest("hex");
};

export async function addPerson(params: FormData) {
  const first_name = params.get("first_name") as string;
  const last_seen = params.get("last_seen") as string;
  const last_name = params.get("last_name") as string;
  const contact_name = params.get("contact_name") as string;
  const identifying_details = params.get("identifying_details") as string;
  const image = params.get("image") as File;
  const contact_phone = params.get("contact_phone") as string;
  const notes = params.get("notes") as string;

  console.info("Add Person Params", params);
  const personId = createHash("sha256")
    .update([first_name, last_name, contact_name, contact_phone].join(""))
    .digest("hex")
    .substring(0, 8)
    .toUpperCase();
  const fileHash = await generateFileHash(image.stream());
  const { error, publicUrl } = await uploadImage(personId, fileHash, image);
  const status = "pending";
  return await createMissingPerson({
    id: personId,
    first_name,
    last_seen,
    last_name,
    contact_name,
    details: identifying_details,
    image: publicUrl,
    contact_phone,
    notes,
    status,
    source: "",
  });
}
