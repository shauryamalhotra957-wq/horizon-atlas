import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { PlanetaryCarbonScenarioEvaluator } from '../src/utils/carbon_scenario.js';

describe('PlanetaryCarbonScenarioEvaluator Test Suite', () => {
  test('static emissions exhausts 250Gt budget in under 7 years at 40Gt/yr', () => {
    const evaluator = new PlanetaryCarbonScenarioEvaluator({ remainingBudgetGt: 250.0, annualEmissionsGt: 40.0 });
    const years = evaluator.estimateYearsToBudgetExhaustion(0.0);
    assert.strictEqual(years, 7);
  });

  test('aggressive reduction extends budget horizon', () => {
    const evaluator = new PlanetaryCarbonScenarioEvaluator({ remainingBudgetGt: 250.0, annualEmissionsGt: 40.0 });
    const yearsAggressive = evaluator.estimateYearsToBudgetExhaustion(15.0);
    assert.ok(yearsAggressive > 7);
  });

  test('projectPpm accurately forecasts future atmospheric concentration', () => {
    const evaluator = new PlanetaryCarbonScenarioEvaluator({ currentPpm: 420.0, annualEmissionsGt: 40.0 });
    // 10 years * 40 Gt = 400 Gt * 0.128 = 51.2 ppm -> 471.2 ppm
    const ppm2036 = evaluator.projectPpm(2036, 2026);
    assert.strictEqual(ppm2036, 471.2);
  });
});
