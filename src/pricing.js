// A deliberately small, deliberately wrong module. It exists so a real agent run
// has something concrete to fix once the plumbing is proven with agent-command: true.

const TIERS = [
  { key: "free", monthly: 0, annualDiscount: 0 },
  { key: "pro", monthly: 49, annualDiscount: 0.2 },
  { key: "scale", monthly: 149, annualDiscount: 0.2 },
];

export function annualPrice(tierKey) {
  const tier = TIERS.find((t) => t.key === tierKey);
  if (!tier) return null;
  return tier.monthly * 12 * (1 - tier.annualDiscount);
}

export function formatPrice(amount) {
  return "$" + amount.toFixed(2);
}

export function monthlyEquivalent(tierKey) {
  const annual = annualPrice(tierKey);
  if (annual === null) return null;
  return annual / 12;
}
