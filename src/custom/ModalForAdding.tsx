"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import ModalForSave from "./ModalForSave";
import { useRef, useState } from "react";
import { Button } from "./Button";
import Image from "next/image";

type ModalForAddingProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: string[];
  imageRequired?: boolean;
  addType: string;
  fetchAndUpdate: () => Promise<void>;
};

export default function ModalForAdding({
  isOpen,
  onClose,
  title,
  fields,
  imageRequired = false,
  addType,
  fetchAndUpdate,
}: ModalForAddingProps) {
  const [image, setImage] = useState<File | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, () => {
    onClose();
    setError("");
  });

  const formatFieldLabel = (field: string) =>
    field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    lang: "am" | "en"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [`${field}_${lang}`]: e.target.value,
    }));
  };

  const checkFilles = () => {
    const hasEmptyField = fields.some((field) => {
      return (
        !formData[`${field}_am`] ||
        formData[`${field}_am`].trim() === "" ||
        !formData[`${field}_en`] ||
        formData[`${field}_en`].trim() === ""
      );
    });

    if (hasEmptyField) {
      setError("Please fill in all Armenian and English fields.");
      return;
    }

    if (imageRequired && !image) {
      setError("Image is required.");
      return;
    }

    setError("");
    setIsSaveModalOpen(true);
  };

  const renderInput = (field: string, lang: "am" | "en") => {
    const label = `${formatFieldLabel(field)} (${lang === "am" ? "AM" : "EN"})`;
    const placeholder = `Enter ${formatFieldLabel(field)} in ${
      lang === "am" ? "AM" : "EN"
    }`;

    const value = formData[`${field}_${lang}`] || "";

    return (
      <div className="w-[250px]">
        <label className="text-gray-600">{label}</label>
        {field.includes("description") ? (
          <textarea
            placeholder={placeholder}
            className="w-full px-2 py-3 bg-[#F3F4F6] rounded-[15px] min-h-[150px] resize-none"
            value={value}
            onChange={(e) => handleInputChange(e, field, lang)}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-2 py-3 bg-[#F3F4F6] rounded-[15px]"
            value={value}
            onChange={(e) => handleInputChange(e, field, lang)}
          />
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-xl shadow-lg h-[650px]  min-w-[1024px] grid gap-5 animate-fadeIn"
      >
        <div className="text-2xl leading-[100%] grid gap-6 p-5 text-[#1D1D1FCC]">
          <div className="flex justify-between">
            <div className="pl-[45%]">
              <h2 className="text-[25px] font-bold text-center">{title}</h2>
            </div>
            <div>
              <button
                onClick={onClose}
                className="text-[40px] text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-center text-xl">{error}</p>}

          <div className="flex justify-center gap-20">
            <div className="grid gap-5">
              {fields.map((field) => (
                <div key={field} className="flex gap-6 text-lg">
                  {renderInput(field, "am")}
                  {renderInput(field, "en")}
                </div>
              ))}
            </div>

            {imageRequired && (
              <div className="grid items-start w-[30%]">
                <p className="text-xl font-bold">Upload an Image</p>
                {!image && (
                  <>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full flex items-center justify-center px-4 py-6 bg-[#F3F4F6] text-gray-500 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 hover:text-black transition"
                    >
                      <span className="text-sm">
                        Click to upload or drag file here
                      </span>
                    </label>
                  </>
                )}

                {image && (
                  <div className="mt-2 grid gap-4">
                    <div className="relative w-full max-w-[150px] h-[150px]">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        priority
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <button
                      onClick={removeImage}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-fit"
                    >
                      Delete image
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* <div className="grid justify-end pt-10">
            <Button
              onClick={checkFilles}
              className="text-xl text-white   rounded-[20px] cursor-pointer px-6"
            >
              Save Changes
            </Button>
          </div> */}

          <div className=" text-right">
            <Button
              onClick={checkFilles}
              className=" text-white text-lg px-6 py-3 rounded-lg"
            >
              Save Changes
            </Button>
          </div>

          <ModalForSave
            isOpen={isSaveModalOpen}
            formData={formData}
            addType={addType}
            image={image}
            fetchAndUpdate={fetchAndUpdate}
            onClose={() => {
              setIsSaveModalOpen(false);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
