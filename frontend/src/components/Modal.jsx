export default function Modal({ isOpen, title, message, onClose, onConfirm, confirmText = 'OK' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background-900/80 flex items-center justify-center z-50">
      <div className="bg-surface-600 rounded-2xl p-7 max-w-sm w-full mx-4 border-2 border-primary-500 shadow-2xl">
        <h2 className="text-2xl font-extrabold text-primary-500 mb-3 text-center drop-shadow">{title}</h2>
        <p className="text-text-secondary mb-7 text-center">{message}</p>
        <div className="flex gap-4">
          {onConfirm ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 py-2 bg-surface-500 hover:bg-surface-400 text-text-primary font-bold rounded-xl border border-secondary-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-2 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-accent-gold font-bold rounded-xl border border-accent-gold shadow-md transition"
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-accent-gold font-bold rounded-xl border border-accent-gold shadow-md transition"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
