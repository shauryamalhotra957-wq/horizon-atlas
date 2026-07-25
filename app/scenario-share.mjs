const LEVER_COUNT = 5;
const MIN_YEAR = 2045;
const MAX_YEAR = 2100;

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function serializeScenario(values, year, preset) {
  const safeValues = values
    .slice(0, LEVER_COUNT)
    .map((value) => clamp(Math.round(Number(value) || 0), 0, 100));
  const params = new URLSearchParams({
    v: safeValues.join(","),
    y: String(clamp(Math.round(Number(year) || MIN_YEAR), MIN_YEAR, MAX_YEAR)),
    p: String(preset || "Shared").slice(0, 32),
  });
  return params.toString();
}

export function parseScenario(search) {
  const params = new URLSearchParams(search);
  const rawValues = params.get("v");
  if (!rawValues) return null;

  const values = rawValues.split(",").map(Number);
  if (
    values.length !== LEVER_COUNT ||
    values.some((value) => !Number.isInteger(value) || value < 0 || value > 100)
  ) {
    return null;
  }

  const rawYear = Number(params.get("y"));
  const year = Number.isInteger(rawYear) ? clamp(rawYear, MIN_YEAR, MAX_YEAR) : MIN_YEAR;
  const preset = (params.get("p") || "Shared").replace(/[^\w -]/g, "").slice(0, 32) || "Shared";
  return { values, year, preset };
}
