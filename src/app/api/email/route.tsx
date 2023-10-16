import { sendEmail } from "@/services/resend";
import supabase from "@/services/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const emailData: {
    from: string;
    email: string;
    subject: string;
    html?: string;
    text?: string;
    type: string;
  } = await request.json();

  const { data } = await supabase
    .from("emails_sent")
    .select("last_sent_date")
    .eq("email", emailData.email)
    .eq("type", emailData.type)
    .single();

  const updatedEmailData = {
    email: emailData.email,
    type: emailData.type,
    last_sent_date: new Date().toISOString(),
  };

  if (data) {
    // limit to 1 email per minute
    const last_sent = new Date(data.last_sent_date);
    const now = new Date();
    const diff = now.getTime() - last_sent.getTime();
    if (diff < 60000) {
      return NextResponse.json({ message: "too many emails" }, { status: 429 });
    } else {
      // update last sent date
      const response = await sendEmail(emailData);
      if (!response) {
        return NextResponse.json({ message: "email failed" }, { status: 500 });
      }
      const { error } = await supabase
        .from("emails_sent")
        .update(updatedEmailData)
        .eq("email", emailData.email)
        .eq("type", emailData.type);
      if (error) {
        console.error(error);
      }
      return NextResponse.json({ message: "email sent" });
    }
  }
  const response = await sendEmail(emailData);
  if (!response) {
    return NextResponse.json({ message: "email failed" }, { status: 500 });
  }
  const { error } = await supabase
    .from("emails_sent")
    .insert([updatedEmailData]);
  if (error) {
    console.error(error);
  }
  return NextResponse.json({ message: "email sent" });
}
