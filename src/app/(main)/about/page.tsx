"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

import ContactUs from "@/custom/ContactUs";

export default function About() {
  const t = useTranslations("About");

  return (
    <>
      <section className=" max-w-[1280px] mx-auto mobile:w-full pt-10 mobile:pt-4 relative">
        <img
          src="/about-us-background-image.jpg"
          alt="about"
          className="w-full h-[450px] object-cover rounded-2xl mobile:rounded-none"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[52px] font-bold text-white z-50 w-[740px] mobile:text-2xl mobile:w-[400px] text-center mobile:flex mobile:items-center mobile:justify-center mobile:flex-col">
          {t("title")}
          <p className="text-3xl text-center mobile:text-xl">{t("subtitle")}</p>
        </div>
      </section>
      <section className="max-w-[1280px] mx-auto mobile:w-full mt-16 mobile:mt-0">
        <div className="flex flex-col gap-40 mobile:gap-12 bg-[#212121] shadow-2xl rounded-2xl p-10 mobile:p-5 mobile:rounded-none ">
          <div className="grid gap-6 text-center mobile:m-5">
            <h2 className="text-2xl font-bold">{t("information.title")}</h2>
            <p className="text-muted-light leading-[120%] text-justify">
              {t("information.description")}
            </p>
          </div>
          <div className="w-full max-w-[1280px] flex gap-4 mobile:flex-col-reverse">
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col gap-4 max-w-[750px] mobile:max-w-full">
                <h2 className="text-2xl font-bold">
                  {t("team.memberNames.0")}
                </h2>
                <p>{t("team.memberPositions.0")}</p>
                <p className="text-sm text-muted-light text-justify">
                  {t("team.membersDescriptions.0")}
                </p>
              </div>
            </div>
            <div className=" w-[400px] h-[400px] mobile:max-w-full">
              <img
                src="/lawyers/tatoyan.JPG"
                alt="arman tatoyan"
                className="rounded-xl w-[400px] h-[400px] object-cover"
              />
            </div>
          </div>
          <div className="w-full max-w-[1280px] flex gap-4 mobile:flex-col">
            <div className=" w-[400px] h-[400px] mobile:max-w-full">
              <img
                src="/lawyers/armen-baghdasaryan.jpg"
                alt="armen-baghdasaryan"
                className="rounded-xl w-[400px] h-[400px] object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col gap-4 max-w-[750px] mobile:max-w-full">
                <h2 className="text-2xl font-bold">
                  {t("team.memberNames.1")}
                </h2>

                <p>{t("team.memberPositions.1")}</p>
                <p className="text-sm text-muted-light text-justify">
                  {t("team.membersDescriptions.1")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1280px] flex gap-4 mobile:flex-col-reverse">
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col gap-4 max-w-[750px] mobile:max-w-full">
                <h2 className="text-2xl font-bold">
                  {t("team.memberNames.2")}
                </h2>

                <p>{t("team.memberPositions.2")}</p>
                <p className="text-sm text-muted-light text-justify">
                  {t("team.membersDescriptions.2")}
                </p>
              </div>
            </div>
            <div className=" w-[400px] h-[400px] mobile:max-w-full">
              <img
                src="/lawyers/anna.JPG"
                alt="anna"
                className="rounded-xl w-[400px] h-[400px] object-cover"
              />
            </div>
          </div>
          <div className="grid gap-6 text-center mobile:m-5">
            <h2 className="font-bold text-3xl  text-muted-light mobile:text-xl">
              {t("mission")}
            </h2>
            <p className="font-medium text-muted-light text-sm text-justify">
              {t("missionDescription")}
            </p>
          </div>
        </div>
      </section>
      <ContactUs />
    </>
  );
}
