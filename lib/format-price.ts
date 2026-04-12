/** Armenian dram sign (U+058F) */
export const DRAM_SIGN = "\u058F";

/** Remove leading dram sign(s) and trim; for edits and normalizing before save. */
export function stripDramForEdit(value: string | null | undefined): string {
  if (value == null) return "";
  let t = value.trim();
  while (t.startsWith(DRAM_SIGN)) {
    t = t.slice(DRAM_SIGN.length).trim();
  }
  return t.trim();
}

/** For list / detail UI: «—» if empty, else «֏ {amount}». */
export function formatPriceDramDisplay(value: string | null | undefined): string {
  const core = stripDramForEdit(value);
  if (!core) return "—";
  return `${DRAM_SIGN} ${core}`;
}

/** For optional price lines (e.g. cards): null if no amount. */
export function formatPriceDramOptional(value: string | null | undefined): string | null {
  const core = stripDramForEdit(value);
  if (!core) return null;
  return `${DRAM_SIGN} ${core}`;
}
