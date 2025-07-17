"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import ModalForSave from "./ModalForSave";
import { Button } from "./Button";
import Image from "next/image";

type ModalForAddingProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: { [key: string]: string }[];
  imageRequired?: boolean;
  editType: string;
  editIndex: string;
  fetchAndUpdate: () => Promise<void>;
};

// Helper to make "name_am" => "Name (AM)"
function formatLabel(key: string): string {
  return key
    .split("_")
    .map((part, index) =>
      index === 0
        ? part[0].toUpperCase() + part.slice(1)
        : `(${part.toUpperCase()})`
    )
    .join(" ");
}

export default function ModalForEdit({
  isOpen,
  onClose,
  title,
  fields,
  imageRequired = false,
  editType,
  editIndex,
  fetchAndUpdate,
}: ModalForAddingProps) {
  const [image, setImage] = useState<File | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    if (isOpen) {
      const initialData: { [key: string]: string } = {};
      fields.forEach((fieldObj) => {
        Object.entries(fieldObj).forEach(([key, value]) => {
          initialData[key] = value;
        });
      });
      setFormData(initialData);
    }
  }, [isOpen, fields]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-2xl w-[95%] max-w-[1024px] max-h-[90vh] overflow-y-auto  shadow-lg grid gap-10 animate-fadeIn"
      >
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl text-gray-500 hover:text-black"
        >
          ✕
        </button> */}

        <div className="flex justify-between items-center">
          <div className="pl-[45%]">
            <h2 className="text-[25px] font-bold text-center">{title}</h2>
          </div>
          <div>
            <button
              onClick={onClose}
              className="  text-[40px] text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
        {/* <h2 className="text-2xl font-bold text-center mb-6">{title}</h2> */}

        <div className="flex gap-8">
          <div className="flex-1 space-y-6 overflow-y-auto max-h-[400px] pr-2">
            {fields.map((fieldObj, i) =>
              Object.entries(fieldObj).map(([key]) =>
                key === "image" ? null : (
                  <div key={`${key}-${i}`}>
                    <label className="block text-gray-700 mb-2 text-base">
                      {formatLabel(key)}
                    </label>

                    {key.toLowerCase().includes("description") ? (
                      <textarea
                        placeholder={formatLabel(key)}
                        value={formData[key] || ""}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-base resize-none min-h-[150px]"
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={formatLabel(key)}
                        value={formData[key] || ""}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-base"
                        onChange={(e) => handleInputChange(e, key)}
                      />
                    )}
                  </div>
                )
              )
            )}
          </div>

          {imageRequired && (
            <div className="flex-1 space-y-6">
              <div>
                <p className="font-medium mb-2">Image Now</p>
                <Image
                  src={fields[0].image}
                  width={200}
                  height={150}
                  alt="Current"
                  className="rounded-lg object-cover"
                />
              </div>

              {!image ? (
                <div>
                  <label className="font-medium mb-2 block">Upload Image</label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    className="block w-full border-2 border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500 bg-gray-100 rounded-lg cursor-pointer hover:border-gray-400 hover:text-black transition"
                  >
                    Click to upload or drag file here
                  </label>
                </div>
              ) : (
                <div>
                  <p className="font-medium mb-2">Editing Image</p>
                  <Image
                    src={URL.createObjectURL(image)}
                    width={200}
                    height={150}
                    alt="Preview"
                    className="rounded-lg object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Delete Image
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-right">
          <Button
            onClick={() => setIsSaveModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg"
          >
            Save Changes
          </Button>
        </div>

        <ModalForSave
          isOpen={isSaveModalOpen}
          addType={editType}
          image={image}
          formData={{ ...formData, id: editIndex }}
          fetchAndUpdate={fetchAndUpdate}
          onClose={() => {
            setIsSaveModalOpen(false);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
