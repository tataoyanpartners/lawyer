"use client";

import React, { useState } from "react";
import { useTranslations, useMessages } from "next-intl";
import Image from "next/image";
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
      {/* Hero Section */}
      <section className="relative w-full h-[500px] mobile:h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/services-background.png"
            alt="Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 mobile:bg-gradient-to-t mobile:from-black/60 mobile:via-black/30 mobile:to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-10 mobile:px-6 text-center">
          <h1 className="text-5xl font-bold text-white mobile:text-3xl leading-tight">
            {t("services")}
          </h1>
        </div>
      </section>

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-0 bg-white border-b-2 border-gray-200 z-20">
        <div className="overflow-x-auto whitespace-nowrap px-4 py-3">
          {keys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className={`
                inline-block mx-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${key === activeKey
                  ? "bg-[#486BAD] text-white"
                  : "text-[#6B7280] hover:bg-gray-100"
                }`}
            >
              {services[key].title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-[1280px] mx-auto px-10 mobile:px-6 md:flex md:gap-8 py-16 mobile:py-10">
        {/* Desktop Navigation */}
        <nav className="hidden md:block md:w-1/3">
          <ul className="space-y-3">
            {keys.map((key) => (
              <li
                key={key}
                onClick={() => setActiveKey(key)}
                className={`
                  cursor-pointer p-4 rounded-xl transition-all duration-300 border-2
                  ${key === activeKey
                    ? "bg-[#486BAD] text-white border-transparent shadow-lg"
                    : "text-[#0c0c0c] hover:bg-gray-50 border-gray-200"
                  }`}
              >
                <span className="font-medium">{services[key].title}</span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <div className="mt-6 md:mt-0 md:w-2/3">
          <div className="bg-white border-2 border-gray-200 p-8 mobile:p-6 rounded-xl shadow-sm">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-[#486BAD] flex items-center justify-center mb-6">
              <div className="[&_svg]:w-9 [&_svg]:h-9 [&_svg_path]:fill-white [&_svg_g_path]:fill-white">
                {iconMap[activeKey]}
              </div>
            </div>

            {/* Title & Description */}
            <h2 className="text-3xl font-bold text-[#0c0c0c] mb-4 mobile:text-2xl">
              {active.title}
            </h2>
            <p className="mb-6 text-base text-[#6B7280] leading-relaxed mobile:text-sm">
              {active.description}
            </p>

            {/* Flat Items List */}
            {flatItems.length > 0 && (
              <ul className="mb-6 text-[#6B7280] space-y-3">
                {flatItems.map((txt, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#486BAD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="flex-1 text-base mobile:text-sm leading-relaxed">{txt}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Nested Groups */}
            {nestedGroups.map((group, i) => (
              <div key={i} className="mb-6">
                <h3 className="font-bold text-xl mb-4 text-[#486BAD] mobile:text-lg">
                  {group.title}
                </h3>
                <ul className="text-[#6B7280] space-y-3">
                  {group.subiItems.map((txt: string, idx: number) => (
                    <li key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5 text-[#486BAD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="flex-1 text-base mobile:text-sm leading-relaxed">{txt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Bottom Description */}
            {active.bottomDescription && (
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <p className="text-base text-[#6B7280] leading-relaxed mobile:text-sm">
                  {active.bottomDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ContactUs />
    </>
  );
}
