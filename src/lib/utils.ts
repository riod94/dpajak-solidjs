import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Money from "./money";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


function debounce(func: Function, delay: number) {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function calculateSum(array: any[], property: string): number {
  const total = array.reduce((accumulator, object) => {
    const value = Money.toNumeric(object[property]);
    return accumulator + value;
  }, 0);

  return total;
}

export {
  cn,
  debounce,
  calculateSum,
  Money
}