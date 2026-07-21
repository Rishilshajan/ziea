"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatListBulleted } from 'react-icons/md';

interface RichTextareaProps {
  label: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────

const ToolbarButton = ({
  onMouseDown,
  title,
  active,
  children,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onMouseDown={onMouseDown}
    title={title}
    aria-pressed={active}
    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${active
        ? 'bg-[#2C3829] text-white shadow-sm'
        : 'text-[#2C3829]/70 hover:bg-[#f3e6dc] hover:text-[#2C3829]'
      }`}
  >
    {children}
  </button>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function RichTextarea({
  label,
  value,
  onChange,
  placeholder = 'Start typing...',
  minHeight = '120px',
}: RichTextareaProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFocused = useRef(false);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    bullet: false,
  });

  // ── Sync value → DOM (only when not focused to avoid cursor jumps) ──────────
  useEffect(() => {
    const el = editorRef.current;
    if (!el || isFocused.current) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
  }, [value]);

  // ── Detect active formatting at current caret / selection ───────────────────
  // queryCommandState reflects both the current selection AND the pending
  // "typing mode" set by a toggle at a collapsed caret, so the toolbar
  // highlight always matches what the next typed character will look like.
  const checkActiveFormats = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !el.contains(sel.anchorNode)) return;

    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      bullet: document.queryCommandState('insertUnorderedList'),
    });
  }, []);

  // ── Keep the toolbar in sync as the caret / selection moves ─────────────────
  useEffect(() => {
    const handler = () => {
      if (isFocused.current) checkActiveFormats();
    };
    document.addEventListener('selectionchange', handler);
    return () => document.removeEventListener('selectionchange', handler);
  }, [checkActiveFormats]);

  // ── Toggle a format via the browser's native execCommand ────────────────────
  // execCommand handles the whole toggle lifecycle for us:
  //  • with a selection → wraps / unwraps the selected text
  //  • with a collapsed caret → flips "typing mode" so newly typed text
  //    inherits the format until the same button is pressed again.
  const runCommand = useCallback(
    (e: React.MouseEvent, command: string) => {
      // preventDefault so the button click doesn't steal focus / the selection
      e.preventDefault();
      const el = editorRef.current;
      if (!el) return;

      el.focus();
      document.execCommand(command, false);

      onChange(el.innerHTML);
      checkActiveFormats();
    },
    [onChange, checkActiveFormats],
  );

  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (el) onChange(el.innerHTML);
  }, [onChange]);

  // ── Keyboard shortcuts (Ctrl/Cmd + B / I / U) ───────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const key = e.key.toLowerCase();
      const map: Record<string, string> = { b: 'bold', i: 'italic', u: 'underline' };
      if (map[key]) {
        e.preventDefault();
        const el = editorRef.current;
        if (!el) return;
        document.execCommand(map[key], false);
        onChange(el.innerHTML);
        checkActiveFormats();
      }
    },
    [onChange, checkActiveFormats],
  );

  const isEmpty = !value || value === '' || value === '<br>' || value === '<p><br></p>';

  return (
    <div className="flex flex-col gap-1.5">
      {/* Override Tailwind base reset so execCommand formatting is visible */}
      <style>{`
        .rich-editor b, .rich-editor strong { font-weight: bold !important; }
        .rich-editor i, .rich-editor em { font-style: italic !important; }
        .rich-editor u { text-decoration: underline !important; }
        .rich-editor ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        .rich-editor ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        .rich-editor li { margin: 0.125rem 0; }
      `}</style>

      <label className="font-jost text-sm font-medium text-[#2C3829] block">
        {label}
      </label>

      <div className="border border-[#d6c3b3] rounded-xl overflow-hidden bg-white transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 hover:border-primary/50 duration-200">
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 px-3 py-2 border-b border-[#d6c3b3]/40 bg-[#FAF7F2]">
          <ToolbarButton
            onMouseDown={(e) => runCommand(e, 'bold')}
            title="Bold (Ctrl+B)"
            active={activeFormats.bold}
          >
            <MdFormatBold className="text-base" />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => runCommand(e, 'italic')}
            title="Italic (Ctrl+I)"
            active={activeFormats.italic}
          >
            <MdFormatItalic className="text-base" />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => runCommand(e, 'underline')}
            title="Underline (Ctrl+U)"
            active={activeFormats.underline}
          >
            <MdFormatUnderlined className="text-base" />
          </ToolbarButton>
          <div className="w-px h-5 bg-[#d6c3b3]/60 mx-1" />
          <ToolbarButton
            onMouseDown={(e) => runCommand(e, 'insertUnorderedList')}
            title="Bullet List"
            active={activeFormats.bullet}
          >
            <MdFormatListBulleted className="text-base" />
          </ToolbarButton>
        </div>

        {/* Editable area */}
        <div className="relative">
          {isEmpty && (
            <span
              className="absolute top-3 left-4 text-[#2C3829]/35 font-jost text-sm pointer-events-none select-none"
              aria-hidden
            >
              {placeholder}
            </span>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              isFocused.current = true;
              checkActiveFormats();
            }}
            onBlur={() => {
              isFocused.current = false;
              const el = editorRef.current;
              if (el) onChange(el.innerHTML);
            }}
            onKeyUp={checkActiveFormats}
            onMouseUp={checkActiveFormats}
            className="rich-editor w-full px-4 py-3 font-jost text-sm text-[#2C3829] leading-relaxed outline-none"
            style={{ minHeight, wordBreak: 'break-word' }}
          />
        </div>
      </div>
    </div>
  );
}
