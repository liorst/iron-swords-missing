export type PersonData = {
  id?: string;
  firstName: string;
  lastName: string;
  image: string;
  contactName: string;
  contactPhone: string;
  status: string; //"unknown" | "found" | "deceased" | "kidnapped";
  lastSeen: string;
  identifyingDetails: string;
  notes: string;
  source: string;
};
export type NotificationData = {
  email: string;
  notify_id: string;
};
export default PersonData;
