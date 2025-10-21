"use client";

import React, { useState, useEffect } from "react";
import {
  arrowRight,
  corporate,
  civilRight,
  administrative,
  international,
  legal,
  criminal,
} from "@/app/assets/svg";
import { useTranslations, useMessages } from "next-intl";
import { ServiceCard } from "@/custom/ServiceCart";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ServicesSection() {
  const t = useTranslations("Home");
  const messages = useMessages();
  const [currentIndex, setCurrentIndex] = useState(0);

  // detect mobile <768px
  const isMobile = useMediaQuery("(max-width: 767px)");

  // touch positions
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // swipe detection
  useEffect(() => {
    if (touchStartX === null || touchEndX === null) return;
    const dx = touchStartX - touchEndX;
    const THRESHOLD = 50;
    if (dx > THRESHOLD) {
      // swipe left → next
      next();
    } else if (dx < -THRESHOLD) {
      // swipe right → prev
      prev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  }, [touchEndX]);

  // build your cards
  const cards = [
    {
      icon: corporate,
      data: messages.Home.serviceCard.card1,
      link: "/services#banking",
    },
    {
      icon: legal,
      data: messages.Home.serviceCard.card2,
      link: "/services#corporate",
    },
    {
      icon: civilRight,
      data: messages.Home.serviceCard.card3,
      link: "/services#administrative",
    },
    {
      icon: administrative,
      data: messages.Home.serviceCard.card4,
      link: "/services#civil",
    },
    {
      icon: international,
      data: messages.Home.serviceCard.card5,

      link: "/services#criminal",
    },
    {
      icon: criminal,
      data: messages.Home.serviceCard.card6,
      link: "/services#international",
    },
    {
      icon: legal,
      data: messages.Home.serviceCard.card7,

      link: "/services#expertise",
    },
    {
      icon: administrative,
      data: messages.Home.serviceCard.card8,
      link: "/services#negotiation",
    },
  ].map((c, i) => {
    let subs: string[] | undefined;
    if (Array.isArray((c.data as any).subItems)) {
      subs = (c.data as any).subItems;
    } else if ((c.data as any).subiItems) {
      subs = Object.values((c.data as any).subiItems).flatMap((g: any) => [
        g.title,
        ...(g.subiItems || []),
      ]);
    }
    return (
      <ServiceCard
        key={i}
        icone={c.icon}
        title={(c.data as any).title}
        description={(c.data as any).description}
        subItems={subs}
        bottomDescription={c.bottom}
        link={c.link}
      />
    );
  });

  const visibleCards = isMobile ? 1 : 3;
  const GAP_PX = 62;
  const CARD_W = 360;
  const maxIndex = Math.max(cards.length - visibleCards, 0);
  const gapValue = isMobile ? 0 : GAP_PX;

  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const next = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));

  // compute transform
  const transformStyle = isMobile
    ? { transform: `translateX(-${currentIndex * 100}%)`, gap: gapValue }
    : {
      transform: `translateX(-${currentIndex * (CARD_W + GAP_PX)}px)`,
      gap: gapValue,
    };

  return (
    <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
      <div className="flex flex-col gap-12 mobile:gap-6">
        <div className="flex justify-between items-center px-4 mobile:px-6">
          <div>
            <h2 className="text-4xl font-bold text-[#0c0c0c] mobile:text-2xl">
              {t("services")}
            </h2>
          </div>

          {/* desktop arrows */}
          <div className="gap-3 md:flex hidden">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 hover:border-[#1e3a8a] hover:bg-[#1e3a8a] rounded-full z-20 disabled:opacity-30 disabled:cursor-not-allowed rotate-180 cursor-pointer transition-all duration-300 [&_svg]:w-5 [&_svg]:h-5 [&_svg_path]:stroke-[#0c0c0c] hover:[&_svg_path]:stroke-white disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:[&_svg_path]:stroke-[#0c0c0c]"
            >
              {arrowRight}
            </button>
            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-200 hover:border-[#1e3a8a] hover:bg-[#1e3a8a] rounded-full z-20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 [&_svg]:w-5 [&_svg]:h-5 [&_svg_path]:stroke-[#0c0c0c] hover:[&_svg_path]:stroke-white disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:[&_svg_path]:stroke-[#0c0c0c]"
            >
              {arrowRight}
            </button>
          </div>
        </div>

        <div className="mobile:px-0 px-4">
          <div
            className="overflow-hidden"
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].screenX)}
            onTouchMove={(e) => setTouchEndX(e.changedTouches[0].screenX)}
          >
            <div
              className={`flex gap-[${gapValue}px] mobile:gap-0 transition-transform duration-500 ease-out`}
              style={transformStyle}
            >
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[360px] mobile:w-full "
                >
                  {card}
                </div>
              ))}
            </div>
          </div>

          {/* mobile dots */}
          <div className="mt-6 flex justify-center space-x-2 md:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-[#1e3a8a] w-8" : "bg-gray-300 w-2"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
