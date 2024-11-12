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
