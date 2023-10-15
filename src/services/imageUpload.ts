"server only";

import supabase from "@/services/supabase-service-role";

export async function uploadImage(recordId, filename, fileStream: any) {
  const filepath = `public/${recordId}/${filename}`;
  const { error } = await supabase.storage
    .from("people-public")
    .upload(filepath, fileStream, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error && error?.statusCode === "409") {
    // Duplicate file, do nothing
  } else if (error && error?.statusCode !== "200") {
    throw new Error(error.statusCode);
  }
  const publicUrl = await supabase.storage
    .from("people-public")
    .getPublicUrl(filepath);
  return { error: error ?? null, publicUrl: publicUrl.data.publicUrl };
}
