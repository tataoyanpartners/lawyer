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
      bottom: t("serviceCard.card1.bottomDescription"),
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
      bottom: t("serviceCard.card5.bottomDescription"),
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
      bottom: t("serviceCard.card7.bottomDescription"),
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
    <section className="max-w-[1280px] mx-auto mobile:w-full">
      <div className="flex flex-col gap-12 mobile:gap-4 py-10">
        <h1 className="text-4xl font-bold text-muted-light mobile:text-xl mobile:ml-6">
          {t("services")}
        </h1>
        <div className="mobile:px-2">
          <div
            className="overflow-hidden"
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].screenX)}
            onTouchMove={(e) => setTouchEndX(e.changedTouches[0].screenX)}
          >
            <div
              className={`flex gap-[${gapValue}px] mobile:gap-0 transition-transform duration-300`}
              style={transformStyle}
            >
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[360px] mobile:w-full"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>

          {/* desktop arrows */}
          <div className="mt-6 justify-end gap-6 md:flex hidden">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-20 disabled:opacity-50 rotate-180 cursor-pointer"
            >
              {arrowRight}
            </button>
            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-20 disabled:opacity-50 cursor-pointer"
            >
              {arrowRight}
            </button>
          </div>

          {/* mobile dots */}
          <div className="mt-4 flex justify-center space-x-2 md:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
