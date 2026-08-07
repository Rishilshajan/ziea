"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MdOutlineExpandMore,
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlineMarkEmailRead,
  MdOutlineInbox,
} from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/ui/Toast";
import { useEnquiries } from "@/components/client/admin/EnquiriesProvider";
import { shortDate, fullDate } from "@/utils/format";

export interface Enquiry {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  inquiry_type: string | null;
  message: string | null;
  created_at: string;
  is_read: boolean;
}

type Tab = "unread" | "read";

/** Colour + label for each enquiry type. Doubles as a future filter key. */
const TYPE_STYLES: Record<string, { label: string; className: string }> = {
  business: { label: "Business", className: "bg-[#6366f1]/12 text-[#4f46e5]" },
  personal: { label: "Personal", className: "bg-[#C4856A]/15 text-[#a9603f]" },
  collaboration: { label: "Collaboration", className: "bg-[#7A9268]/15 text-[#4c623d]" },
};

function typeStyle(type: string | null) {
  return (
    TYPE_STYLES[(type ?? "").toLowerCase()] ?? {
      label: type ?? "General",
      className: "bg-[#7A7068]/12 text-[#5c554e]",
    }
  );
}

export default function EnquiriesClient({
  rows,
  tab,
  unreadCount,
  readCount,
}: {
  rows: Enquiry[];
  tab: Tab;
  unreadCount: number;
  readCount: number;
}) {
  const supabase = createClient();
  const router = useRouter();
  const { refresh } = useEnquiries();

  // Local copy so a toggled row can leave the current tab optimistically.
  const [items, setItems] = useState<Enquiry[]>(rows);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState({ show: false, message: "", error: false });

  // Re-sync when the server sends a new page/tab.
  React.useEffect(() => {
    setItems(rows);
    setExpanded(null);
  }, [rows]);

  const showToast = (message: string, error = false) => {
    setToast({ show: true, message, error });
    setTimeout(() => setToast({ show: false, message: "", error: false }), 3500);
  };

  const toggleRead = async (enquiry: Enquiry) => {
    if (busy.has(enquiry.id)) return;
    const nextIsRead = tab === "unread"; // unread → mark read; read → mark unread
    setBusy((p) => new Set(p).add(enquiry.id));
    // Optimistic: the row leaves the current tab immediately.
    setItems((prev) => prev.filter((r) => r.id !== enquiry.id));

    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: nextIsRead, read_at: nextIsRead ? new Date().toISOString() : null })
      .eq("id", enquiry.id);

    setBusy((p) => {
      const n = new Set(p);
      n.delete(enquiry.id);
      return n;
    });

    if (error) {
      // Revert on failure.
      setItems((prev) => [enquiry, ...prev]);
      showToast(error.message || "Couldn't update the enquiry.", true);
      return;
    }

    refresh(); // update the sidebar badge now
    router.refresh(); // reconcile tab counts + list from the server
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "read", label: "Read", count: readCount },
  ];

  return (
    <>
      <Toast show={toast.show} message={toast.message} error={toast.error} />

      {/* Tabs — same pill style as the Activity filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <Link
              key={t.key}
              href={`/admin/enquiries?tab=${t.key}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-jost font-medium transition-colors border ${
                active
                  ? "bg-[#2C3829] text-white border-[#2C3829]"
                  : "bg-white text-[#2C3829]/70 border-[#d6c3b3]/50 hover:bg-[#d6c3b3]/20"
              }`}
            >
              {t.label}
              {t.count > 0 && (
                <span
                  className={`min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-semibold flex items-center justify-center leading-none ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-[#7A9268]/15 text-[#4c623d]"
                  }`}
                >
                  {t.count > 99 ? "99+" : t.count}
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
              {tab === "unread" ? (
                <MdOutlineMarkEmailRead className="text-4xl" />
              ) : (
                <MdOutlineInbox className="text-4xl" />
              )}
            </span>
          </div>
          <div className="space-y-2">
            <p className="cormorant text-2xl md:text-3xl text-primary-dark">
              {tab === "unread" ? "You’re all caught up" : "No handled enquiries yet"}
            </p>
            <p className="jost text-sm text-muted max-w-xs mx-auto leading-relaxed">
              {tab === "unread"
                ? "Every enquiry has been reviewed. New messages from the Contact Us form will land here."
                : "Enquiries you check off as handled will be filed here for your records."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((e) => {
            const isOpen = expanded === e.id;
            const style = typeStyle(e.inquiry_type);
            return (
              <div
                key={e.id}
                className="rounded-2xl border border-[#d6c3b3]/40 bg-white overflow-hidden transition-shadow hover:shadow-sm"
              >
                {/* Collapsed row */}
                <div className="flex items-start sm:items-center gap-3 p-4">
                  {/* Checkbox — mark read / reopen */}
                  <input
                    type="checkbox"
                    checked={tab === "read"}
                    disabled={busy.has(e.id)}
                    onChange={() => toggleRead(e)}
                    aria-label={tab === "unread" ? "Mark as read" : "Mark as unread"}
                    className="mt-1 sm:mt-0 h-5 w-5 shrink-0 rounded-md border-[#d6c3b3] text-[#7A9268] accent-[#7A9268] cursor-pointer"
                  />

                  {/* Identity + details */}
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : e.id)}
                    aria-expanded={isOpen}
                    className="flex-1 min-w-0 text-left flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
                  >
                    <div className="min-w-0">
                      <span
                        className={`block font-jost font-semibold truncate ${
                          tab === "read"
                            ? "text-[#2C3829]/55 line-through decoration-[#2C3829]/40"
                            : "text-[#2C3829]"
                        }`}
                      >
                        {e.name || "Anonymous"}
                      </span>
                      {/* Desktop inline contact details */}
                      <span className="hidden sm:block text-[13px] text-[#2C3829]/80 truncate">
                        {e.email}
                        {e.email && e.phone ? "  ·  " : ""}
                        {e.phone}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:ml-auto shrink-0">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-jost font-medium ${style.className}`}
                      >
                        {style.label}
                      </span>
                      <span className="text-xs text-[#2C3829]/70 whitespace-nowrap">
                        {shortDate(e.created_at)}
                      </span>
                    </div>
                  </button>

                  {/* Chevron */}
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : e.id)}
                    aria-label={isOpen ? "Collapse" : "Expand"}
                    aria-expanded={isOpen}
                    className="shrink-0 text-[#2C3829]/50 hover:text-[#2C3829] transition-colors"
                  >
                    <MdOutlineExpandMore
                      className={`text-2xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Expanded panel — inline on desktop, card block on mobile */}
                {isOpen && (
                  <div className="border-t border-[#d6c3b3]/30 bg-[#FAF7F2] px-4 py-4 animate-in fade-in duration-300">
                    {/* Contact chips (also gives mobile the details) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {e.email && (
                        <a
                          href={`mailto:${e.email}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#d6c3b3]/50 px-3 py-1.5 text-xs font-jost font-medium text-[#211a15] hover:bg-[#f0ebe3] transition-colors break-all"
                        >
                          <MdOutlineMailOutline className="text-sm shrink-0" />
                          {e.email}
                        </a>
                      )}
                      {e.phone && (
                        <a
                          href={`tel:${e.phone}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#d6c3b3]/50 px-3 py-1.5 text-xs font-jost font-medium text-[#211a15] hover:bg-[#f0ebe3] transition-colors"
                        >
                          <MdOutlinePhone className="text-sm shrink-0" />
                          {e.phone}
                        </a>
                      )}
                    </div>

                    <p className="font-body-md text-[#211a15] leading-relaxed whitespace-pre-wrap break-words">
                      {e.message || <span className="text-[#2C3829]/50 italic">No message provided.</span>}
                    </p>

                    <p className="mt-4 text-xs text-[#2C3829]/60">Received {fullDate(e.created_at)}</p>
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
