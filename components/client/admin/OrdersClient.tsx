"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MdOutlineExpandMore,
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/ui/Toast";
import { useOrders } from "@/components/client/admin/OrdersProvider";
import { orderHref } from "@/utils/whatsapp";
import { shortDate, rupees } from "@/utils/format";

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

const STATUS_STYLES: Record<OrderStatus, string> = {
  Initiated: "bg-amber-50 text-amber-700",
  Confirmed: "bg-[#7A9268]/15 text-[#4c623d]",
  Fulfilled: "bg-[#2C3829]/10 text-[#2C3829]",
  Cancelled: "bg-red-50 text-red-600",
};

export default function OrdersClient({
  rows,
  status,
  counts,
}: {
  rows: Order[];
  status: OrderStatus;
  counts: Record<OrderStatus, number>;
}) {
  const supabase = createClient();
  const router = useRouter();
  const { refresh } = useOrders();

  const [items, setItems] = useState<Order[]>(rows);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState({ show: false, message: "", error: false });

  React.useEffect(() => {
    setItems(rows);
    setExpanded(null);
  }, [rows]);

  const showToast = (message: string, error = false) => {
    setToast({ show: true, message, error });
    setTimeout(() => setToast({ show: false, message: "", error: false }), 3500);
  };

  const changeStatus = async (order: Order, next: OrderStatus) => {
    if (next === order.status || busy.has(order.id)) return;
    setBusy((p) => new Set(p).add(order.id));
    // Optimistic: the row leaves the current tab.
    setItems((prev) => prev.filter((r) => r.id !== order.id));

    const { error } = await supabase
      .from("orders")
      .update({ status: next })
      .eq("id", order.id);

    setBusy((p) => {
      const n = new Set(p);
      n.delete(order.id);
      return n;
    });

    if (error) {
      setItems((prev) => [order, ...prev]);
      showToast(error.message || "Couldn't update the order.", true);
      return;
    }

    refresh();
    router.refresh();
  };

  return (
    <>
      <Toast show={toast.show} message={toast.message} error={toast.error} />

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ORDER_STATUSES.map((s) => {
          const active = s === status;
          return (
            <Link
              key={s}
              href={`/admin/orders?status=${s}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-jost font-medium transition-colors border ${
                active
                  ? "bg-[#2C3829] text-white border-[#2C3829]"
                  : "bg-white text-[#2C3829]/70 border-[#d6c3b3]/50 hover:bg-[#d6c3b3]/20"
              }`}
            >
              {s}
              {counts[s] > 0 && (
                <span
                  className={`min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-semibold flex items-center justify-center leading-none ${
                    active ? "bg-white/20 text-white" : "bg-[#7A9268]/15 text-[#4c623d]"
                  }`}
                >
                  {counts[s] > 99 ? "99+" : counts[s]}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-20 md:py-28 text-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-24 w-24 rounded-full bg-[#7A9268]/8" />
            <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#7A9268]/12 ring-1 ring-[#7A9268]/20 text-[#7A9268]">
              <MdOutlineShoppingBag className="text-4xl" />
            </span>
          </div>
          <div className="space-y-2">
            <p className="cormorant text-2xl md:text-3xl text-primary-dark">
              No {status.toLowerCase()} orders
            </p>
            <p className="jost text-sm text-muted max-w-xs mx-auto leading-relaxed">
              {status === "Initiated"
                ? "New Buy Now orders from the storefront will appear here."
                : `Orders you move to ${status} will be filed here.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((o) => {
            const isOpen = expanded === o.id;
            const waItem = {
              name: o.product_name ?? "Product",
              code: o.product_code ?? "—",
              size: o.size ?? "—",
              quantity: o.quantity,
              unitPrice: Number(o.unit_price),
            };
            return (
              <div
                key={o.id}
                className="rounded-2xl border border-[#d6c3b3]/40 bg-white overflow-hidden transition-shadow hover:shadow-sm"
              >
                {/* Collapsed row */}
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : o.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start sm:items-center gap-3 p-4 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <span className="block font-jost font-semibold text-[#211a15] truncate">
                      {o.product_name ?? "Product"}
                    </span>
                    <span className="block text-[13px] text-[#2C3829]/70 truncate">
                      {o.customer_name || "Guest"} · Size {o.size ?? "—"} · Qty {o.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-jost font-semibold text-[#211a15] whitespace-nowrap">
                      {rupees(Number(o.subtotal))}
                    </span>
                    <span
                      className={`hidden sm:inline rounded-full px-2.5 py-0.5 text-[11px] font-jost font-medium ${STATUS_STYLES[o.status]}`}
                    >
                      {o.status}
                    </span>
                    <span className="hidden md:inline text-xs text-[#2C3829]/70 whitespace-nowrap">
                      {shortDate(o.created_at)}
                    </span>
                    <MdOutlineExpandMore
                      className={`text-2xl text-[#2C3829]/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {/* Expanded */}
                {isOpen && (
                  <div className="border-t border-[#d6c3b3]/30 bg-[#FAF7F2] px-4 py-4 animate-in fade-in duration-300">
                    {/* Meta grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-sm">
                      <Meta label="Code" value={o.product_code ?? "—"} />
                      <Meta label="Size" value={o.size ?? "—"} />
                      <Meta label="Qty" value={String(o.quantity)} />
                      <Meta label="Unit" value={rupees(Number(o.unit_price))} />
                    </div>

                    {/* Contact chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {o.customer_phone && (
                        <a
                          href={`tel:${o.customer_phone}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#d6c3b3]/50 px-3 py-1.5 text-xs font-jost font-medium text-[#211a15] hover:bg-[#f0ebe3] transition-colors"
                        >
                          <MdOutlinePhone className="text-sm shrink-0" />
                          {o.customer_phone}
                        </a>
                      )}
                      <a
                        href={orderHref([waItem])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-1.5 text-xs font-jost font-medium text-[#1a7a44] hover:bg-[#25D366]/15 transition-colors"
                      >
                        <FaWhatsapp className="text-sm shrink-0" />
                        Message on WhatsApp
                      </a>
                    </div>

                    {/* Subtotal + received */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-[#2C3829]/60">Placed {shortDate(o.created_at)}</span>
                      <span className="font-jost font-semibold text-[#211a15]">
                        Subtotal {rupees(Number(o.subtotal))}
                      </span>
                    </div>

                    {/* Status control */}
                    <div className="pt-3 border-t border-[#d6c3b3]/30">
                      <span className="block text-xs font-jost font-medium text-[#2C3829]/60 mb-2">
                        Update status
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {ORDER_STATUSES.map((s) => {
                          const active = s === o.status;
                          return (
                            <button
                              key={s}
                              type="button"
                              disabled={active || busy.has(o.id)}
                              onClick={() => changeStatus(o, s)}
                              className={`px-3 py-1.5 rounded-full text-xs font-jost font-medium border transition-colors ${
                                active
                                  ? `${STATUS_STYLES[s]} border-transparent cursor-default`
                                  : "bg-white text-[#2C3829]/70 border-[#d6c3b3]/50 hover:bg-[#d6c3b3]/20 disabled:opacity-50"
                              }`}
                            >
                              {active ? `● ${s}` : s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] uppercase tracking-wider text-[#2C3829]/45">{label}</span>
      <span className="font-jost font-medium text-[#211a15] break-words">{value}</span>
    </div>
  );
}
