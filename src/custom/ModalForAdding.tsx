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
    lang: "am" | "en" | "ru"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [`${field}_${lang}`]: e.target.value,
    }));
  };

  const checkFilles = () => {
    const hasEmptyRequiredField = fields.some((field) => {
      return (
        !formData[`${field}_am`] ||
        formData[`${field}_am`].trim() === "" ||
        !formData[`${field}_en`] ||
        formData[`${field}_en`].trim() === ""
      );
    });

    if (hasEmptyRequiredField) {
      setError("Խնդրում ենք լրացնել բոլոր հայերեն և անգլերեն դաշտերը (ռուսերենը ոչ պարտադիր է):");
      return;
    }

    if (imageRequired && !image) {
      setError("Նկարը պարտադիր է:");
      return;
    }

    setError("");
    console.log("Form data when saving:", formData);
    setIsSaveModalOpen(true);
  };

  const renderInput = (field: string, lang: "am" | "en" | "ru") => {
    const langLabels = { am: "Հայ", en: "Անգլ", ru: "Ռուս (կամավոր)" };
    const langPlaceholders = { am: "հայերեն", en: "անգլերեն", ru: "ռուսերեն (կամավոր)" };
    
    const label = `${formatFieldLabel(field)} (${langLabels[lang]})`;
    const placeholder = `Մուտքագրեք ${formatFieldLabel(field).toLowerCase()}-ը ${langPlaceholders[lang]}`;

    const value = formData[`${field}_${lang}`] || "";

    return (
      <div className="w-[250px]">
        <label className="text-[#1e3a8a] font-medium">{label}</label>
        {field.includes("description") ? (
          <textarea
            placeholder={placeholder}
            className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg min-h-[150px] resize-none focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
            value={value}
            onChange={(e) => handleInputChange(e, field, lang)}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-3 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
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
        className="bg-white p-6 rounded-xl shadow-lg h-[650px] min-w-[1200px] grid gap-5 animate-fadeIn border border-gray-200"
      >
        <div className="text-2xl leading-[100%] grid gap-6 p-5 text-[#1e3a8a]">
          <div className="flex justify-between">
            <div className="pl-[45%]">
              <h2 className="text-[25px] font-bold text-center text-[#1e3a8a]">{title}</h2>
            </div>
            <div>
              <button
                onClick={onClose}
                className="text-[40px] text-gray-500 hover:text-[#1e3a8a]"
              >
                ✕
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-center text-xl">{error}</p>}

          <div className="flex justify-center gap-20">
            <div className="grid gap-5">
              {fields.map((field) => (
                <div key={field} className="flex gap-4 text-lg">
                  {renderInput(field, "am")}
                  {renderInput(field, "en")}
                  {renderInput(field, "ru")}
                </div>
              ))}
            </div>

            {imageRequired && (
              <div className="grid items-start w-[30%]">
                <p className="text-xl font-bold text-[#1e3a8a]">Վերբեռնել նկար</p>
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
                      className="w-full flex items-center justify-center px-4 py-6 bg-gray-50 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition"
                    >
                      <span className="text-sm">
                        Սեղմեք վերբեռնելու կամ քաշեք ֆայլը այստեղ
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
                      Ջնջել նկարը
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
              Պահպանել փոփոխությունները
            </Button>
          </div> */}

          <div className=" text-right">
            <Button
              onClick={checkFilles}
              className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-lg px-6 py-3 rounded-lg"
            >
              Պահպանել փոփոխությունները
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
