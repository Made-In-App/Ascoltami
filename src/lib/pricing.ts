export type SkuId = "call5" | "pack5" | "pack10";

export type Sku = {
  id: SkuId;
  label: string;
  priceEur: number;
  tokens: number;
  perSessionEur: number | null;
  description: string;
  /** true = one-shot call, no wallet credit */
  directCall: boolean;
};

export const SKUS: Record<SkuId, Sku> = {
  call5: {
    id: "call5",
    label: "Chiamata diretta",
    priceEur: 5,
    tokens: 0,
    perSessionEur: 5,
    description: "Una sessione audio ≤30′ · pagamento immediato",
    directCall: true,
  },
  pack5: {
    id: "pack5",
    label: "Pack 5",
    priceEur: 22,
    tokens: 5,
    perSessionEur: 4.4,
    description: "5 token · €4,40 a sessione",
    directCall: false,
  },
  pack10: {
    id: "pack10",
    label: "Pack 10",
    priceEur: 40,
    tokens: 10,
    perSessionEur: 4,
    description: "10 token · €4,00 a sessione",
    directCall: false,
  },
};

export const LISTENER_PAYOUT_EUR = 3.5;
export const SESSION_MAX_MINUTES = 30;
export const SESSION_WARN_MINUTES = 25;

export function formatEur(value: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
