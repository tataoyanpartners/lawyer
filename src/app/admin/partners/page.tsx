"use client";
import ModalForAdding from "@/custom/ModalForAdding";
import ModalForDelete from "@/custom/ModalForDelete";
import ModalForEdit from "@/custom/ModalForEdit";
import { fetchPartners } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Button } from "@/custom/Button";
import { more } from "@/app/assets/svg";
import { Partner } from "@/types/items";
import { Area } from "@/custom/Area";
import Image from "next/image";

export default function Partners() {
  const [addPartnerIsOpen, setAddPartnerIsOpen] = useState(false);
  const [partnersEdit, setPartnersEdit] = useState<number | null>(null);
  const [partnersDelet, setPartnersDelet] = useState<number | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnerId, setPartnerId] = useState<string>("");
  const [selectedPopupIndex, setSelectedPopupIndex] = useState<number | null>(
    null
  );

  const fetchPartnersAndSet = async () => {
    const data = await fetchPartners();
    if (data) {
      setPartners(data);
    }
  };

  useEffect(() => {
    fetchPartnersAndSet();
  }, []);

  return (
    <>
      <div className="grid gap-10 ">
        <div className="flex justify-between font-semibold text-2xl p-10  items-center">
          <h1 className="text-3xl font-bold">Our Partners</h1>
          <Button
            className="px-10 py-5 rounded-2xl text-white"
            onClick={() => setAddPartnerIsOpen(true)}
          >
            Add Partner +
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-10 p-10">
          {partners.map((partner, index) => (
            <div key={index}>
              <Area className="rounded-[4px] flex flex-col gap-5 bg-white p-8 border-[#ad90de]">
                <div className="relative flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedPopupIndex(
                        selectedPopupIndex === index ? null : index
                      );
                    }}
                    className="cursor-pointer p-3 hover:bg-[#d0d0d0] rounded-[10px]"
                  >
                    {more}
                  </button>
                  {/* Popup по click */}
                  {selectedPopupIndex === index && (
                    <div className="absolute right-0 top-full mt-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[220px]">
                      <button
                        onClick={() => {
                          setPartnersEdit(index);
                          setSelectedPopupIndex(null);
                          setPartnerId(partner._id);
                        }}
                        className="px-4 py-2 text-left text-2xl hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setPartnersDelet(index);
                          setSelectedPopupIndex(null);
                          setPartnerId(partner._id);
                        }}
                        className="px-4 py-2 text-left text-2xl text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid text-start gap-3">
                  <Image
                    src={partner.image}
                    priority
                    alt={`Lawyer Image ${index + 1}`}
                    width={100}
                    height={50}
                    className="rounded-[4px] object-cover"
                  />
                  <h3 className="font-bold text-lg">{partner.title_am}</h3>
                  <h3 className="font-bold text-lg">{partner.title_en}</h3>
                </div>
                <p className="font-semibold text-sm text-muted">
                  {partner.description_am} {partner.description_en}
                </p>
              </Area>
            </div>
          ))}
        </div>
      </div>
      <ModalForAdding
        isOpen={addPartnerIsOpen}
        onClose={() => setAddPartnerIsOpen(false)}
        title="Add Partner"
        fields={["title", "description"]}
        imageRequired={true}
        addType="partner"
        fetchAndUpdate={fetchPartnersAndSet}
      />

      {partnersEdit !== null && (
        <ModalForEdit
          title="Partner Update"
          isOpen={partnersEdit !== null}
          onClose={() => setPartnersEdit(null)}
          imageRequired={true}
          editType="editPartner"
          editIndex={partnerId}
          fetchAndUpdate={fetchPartnersAndSet}
          fields={[
            {
              image: partners[partnersEdit].image,
              description_am: partners[partnersEdit].description_am,
              description_en: partners[partnersEdit].description_en,
              title_am: partners[partnersEdit].title_am,
              title_en: partners[partnersEdit].title_en,
            },
          ]}
        />
      )}
      {partnersDelet !== null && (
        <ModalForDelete
          id={partnerId}
          isOpen={partnersDelet !== null}
          onClose={() => {
            setPartnersDelet(null);
          }}
          deleteType="partner"
          fetchAndUpdate={fetchPartnersAndSet}
        />
      )}
    </>
  );
}
