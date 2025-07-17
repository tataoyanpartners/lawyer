"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Button } from "./Button";
import { useRef } from "react";
import axios from "axios";

type ModalForDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  deleteType: string;
  fetchAndUpdate: () => Promise<void>;
};

export default function ModalForDelete({
  isOpen,
  onClose,
  id,
  deleteType,
  fetchAndUpdate,
}: ModalForDeleteProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, onClose);

  const deletePartner = async () => {
    try {
      await axios.delete("/api/partners", {
        data: { id },
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  const deleteLawyer = async () => {
    try {
      await axios.delete("/api/lawyers", {
        data: { id },
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  const deleteBlog = async () => {
    try {
      await axios.delete("/api/blogs", {
        data: { id },
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  const handleDelete = async () => {
    switch (deleteType) {
      case "lawyer":
        deleteLawyer();
        break;
      case "partner":
        deletePartner();
        break;
      case "blog":
        deleteBlog();
        break;

      default:
        break;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20  flex items-center justify-center text-">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-xl shadow-xl min-w-[500px] relative text-center grid gap-16 animate-fadeIn "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-[#1D1D1F] pt-15">
          Are you sure you want to delete this item?
        </h2>

        <div className="flex justify-center text-2xl gap-4">
          <Button
            className="px-6 py-3 bg-white text-[#B21F1FCC] rounded-lg hover:bg-gray-300 hover:text-red-700"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="px-6 py-3 bg-[#B21F1FCC] text-white rounded-lg hover:bg-red-700"
            onClick={handleDelete}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
