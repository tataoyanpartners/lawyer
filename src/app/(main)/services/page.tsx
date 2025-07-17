"use client";

import React, { useState } from "react";
import { useTranslations, useMessages } from "next-intl";
import {
  corporate,
  legal,
  civilRight,
  administrative,
  criminal,
  international,
} from "@/app/assets/svg";
import ContactUs from "@/custom/ContactUs";

export default function ServicesPage() {
  const t = useTranslations("Home");
  const messages = useMessages();

  const services = messages.Home.serviceCard;
  const keys = Object.keys(services);
  const [activeKey, setActiveKey] = useState(keys[0]);
  const active = services[activeKey];

  const flatItems: string[] = Array.isArray(active.subItems)
    ? (active.subItems as string[])
    : [];

  const nestedGroups = active.subiItems
    ? Object.values(active.subiItems)
    : !Array.isArray(active.subItems) && active.subItems
    ? Object.values(active.subItems as Record<string, any>)
    : [];

  const iconMap: Record<string, React.ReactNode> = {
    card1: corporate,
    card2: legal,
    card3: civilRight,
    card4: administrative,
    card5: criminal,
    card6: international,
    card7: legal,
    card8: administrative,
  };

  return (
    <>
      <section className=" max-w-[1280px] mx-auto mobile:w-full py-10 mobile:pt-0 relative">
        <img
          src="/services-background.webp"
          alt="about"
          className="w-full h-[450px] object-cover rounded-2xl mobile:rounded-none mobile:mt-1"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[52px] font-bold text-white z-50 mobile:text-3xl mobile:w-full mobile:text-center">
          {t("services")}
        </h1>
      </section>

      <div className="md:hidden sticky top-0 bg-[#212121] z-20">
        <div className="overflow-x-auto whitespace-nowrap px-4 py-2">
          {keys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className={`
                inline-block mx-1 px-4 py-2 rounded-full text-sm font-medium
                ${
                  key === activeKey
                    ? "bg-[#272727] text-white"
                    : "text-[#757677] hover:bg-[#2a2a2a]"
                }`}
            >
              {services[key].title}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 md:flex md:gap-8 py-8 mobile:p-0">
        <nav className="hidden md:block md:w-1/3">
          <ul className="space-y-2">
            {keys.map((key) => (
              <li
                key={key}
                onClick={() => setActiveKey(key)}
                className={`
                  cursor-pointer p-3 rounded-lg transition-colors
                  ${
                    key === activeKey
                      ? "bg-[#272727] text-white"
                      : "hover:bg-[#212121] text-[#757677]"
                  }`}
              >
                {services[key].title}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 md:mt-0 md:w-2/3">
          <div className="bg-[#212121] p-6 rounded-lg shadow mobile:rounded-none">
            <div className="flex items-center justify-center mb-4">
              {iconMap[activeKey]}
            </div>
            <h2 className="text-2xl font-semibold text-muted-light mb-2">
              {active.title}
            </h2>
            <p className="mb-4 text-base text-[#757677]">
              {active.description}
            </p>

            {flatItems.length > 0 && (
              <ul className="list-disc list-inside mb-4 text-[#757677] space-y-1">
                {flatItems.map((txt, idx) => (
                  <li key={idx}>{txt}</li>
                ))}
              </ul>
            )}

            {nestedGroups.map((group, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-lg mb-2 text-muted-light">
                  {group.title}
                </h3>
                <ul className="list-disc list-inside text-[#757677] space-y-1">
                  {group.subiItems.map((txt, idx) => (
                    <li key={idx}>{txt}</li>
                  ))}
                </ul>
              </div>
            ))}

            {active.bottomDescription && (
              <p className="text-base text-[#757677]">
                {active.bottomDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      <ContactUs />
    </>
  );
}
