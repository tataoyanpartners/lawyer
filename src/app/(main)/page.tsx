"use client";
import { fetchBlogs } from "@/lib/actions";
import { useLocale, useTranslations } from "next-intl";
import { Blogs } from "@/types/items";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  afforable,
  approachable,
  arrowRight,
  clock,
  experienced,
  flexible,
  mail,
  phoneIcon,
  telephone,
} from "@/app/assets/svg";
import ServicesSection from "@/components/ServiceSection";

export default function Home() {
  const [news, setNews] = useState<Blogs[] | undefined>([]);
  const t = useTranslations("Home");
  const members = useTranslations("About.team");
  const locale = useLocale();

  const lawyers = [
    {
      id: 1,
      name: members("memberNames.0"),
      image: "/lawyers/tatoyan.JPG",
      description: "lorem ipsum",
    },
    {
      id: 2,
      image: "/lawyers/armen-baghdasaryan.jpg",
      name: members("memberNames.1"),
      description: "lorem ipsum",
    },
    {
      id: 3,
      name: members("memberNames.2"),
      image: "/lawyers/anna.JPG",
      description: "lorem ipsum",
    },
  ];

  useEffect(() => {
    (async () => {
      setNews((await fetchBlogs()).slice(0, 3));
    })();
  }, []);

  return (
    <>
      <section className="relative w-full h-[600px] mobile:h-[450px] flex items-center mobile:items-end justify-center mobile:pb-8">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/lawyer-home-background.jpg"
            alt="Hero Background"
            fill
            className="object-cover mobile:object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 mobile:bg-gradient-to-t mobile:from-black/80 mobile:via-black/40 mobile:to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 mobile:px-5 w-full">
          <div className="max-w-[650px] mobile:max-w-full flex flex-col gap-8 mobile:gap-5">
            <h1 className="font-bold text-4xl mobile:text-[28px] mobile:leading-tight text-white leading-tight">
              {t("experiance")}
            </h1>
            <p className="font-medium text-base mobile:text-[15px] mobile:leading-relaxed text-white/90 leading-relaxed">
              {t("description-experiance")}
            </p>
            <div className="flex gap-4 mobile:flex-col mobile:gap-3 mobile:w-full">
              <Link
                href="/contact"
                className="font-medium text-lg rounded-[50px] py-3 px-8 bg-[#1e3a8a] hover:bg-[#172554] mobile:text-base mobile:py-3 mobile:px-6 mobile:w-full transition-all text-white flex items-center justify-center gap-3 smallIcon18 shadow-lg hover:shadow-xl"
              >
                {phoneIcon}
                {t("btn-consulation")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
        <div className="px-10 mobile:px-6 flex flex-col gap-12 mobile:gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#0c0c0c] mobile:text-2xl mb-3">
              {t("makes")}
            </h2>
          </div>
          <ul className="grid grid-cols-4 gap-6 mobile:grid-cols-1 mobile:gap-6">
            <li className="group">
              <div className="h-full flex flex-col items-center justify-center gap-6 rounded-xl bg-white border-2 border-gray-200 py-8 px-6 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] flex items-center justify-center">
                  <div className="[&_svg]:w-9 [&_svg]:h-9 [&_svg_path]:fill-white">
                    {React.cloneElement(experienced)}
                  </div>
                </div>
                <p className="font-semibold text-base text-[#0c0c0c] mobile:text-base text-center leading-relaxed">
                  {t("makes-item1")}
                </p>
              </div>
            </li>
            <li className="group">
              <div className="h-full flex flex-col items-center justify-center gap-6 rounded-xl bg-white border-2 border-gray-200 py-8 px-6 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] flex items-center justify-center">
                  <div className="[&_svg]:w-9 [&_svg]:h-9 [&_svg_path]:fill-white">
                    {afforable}
                  </div>
                </div>
                <p className="font-semibold text-base text-[#0c0c0c] mobile:text-base text-center leading-relaxed">
                  {t("makes-item2")}
                </p>
              </div>
            </li>
            <li className="group">
              <div className="h-full flex flex-col items-center justify-center gap-6 rounded-xl bg-white border-2 border-gray-200 py-8 px-6 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] flex items-center justify-center">
                  <div className="[&_svg]:w-9 [&_svg]:h-9 [&_svg_path]:stroke-white [&_svg_path]:stroke-[1.5]">
                    {flexible}
                  </div>
                </div>
                <p className="font-semibold text-base text-[#0c0c0c] mobile:text-base text-center leading-relaxed">
                  {t("makes-item3")}
                </p>
              </div>
            </li>
            <li className="group">
              <div className="h-full flex flex-col items-center justify-center gap-6 rounded-xl bg-white border-2 border-gray-200 py-8 px-6 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] flex items-center justify-center">
                  <div className="[&_svg]:w-9 [&_svg]:h-9 [&_svg_path]:stroke-white [&_svg_path]:!stroke-[6] [&_svg_g_path]:stroke-white [&_svg_g_path]:!stroke-[6]">
                    {approachable}
                  </div>
                </div>
                <p className="font-semibold text-base text-[#0c0c0c] mobile:text-base text-center leading-relaxed">
                  {t("makes-item4")}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
        <div className="px-10 mobile:px-6 flex flex-col gap-12 mobile:gap-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#0c0c0c] mobile:text-2xl mb-3">
              {t("attorneys")}
            </h2>
            <p className="font-medium text-lg text-[#6B7280] mobile:text-base max-w-[800px] mx-auto">
              {t("attorneys-description")}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-8 mobile:grid-cols-1 mobile:gap-6">
            {lawyers.map((lawyer, index) => (
              <div
                key={lawyer.id}
                className="group flex flex-col bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative overflow-hidden h-[400px] mobile:h-[300px]">
                  <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    width={400}
                    height={400}
                    quality={100}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${index === lawyers.length - 1 ? 'object-[center_10%]' : ''}`}
                  />
                </div>
                <div className="p-6 mobile:p-5 flex flex-col gap-4">
                  <h3 className="text-xl font-bold text-[#0c0c0c] mobile:text-lg">
                    {lawyer.name}
                  </h3>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 text-[#1e3a8a] font-semibold text-base mobile:text-sm hover:gap-3 transition-all duration-300"
                  >
                    {t("btn-learn")}
                    <span className="transition-transform duration-300">
                      {arrowRight}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full h-[600px] mobile:h-[500px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-us-background.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
            style={{ objectPosition: "1% 33%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 mobile:bg-gradient-to-t mobile:from-black/60 mobile:via-black/30 mobile:to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-10 mobile:px-6 w-full">
          <div className="flex justify-end mobile:justify-start">
            <div className="flex flex-col gap-10 mobile:gap-8 max-w-[700px] mobile:max-w-full">
              <div className="flex flex-col gap-6">
                <h2 className="font-bold text-4xl text-white mobile:text-2xl leading-tight">
                  {t("background-title")}
                </h2>
                <p className="font-medium text-lg text-white/90 mobile:text-base leading-relaxed">
                  {t("background-description")}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="tel:+37494450054"
                  className="flex items-center gap-4 text-white"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="[&_svg]:w-6 [&_svg]:h-6 [&_svg_path]:stroke-white">
                      {telephone}
                    </div>
                  </div>
                  <p className="font-semibold text-xl mobile:text-lg">
                    +374 94 45 00 54
                  </p>
                </a>

                <a
                  href="mailto:tatoyan.partners@gmail.com"
                  className="flex items-center gap-4 text-white"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="[&_svg]:w-6 [&_svg]:h-6 [&_svg_path]:stroke-white">
                      {mail}
                    </div>
                  </div>
                  <p className="font-semibold text-xl mobile:text-lg">
                    tatoyan.partners@gmail.com
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="max-w-[1280px] mx-auto mobile:w-full">
        <div className="flex flex-col p-10 mobile:p-6 gap-10">
          <h2 className="text-muted-light text-3xl font-bold mobile:text-xl text-center">
            {t("clients-say")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="cart-bg-grey hover:bg-[#0505] transition py-9 px-6 ">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Image
                    src="/client1.png"
                    alt="client1"
                    width={48}
                    height={48}
                    className="rounded-4xl object-cover"
                  />
                  <div className="flex flex-col">
                    <h3> {t("clents-comments.client1.name")}</h3>
                    <p>27.07.2024</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {star}
                  {star}
                  {star}
                  {star}
                  {star}
                </div>
                <p className="text-muted font-medium text-base mobile:text-sm">
                  {t("clents-comments.client1.thinks")}
                </p>
              </div>
            </div>

            <div className="cart-bg-grey hover:bg-[#0505] transition py-9 px-6">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Image
                    src="/client1.png"
                    alt="client1"
                    width={48}
                    height={48}
                    className="rounded-4xl object-cover"
                  />
                  <div className="flex flex-col">
                    <h3>{t("clents-comments.client1.name")}</h3>
                    <p>27.07.2024</p>
                  </div>
                </div>
                <div className="flex">
                  {star}
                  {star}
                  {star}
                  {star}
                  {star}
                </div>
                <div>
                  <p className="text-muted font-medium text-base mobile:text-sm">
                    {t("clents-comments.client1.thinks")}
                  </p>
                </div>
              </div>
            </div>
            <div className="cart-bg-grey hover:bg-[#0505] transition py-9 px-6">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Image
                    src="/client1.png"
                    alt="client1"
                    width={48}
                    height={48}
                    className="rounded-4xl object-cover"
                  />
                  <div className="flex flex-col">
                    <h3>{t("clents-comments.client1.name")}</h3>
                    <p>27.07.2024</p>
                  </div>
                </div>
                <div className="flex">
                  {star}
                  {star}
                  {star}
                  {star}
                  {star}
                </div>
                <div>
                  <p className="text-muted font-medium text-base mobile:text-sm">
                    {t("clents-comments.client1.thinks")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
        <div className="px-10 mobile:px-6 flex flex-col gap-12 mobile:gap-8">
          <div className="text-center">
            <h2 className="font-bold text-4xl text-[#0c0c0c] mobile:text-2xl mb-3">
              {t("stay")}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile:gap-6">
            {news?.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="bg-gray-300 h-[240px] w-full" />
                  <div className="p-6 flex flex-col gap-4">
                    <div className="bg-gray-300 h-6 w-3/4 rounded" />
                    <div className="bg-gray-300 h-20 w-full rounded" />
                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-300 h-4 w-4 rounded-full" />
                        <div className="bg-gray-300 h-4 w-24 rounded" />
                      </div>
                      <div className="bg-gray-300 h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
              : news?.map((newsItem) => (
                <Link
                  href={`/news/${newsItem._id}`}
                  key={newsItem._id}
                  className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
                >
                  <div className="relative overflow-hidden h-[240px]">
                    <Image
                      src={newsItem.image}
                      alt={newsItem[`title_${locale}` as keyof Blogs] as string || "News"}
                      width={400}
                      height={240}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 mobile:p-5 flex flex-col gap-4 flex-1">
                    <div className="flex flex-col gap-3 flex-1">
                      <h3 className="text-xl font-bold text-[#0c0c0c] mobile:text-lg line-clamp-2 leading-tight">
                        {newsItem[`title_${locale}` as keyof Blogs] as string}
                      </h3>
                      <p className="text-base text-[#6B7280] mobile:text-sm line-clamp-3 leading-relaxed">
                        {newsItem[`description_${locale}` as keyof Blogs] as string}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <div className="[&_svg]:w-4 [&_svg]:h-4 [&_svg_path]:fill-[#1e3a8a]">
                            {clock}
                          </div>
                        </div>
                        <p className="font-medium text-sm text-[#6B7280]">
                          {newsItem?.createTime
                            ? format(new Date(newsItem.createTime), "MMM d, yyyy")
                            : null}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#1e3a8a] transition-all duration-300">
                        <div className="[&_svg]:w-4 [&_svg]:h-4 [&_svg_path]:stroke-[#0c0c0c] group-hover:[&_svg_path]:stroke-white [&_svg_path]:transition-all [&_svg_path]:duration-300">
                          {arrowRight}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
