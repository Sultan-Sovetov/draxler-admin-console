import { supabase } from "@/lib/supabase";
import { CATEGORY_BASE_NUMBERS } from "@/lib/defaults";
import type { Category } from "@/store/queue.store";

/**
 * Generate the next auto-incremented title (e.g. "DRX-117") for the given
 * category by querying the most recent product in Supabase.
 *
 * Fallback chain:
 * 1. Parse the numeric suffix from the latest DB title for this category.
 * 2. If no DB records exist, use the hard-coded base from CATEGORY_BASE_NUMBERS.
 * 3. Add 1 and return "DRX-{number}".
 */
export async function generateNextTitle(category: Category): Promise<string> {
  const { data, error } = await supabase
    .from("products")
    .select("title")
    .eq("type", category)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let lastNumber = CATEGORY_BASE_NUMBERS[category];

  if (!error && data?.title) {
    const match = data.title.match(/DRX-(\d+)/i);
    if (match) {
      lastNumber = parseInt(match[1], 10);
    }
  }

  return `DRX-${lastNumber + 1}`;
}
