// A deliberately small, deliberately wrong module. It exists so a real agent run
// has something concrete to fix once the plumbing is proven with agent-command: true.

const TIERS = [
  { key: "free", monthly: 0, annualDiscount: 0, seatPrice: 0 },
  { key: "pro", monthly: 49, annualDiscount: 0.2, seatPrice: 15 },
  { key: "scale", monthly: 149, annualDiscount: 0.2, seatPrice: 12 },
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

// The first seat is covered by the base monthly price; every extra seat adds seatPrice.
export function totalMonthly(tierKey, seats) {
  const tier = TIERS.find((t) => t.key === tierKey);
  if (!tier) return null;
  const billableSeats = Math.max(1, seats);
  return tier.monthly + tier.seatPrice * (billableSeats - 1);
}

export function totalAnnual(tierKey, seats) {
  const tier = TIERS.find((t) => t.key === tierKey);
  if (!tier) return null;
  return totalMonthly(tierKey, seats) * 12 * (1 - tier.annualDiscount);
}
