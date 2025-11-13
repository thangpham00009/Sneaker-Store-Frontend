import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function WarningModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[400px] transform transition-all duration-300 ease-in-out scale-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <AlertTriangle className="text-yellow-500" size={20} />
            {title || "Cảnh báo"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-6 text-gray-600">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 transition-all duration-300 ease-in-out border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white transition-all duration-300 ease-in-out bg-red-600 rounded-md hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
