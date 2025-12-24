"use client";

import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import ContactUs from "@/custom/ContactUs";

export default function About() {
  const t = useTranslations("About");

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] mobile:h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-us-background-image.png"
            alt="About Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 mobile:bg-gradient-to-t mobile:from-black/60 mobile:via-black/30 mobile:to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-10 mobile:px-6 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold text-white mobile:text-3xl leading-tight">
              {t("title")}
            </h1>
            <p className="text-2xl font-medium text-white/90 mobile:text-xl">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
        <div className="px-10 mobile:px-6 flex flex-col gap-16 mobile:gap-12">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-4xl font-bold text-[#0c0c0c] mobile:text-2xl mb-8 text-center">
              {t("information.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.raw("information.points").map((point: string, index: number) => (
                <div key={index} className="flex gap-4 bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#486BAD] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base text-[#6B7280] leading-relaxed mobile:text-sm flex-1">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="flex flex-col gap-16 mobile:gap-12">
            {/* Member 1 */}
            <div className="flex gap-8 mobile:flex-col-reverse items-center bg-white border-2 border-gray-200 rounded-xl p-8 mobile:p-6">
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-3xl font-bold text-[#0c0c0c] mobile:text-2xl">
                  {t("team.memberNames.0")}
                </h3>
                <p className="text-lg font-semibold text-[#486BAD] mobile:text-base">
                  {t("team.memberPositions.0")}
                </p>
                <p className="text-base text-[#6B7280] leading-relaxed mobile:text-sm text-justify">
                  {t("team.membersDescriptions.0")}
                </p>
              </div>
              <div className="w-[350px] h-[350px] mobile:w-full mobile:h-[300px] flex-shrink-0">
                <Image
                  src="/lawyers/tatoyan.JPG"
                  alt={t("team.memberNames.0")}
                  width={350}
                  height={350}
                  className="rounded-xl w-full h-full object-cover object-[center_10%]"
                />
              </div>
            </div>

            {/* Member 2 */}
            <div className="flex gap-8 mobile:flex-col items-center bg-white border-2 border-gray-200 rounded-xl p-8 mobile:p-6">
              <div className="w-[350px] h-[350px] mobile:w-full mobile:h-[300px] flex-shrink-0">
                <Image
                  src="/lawyers/armen-baghdasaryan.jpg"
                  alt={t("team.memberNames.1")}
                  width={350}
                  height={350}
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-3xl font-bold text-[#0c0c0c] mobile:text-2xl">
                  {t("team.memberNames.1")}
                </h3>
                <p className="text-lg font-semibold text-[#486BAD] mobile:text-base">
                  {t("team.memberPositions.1")}
                </p>
                <p className="text-base text-[#6B7280] leading-relaxed mobile:text-sm text-justify">
                  {t("team.membersDescriptions.1")}
                </p>
              </div>
            </div>

            {/* Member 3 */}
            <div className="flex gap-8 mobile:flex-col-reverse items-center bg-white border-2 border-gray-200 rounded-xl p-8 mobile:p-6">
              <div className="flex-1 flex flex-col gap-4">
                <h3 className="text-3xl font-bold text-[#0c0c0c] mobile:text-2xl">
                  {t("team.memberNames.2")}
                </h3>
                <p className="text-lg font-semibold text-[#486BAD] mobile:text-base">
                  {t("team.memberPositions.2")}
                </p>
                <p className="text-base text-[#6B7280] leading-relaxed mobile:text-sm text-justify">
                  {t("team.membersDescriptions.2")}
                </p>
              </div>
              <div className="w-[350px] h-[350px] mobile:w-full mobile:h-[300px] flex-shrink-0">
                <Image
                  src="/lawyers/anna.JPG"
                  alt={t("team.memberNames.2")}
                  width={350}
                  height={350}
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mobile:p-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-bold text-[#0c0c0c] mobile:text-2xl">
                {t("mission")}
              </h3>
              <p className="text-base text-[#6B7280] leading-relaxed mobile:text-sm text-justify">
                {t("missionDescription")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {t.raw("missionServices").map((service: string, index: number) => (
                  <li key={index} className="text-base text-[#6B7280] leading-relaxed mobile:text-sm">
                    {service}
                  </li>
                ))}
              </ul>
              <p className="text-base text-[#6B7280] leading-relaxed mobile:text-sm text-justify">
                {t("missionDescriptionBottom")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactUs />
    </>
  );
}
