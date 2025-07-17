"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Button } from "./Button";
import { useRef } from "react";
import axios from "axios";

type ModalSaveProps = {
  isOpen: boolean;
  onClose: () => void;
  addType: string;
  image: File | null;
  formData: { [key: string]: string };
  fetchAndUpdate: () => Promise<void>;
};

export default function ModalForDelete({
  isOpen,
  onClose,
  addType,
  image,
  formData,
  fetchAndUpdate,
}: ModalSaveProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, onClose);

  const uploadImage = async (image: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("/api/uploadImage", formData);
      return res.data.url;
    } catch (error) {
      console.error("Image upload failed", error);
      return null;
    }
  };

  const addLawyer = async () => {
    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }
    try {
      await axios.post("/api/lawyers", {
        image: imageUrl,
        name_en: formData.name_en,
        description_en: formData.description_en,
        surname_en: formData.surname_en,
        name_am: formData.name_am,
        description_am: formData.description_am,
        surname_am: formData.surname_am,
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  const addPartner = async () => {
    let imageUrl: string | null = null;

    if (image) {
      imageUrl = await uploadImage(image);
    }
    try {
      await axios.post("/api/partners", {
        image: imageUrl,
        description_en: formData.description_en,
        title_en: formData.title_en,
        description_am: formData.description_am,
        title_am: formData.title_am,
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  const addBlog = async () => {
    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }
    try {
      await axios.post("/api/blogs", {
        image: imageUrl,
        description_en: formData.description_en,
        description_am: formData.description_am,
        title_en: formData.title_en,
        title_am: formData.title_am,
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  const editPartner = async () => {
    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }
    try {
      await axios.put("/api/partners", {
        id: formData.id,
        image: imageUrl,
        description_en: formData.description_en,
        title_en: formData.title_en,
        description_am: formData.description_am,
        title_am: formData.title_am,
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  const editLawyer = async () => {
    let imageUrl: string | null = null;

    if (image) {
      imageUrl = await uploadImage(image);
    }
    try {
      await axios.put("/api/lawyers", {
        id: formData.id,
        image: imageUrl,
        name_en: formData.name_en,
        surname_en: formData.surname_en,
        name_am: formData.name_am,
        surname_am: formData.surname_am,
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  const editBlog = async () => {
    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }
    try {
      await axios.put("/api/blogs", {
        id: formData.id,
        image: imageUrl,
        description_am: formData.description_am,
        description_en: formData.description_en,
      });
      await fetchAndUpdate();
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  const handleSave = () => {
    switch (addType) {
      case "lawyer":
        addLawyer();
        break;
      case "partner":
        addPartner();
        break;
      case "blog":
        addBlog();
        break;
      case "editPartner":
        editPartner();
        break;
      case "editLawyer":
        editLawyer();
        break;
      case "editBlog":
        editBlog();
        break;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20  flex items-center justify-center ">
      <div
        className="bg-white p-8 rounded-xl shadow-xl min-w-[500px] relative text-center grid gap-16 animate-fadeIn"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-[#1D1D1F] pt-15">
          Are you sure you want to save these changes?
        </h2>

        <div className="flex justify-center text-2xl gap-4">
          <Button
            className="px-6 py-3 bg-white text-[#4040CDCC] rounded-lg hover:bg-gray-300 hover:text-[#4040cd]"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="px-6 py-3 bg-[#4040CDCC] text-white rounded-lg hover:bg-[#4040cd]"
            onClick={() => {
              handleSave();
            }}
          >
            Yes, Save
          </Button>
        </div>
      </div>
    </div>
  );
}
