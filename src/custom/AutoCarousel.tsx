"use client";

import { fetchPartners } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Partner } from "@/types/items";
import Image from "next/image";

export default function AutoCarousel() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    (async () => {
      setPartners(await fetchPartners());
    })();
  }, []);

  if (!partners.length) return null;

  return (
    <div className="relative w-full overflow-hidden bg-black py-4">
      <div className="flex w-max animate-scroll whitespace-nowrap">
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={`${partner._id}-${index}`}
            className="h-[100px] w-auto px-10 flex-shrink-0 flex items-center mobile:h-[50px] mobile:px-4"
          >
            <Image
              src={partner.image}
              width={190}
              height={47}
              alt="Partner"
              className="object-contain"
              priority={index < 5}
            />
          </div>
        ))}
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
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
