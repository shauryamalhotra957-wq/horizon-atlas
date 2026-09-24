/**
 * Planetary Carbon Budget & Scenario Evaluator.
 * Projects atmospheric CO2 ppm trajectories and calculates carbon budget exhaustion horizons.
 */
export class PlanetaryCarbonScenarioEvaluator {
  constructor({ currentPpm = 422.0, remainingBudgetGt = 250.0, annualEmissionsGt = 40.0 } = {}) {
    this.currentPpm = currentPpm;
    this.remainingBudgetGt = remainingBudgetGt;
    this.annualEmissionsGt = annualEmissionsGt;
  }

  estimateYearsToBudgetExhaustion(emissionReductionRatePct = 0.0) {
    if (this.annualEmissionsGt <= 0) return Infinity;

    let remaining = this.remainingBudgetGt;
    let currentRate = this.annualEmissionsGt;
    let years = 0;

    while (remaining > 0 && years < 100) {
      remaining -= currentRate;
      currentRate *= (1.0 - (emissionReductionRatePct / 100.0));
      years += 1;
    }

    return remaining <= 0 ? years : Infinity;
  }

  projectPpm(targetYear, currentYear = 2026, ppmPerGt = 0.128) {
    const elapsed = Math.max(0, targetYear - currentYear);
    const cumulativeGt = this.annualEmissionsGt * elapsed;
    const addedPpm = cumulativeGt * ppmPerGt;
    return Number((this.currentPpm + addedPpm).toFixed(2));
  }
}
