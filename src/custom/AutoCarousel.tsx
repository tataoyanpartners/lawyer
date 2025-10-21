"use client";

import { fetchPartners } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Partner } from "@/types/items";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AutoCarousel() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const t = useTranslations("Home");

  useEffect(() => {
    (async () => {
      setPartners(await fetchPartners());
    })();
  }, []);

  if (!partners.length) return null;

  return (
    <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
      <div className="px-10 mobile:px-6 flex flex-col gap-12 mobile:gap-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#0c0c0c] mobile:text-2xl mb-3">
            {t("partners") || "Our Partners"}
          </h2>
          <p className="font-medium text-lg text-[#6B7280] mobile:text-base">
            {t("partners-description") || "Trusted by leading organizations"}
          </p>
        </div>

        {/* Partners Carousel */}
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 py-8 rounded-xl border-2 border-gray-200">
          <div className="flex w-max animate-scroll whitespace-nowrap">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner._id}-${index}`}
                className="h-[120px] w-auto px-12 flex-shrink-0 flex items-center mobile:h-[80px] mobile:px-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={partner.image}
                  width={200}
                  height={60}
                  alt={`Partner ${index + 1}`}
                  className="object-contain max-h-[60px] mobile:max-h-[40px]"
                  priority={index < 5}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
