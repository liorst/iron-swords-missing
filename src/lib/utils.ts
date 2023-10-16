import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const adminMail = "ironswordsoperation@gmail.com";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeImageUrl = (url: string) => {
  if (url && url.includes("https://drive.google.com/")) {
    const id = url
      .replace("https://drive.google.com/file/d/", "")
      .replace("https://drive.google.com/open?id=", "")
      .replace("/view?usp=sharing", "")
      .replace("/view?usp=drive_link", "");
    return `https://drive.google.com/uc?export=view&id=${id}`;
  }

  return url || "/no-image.png";
};

export const mailAdmin = (subject = "", body = "") => {
  const subjectEncoded = encodeURIComponent(subject);
  const bodyEncoded = encodeURIComponent(body);
  const emailLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${adminMail}&su=${subjectEncoded}&body=${bodyEncoded}`;
  window.open(emailLink);
};
export function getBaseUrl() {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.ironswords.org.il";
}

const keyTranslationMap: { [key: string]: string } = {
  id: "id",
  first_name: "firstName",
  last_name: "lastName",
  image: "image",
  contact_name: "contactName",
  contact_phone: "contactPhone",
  status: "status",
  last_seen: "lastSeen",
  details: "identifyingDetails",
  notes: "notes",
} as const;
export const translateKeys = (data: any) => {
  return data.map((row: any) => {
    const translatedRow: any = {};
    Object.keys(row).forEach((key) => {
      translatedRow[keyTranslationMap[key]] = row[key];
    });
    return translatedRow;
  });
};

export const getFullName = (firstName: string, lastName?: string) => {
  return (
    `${firstName}` +
    (lastName && lastName.toLowerCase() !== "null" ? ` ${lastName}` : "")
  );
};

export const isProdcution = () => process.env.NODE_ENV === "production";
