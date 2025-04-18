import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDescriptionInArray(userDescription: any, categoriesArray: any) {
    if (!Array.isArray(categoriesArray)) {
        console.error("categoriesArray is not an array or is undefined");
        return false;
    }
    return categoriesArray.some(item => 
        item.description.toLowerCase().includes(userDescription.toLowerCase()) || 
        userDescription.toLowerCase().includes(item.description.toLowerCase())
    );
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

export const statusColorMap: { [key: string]: { bg: string; text: string } } = {
  "Awaiting Remita Upload": { bg: "#FFF4D1", text: "#A67B00" },
  "Awaiting Remita Confirmation": { bg: "#FFF4D1", text: "#A67B00" },
  "Awaiting Payment Confirmation": { bg: "#FFF4D1", text: "#A67B00" },
  Waiver: { bg: "#B9E6FF", text: "#084D71" },
  "Payment Declined": { bg: "#FC8D94", text: "#320104" },
  "More Information Needed": { bg: "#FFD3B6", text: "#8C3D00" },
  Satisfactory: { bg: "#D6F8C7", text: "#1A3E1E" },
  Unsatisfactory: { bg: "#FC8D94", text: "#320104" },
  "Not Yet Reviewed": { bg: "#FFEB99", text: "#705C00" },

  // Mainly used
  "Payment Confirmed": { bg: "#D6F8C7", text: "#1A3E1E" },
  Success: { bg: "#E5FFE5", text: "#00C000" },
  Active: { bg: "#E5FFE5", text: "#00C000" },
  Inactive: { bg: "#FFE5E6", text: "#FF000A" },
  "Not Active": { bg: "#FFE5E6", text: "#FF000A" },
  Pending: { bg: "#FFFBE5", text: "#CCAF09" },
  Failed: { bg: "#FFE5E8", text: "#BF1E2C" },
  Unpaid: { bg: "#FFE5E8", text: "#BF1E2C" },
  Paid: { bg: "#D6F8C7", text: "#1A3E1E" },
  Declined: { bg: "#FFE5E8", text: "#BF1E2C" },
  Approved: { bg: "#E5FFEB", text: "#01BC29" },
  "Review In Progress": { bg: "#FFF2E5", text: "#452609" },
  "Not Submitted Yet": { bg: "#E5EDFF", text: "#040C21" },
  Submitted: { bg: "#FFE5F8", text: "#1A1318" },
  Reviewed: { bg: "#E8E5FF", text: "#1D0AF5" },
  "Re Opened": { bg: "#FAEBE1", text: "#F5720A" },
  New: { bg: "#E5F2FF", text: "#067EF6" },
};

export function truncateString(str: string, maxLength: number, suffix = "...") {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + suffix;
}

export const formatCurrency = (amount: number | string): string => {
  const numberValue = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numberValue)) return "Invalid amount";

  return `${numberValue.toLocaleString("en-NG")}`;
};
