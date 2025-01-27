import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatISODate(isoDateString: Date) {
  const date = new Date(isoDateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function revertToISODate(yyyyMMddString: any) {
  const [year, month, day] = yyyyMMddString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toISOString();
}
export function getFileExtension(url: string): string {
  // Use regular expression to capture the file extension
  const match: any = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  // If there is a match, return the file extension in lowercase
  return match ? match[1].toLowerCase() : " ";
}

export function mapStatus(status: string) {
  const statusMap: Record<string, string> = {
    "Not Yet Reviewed": "Unreviewed",
    PENDING: "Pending",
    APPROVED: "Approved",
    DECLINED: "Declined",
    SUCCESS: "Success",
    FAILED: "Failed",
    "Review in Progress": "Under Review",
  };

  // Return the mapped value if it exists, or the original status formatted
  return statusMap[status] || status.charAt(0) + status.slice(1).toLowerCase();
}

export const statusColorMap: { [key: string]: { bg: string; text: string } } = {
  "Not Submitted Yet": { bg: "#FFEB99", text: "#705C00" },
  "Submitted": { bg: "#D6F8C7", text: "#1A3E1E" },
  "Awaiting Remita Upload": { bg: "#FFF4D1", text: "#A67B00" },
  "Awaiting Remita Confirmation": { bg: "#FFF4D1", text: "#A67B00" },
  "Awaiting Payment Confirmation": { bg: "#FFF4D1", text: "#A67B00" },
  "Waiver": { bg: "#B9E6FF", text: "#084D71" },
  "Payment Confirmed": { bg: "#D6F8C7", text: "#1A3E1E" },
  "Payment Declined": { bg: "#FC8D94", text: "#320104" },
  "Review in Progress": { bg: "#FFEB99", text: "#705C00" },
  "Re Opened": { bg: "#FFD3B6", text: "#8C3D00" },
  "Approved": { bg: "#80EF80", text: "#0E1A0E" },
  "Declined": { bg: "#FC8D94", text: "#320104" },
  "More Information Needed": { bg: "#FFD3B6", text: "#8C3D00" },
  "Satisfactory": { bg: "#D6F8C7", text: "#1A3E1E" },
  "Unsatisfactory": { bg: "#FC8D94", text: "#320104" },
  "Not Yet Reviewed": { bg: "#FFEB99", text: "#705C00" },
  "Closed": { bg: "#B3B3B3", text: "#2C2C2C" },
};

export function truncateString(str:string, maxLength:number, suffix = "...") {
  if (str.length <= maxLength) {
    return str; // No truncation needed
  }
  return str.slice(0, maxLength) + suffix;
}