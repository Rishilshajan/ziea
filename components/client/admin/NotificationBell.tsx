"use client";

import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineNotifications } from 'react-icons/md';
import { useActivityNotifications } from './ActivityNotificationsProvider';

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

function dotColor(type: string) {
  const t = type || '';
  if (t.includes('Wishlist')) return '#C4856A';
  if (t.includes('Cart')) return '#4c623d';
  if (t.includes('Added')) return '#7A9268';
  if (t.includes('Updated')) return '#C4856A';
  if (t.includes('Deleted')) return '#E63946';
  if (t.includes('Login') || t.includes('Registration')) return '#3b82f6';
  if (t.includes('Enquiry')) return '#6366f1';
  if (t.includes('Newsletter') || t.includes('Subscription')) return '#f59e0b';
  return '#7A7068';
}

export default function NotificationBell({
  variant = 'light',
}: {
  variant?: 'dark' | 'light';
}) {
  const { unreadCount, recent, markAllRead } = useActivityNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);

  const iconClass =
    variant === 'dark'
      ? 'text-[#d6c3b3] hover:text-white'
      : 'text-[#2C3829] hover:text-[#2C3829]';

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        aria-label="Notifications"
        onClick={toggle}
        className={`relative flex items-center justify-center p-1 transition-colors ${iconClass}`}
      >
        <MdOutlineNotifications className="text-2xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#C4856A] text-white text-[10px] font-jost font-bold leading-none">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed left-4 right-4 top-[72px] w-auto lg:absolute lg:left-auto lg:right-0 lg:top-auto lg:mt-2 lg:w-80 max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-[#d6c3b3]/40 z-[80] p-2">
          <div className="flex items-center justify-between px-3 py-2 gap-2 border-b border-[#d6c3b3]/30 mb-1">
            <span className="font-jost font-semibold text-[#2C3829]">Notifications</span>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="rounded-full px-3 py-1.5 font-jost text-xs font-semibold transition-colors bg-[#4c623d] text-white hover:bg-[#2C3829] shadow-sm disabled:bg-[#d6c3b3]/40 disabled:text-[#2C3829]/40 disabled:shadow-none disabled:cursor-not-allowed"
            >
              Mark all as read
            </button>
          </div>
          {recent.length > 0 ? (
            <ul className="flex flex-col">
              {recent.map((row) => (
                <li
                  key={row.id}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F0E8]/60 transition-colors"
                >
                  <span
                    className="mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dotColor(row.type) }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-jost text-sm text-[#2C3829] leading-snug">
                      {row.description}
                    </span>
                    <span className="font-jost text-xs text-[#2C3829]/50 mt-0.5">
                      {timeAgo(row.created_at)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-6 text-center font-jost text-sm text-[#2C3829]/60">
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
}
