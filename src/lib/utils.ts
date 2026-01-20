import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRandomPos = (range: number): [number, number, number] => {
  return [
    (Math.random() - 0.5) * range,
    2,
    (Math.random() - 0.5) * range
  ];
};