"use client";

import { arrowLeftDouble, arrowRightDouble } from "@/app/assets/svg";
import { fetchPartners } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Partner } from "@/types/items";
import Image from "next/image";

export const ArrowCarousel = () => {
  const [index, setIndex] = useState(0);
  const [partners, setPartners] = useState<Partner[]>([]);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? partners.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === partners.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    (async () => {
      const fetchedPartners = await fetchPartners();
      setPartners(fetchedPartners);
    })();
  }, []);

  if (partners.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex justify-center gap-8 ">
      {/* Left Arrow */}
      <button onClick={prevImage} className=" hover:bg-white/20 cursor-pointer">
        {arrowLeftDouble}
      </button>

      {/* Partner Image */}
      <div className="w-full flex justify-center">
        <Image
          src={partners[index].image}
          alt={`partner ${index}`}
          width={163}
          height={80}
          className="object-cover"
        />
      </div>

      {/* Right Arrow */}
      <button onClick={nextImage} className="hover:bg-white/20 cursor-pointer">
        {arrowRightDouble}
      </button>
    </div>
  );
};
