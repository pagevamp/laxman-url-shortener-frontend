"use client";

import clsx from "clsx";
import { FC, ReactNode, useEffect, useRef, ReactEventHandler } from "react";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  className = "",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose: ReactEventHandler<HTMLDialogElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose?.();
      }}
      className={clsx(
        `
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          backdrop:bg-black/30 backdrop:backdrop-blur-sm
          p-0 border-none rounded-4xl
          w-full max-w-lg
        `,
        className
      )}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-bold cursor-pointer"
        >
          ✕
        </button>

        {title && (
          <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {title}
          </h1>
        )}

        <div className="flex justify-center">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
