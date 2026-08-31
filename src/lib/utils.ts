import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jamaicaNow(date = new Date()) {
  return new Intl.DateTimeFormat("en-JM", {
    timeZone: "America/Jamaica",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function jamaicaTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-JM", {
    timeZone: "America/Jamaica",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function jamaicaDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-JM", {
    timeZone: "America/Jamaica",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function ageFromDob(dob: string) {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}
