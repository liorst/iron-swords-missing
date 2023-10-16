"server only";

import supabase from "@/services/supabase-service-role";

export async function uploadImage(
  recordId: string,
  filename: string,
  fileStream: any,
) {
  const filepath = `public/${recordId}/${filename}`;
  const { error } = await supabase.storage
    .from("people-public")
    .upload(filepath, fileStream, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error && (error as any).statusCode === "409") {
    // Duplicate file, do nothing
  } else if (error && (error as any).statusCode !== "200") {
    console.error(error, error.message);
    throw new Error(error.message);
  }
  const publicUrl = await supabase.storage
    .from("people-public")
    .getPublicUrl(filepath);
  return { error: error ?? null, publicUrl: publicUrl.data.publicUrl };
}
