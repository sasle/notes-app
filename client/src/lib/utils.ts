import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface User {
  id: number
  username: string;
  password: string;
}

export interface Note {
  id: string;
  title: string;
  content: string | undefined;
  createdAt: Date;
  updatedAt: Date | undefined;
  author: User;
  authorId: number;
}
