import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** 合并 className，与 span-growth 原项目 lib/utils 行为一致 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
