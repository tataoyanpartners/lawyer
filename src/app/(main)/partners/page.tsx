"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ContactUs from "@/custom/ContactUs";

export default function PartnerPage() {
  const t = useTranslations("Partners");
  const partners = [
    {
      _id: 1,
      name: t("partner1.name"),
      description: t("partner1.description"),
    },
    {
      _id: 2,
      name: t("partner2.name"),
      description: t("partner2.description"),
    },
    {
      _id: 3,
      name: t("partner3.name"),
      description: t("partner3.description"),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] mobile:h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-us-background-image.jpg"
            alt="About Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 mobile:bg-gradient-to-t mobile:from-black/60 mobile:via-black/30 mobile:to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-10 mobile:px-6 text-center">
          <h1 className="text-5xl font-bold text-white mobile:text-3xl leading-tight">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Partners Section */}
      <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
        <div className="px-10 mobile:px-6 flex flex-col gap-12 mobile:gap-8">


          <div className="grid grid-cols-1 gap-8 mobile:gap-6">
            {partners.map((partner) => (
              <div
                key={partner._id}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 mobile:p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0c0c0c] mobile:text-xl">
                      {partner.name}
                    </h3>
                  </div>
                  <p className="text-base text-[#6B7280] leading-relaxed mobile:text-sm text-justify">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactUs />
    </>
  );
}
