import React from 'react';
import { Button } from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  icon?: React.ReactNode;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  icon,
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={!isLoading ? onCancel : undefined}
      />

      {/* Modal Content */}
      <div className="relative bg-[#FDFAF6] w-full max-w-[400px] rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 fade-in duration-300 mx-4">
        <h3 className="font-cormorant text-2xl text-primary-dark italic mb-3 flex items-center gap-2">
          {icon && <span className="flex items-center text-[26px]">{icon}</span>}
          {title}
        </h3>
        <p className="font-jost text-on-surface-variant text-base mb-8">
          {message}
        </p>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="ghost"
            className="flex-1"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="auth-primary"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
