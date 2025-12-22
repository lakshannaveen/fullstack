import React from "react";

/**
 * CustomModal - A reusable, highly visible modal component styled for premium dark/purple UI.
 * Props:
 * - isOpen: boolean
 * - title: string
 * - message: string | ReactNode
 * - onClose: function
 * - onConfirm?: function
 * - confirmText?: string
 * - cancelText?: string
 */
export default function CustomModal({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel",
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background-900/80 flex items-center justify-center z-50">
      <div className="bg-surface-600 rounded-2xl p-8 max-w-md w-full mx-4 border-2 border-primary-500 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-primary-500 mb-4 text-center drop-shadow-lg tracking-wide">
          {title}
        </h2>
        <div className="mb-7 text-center text-text-primary text-lg leading-relaxed font-semibold">
          {message}
        </div>
        {children}
        <div className="flex gap-4 mt-2">
          {onConfirm ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 py-2 bg-surface-500 hover:bg-surface-400 text-text-primary font-bold rounded-xl border border-secondary-400 transition text-base"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-2 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-accent-gold font-bold rounded-xl border border-accent-gold shadow-md transition text-base"
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-accent-gold font-bold rounded-xl border border-accent-gold shadow-md transition text-base"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
