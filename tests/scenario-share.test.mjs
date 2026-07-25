import assert from "node:assert/strict";
import test from "node:test";
import { parseScenario, serializeScenario } from "../app/scenario-share.mjs";

test("scenario links preserve a complete simulation state", () => {
  const query = serializeScenario([96, 77, 82, 48, 55], 2100, "Climate first");
  assert.deepEqual(parseScenario(`?${query}`), {
    values: [96, 77, 82, 48, 55],
    year: 2100,
    preset: "Climate first",
  });
});

test("scenario links reject malformed levers and constrain metadata", () => {
  assert.equal(parseScenario("?v=1,2,3"), null);
  assert.equal(parseScenario("?v=1,2,3,4,101"), null);
  assert.deepEqual(parseScenario("?v=1,2,3,4,5&y=9999&p=%3Cscript%3E"), {
    values: [1, 2, 3, 4, 5],
    year: 2100,
    preset: "script",
  });
});
