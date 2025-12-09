"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ onClose, title, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg p-6 relative mx-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-bold cursor-pointer"
        >
          ✕
        </button>

        {title && (
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
        )}

        <div className="flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
}
