import React from "react";
import { Button } from "./Button";

export default function InventoryModal({
  open,
  onClose,
  product,
  newStock,
  setNewStock,
  loading,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] p-6 bg-white rounded-xl shadow-xl animate-fadeIn">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Nhập kho:{" "}
          <span className="text-blue-600">{product?.name}</span>
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">
            Số lượng mới
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="Nhập số lượng..."
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>

          <Button
            variant="primary"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? "Đang lưu..." : "Cập nhật"}
          </Button>
        </div>
      </div>
    </div>
  );
}
