import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const spring = { type: "spring", stiffness: 320, damping: 32, mass: 0.6 };
const easeOut = [0.22, 0.61, 0.36, 1];
const dur = { base: 0.24 };
export {
  cn as c,
  dur as d,
  easeOut as e,
  spring as s
};
