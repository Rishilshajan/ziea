// Shared order constants + types. Kept in a plain (non-"use client") module so
// BOTH the server orders page and the client OrdersClient can import the runtime
// value `ORDER_STATUSES` — a server component can't use a value imported from a
// "use client" file (it only gets a client-reference proxy).

export const ORDER_STATUSES = ["Initiated", "Confirmed", "Fulfilled", "Cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface Order {
  id: string;
  customer_name: string | null;
  customer_phone: string | null;
  product_id: string | null;
  product_code: string | null;
  product_name: string | null;
  size: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
  status: OrderStatus;
  source: string | null;
  created_at: string;
}
