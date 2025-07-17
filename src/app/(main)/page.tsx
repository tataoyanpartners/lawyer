"use client";
import { fetchBlogs } from "@/lib/actions";
import { useLocale, useTranslations } from "next-intl";
import AutoCarousel from "@/custom/AutoCarousel";
import { Blogs } from "@/types/items";
import { useEffect, useState } from "react";
import { Button } from "@/custom/Button";
import { Area } from "@/custom/Area";
import PopUp from "@/custom/PopUp";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  afforable,
  approachable,
  arrowRight,
  arrowUp,
  clock,
  experienced,
  flexible,
  mail,
  phoneIcon,
  star,
  telephone,
} from "@/app/assets/svg";
import ServicesSection from "@/components/ServiceSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Home() {
  const [popUpContacte, setPopUpContacte] = useState<boolean>(false);
  const [news, setNews] = useState<Blogs[] | undefined>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const t = useTranslations("Home");
  const locale = useLocale();

  const lawyers = [
    {
      id: 1,
      name: "Արման Թաթոյան",
      image: "/lawyers/tatoyan.JPG",
      description: "lorem ipsum",
    },
    {
      id: 2,
      name: "Կարինե",
      image: "/lawyers/anna.JPG",
      description: "lorem ipsum",
    },
    {
      id: 3,
      name: "Արմեն Բաղդասարյան",
      image: "/lawyers/armen-baghdasaryan.jpg",
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
      <section className="max-w-[1280px] mx-auto mobile:w-full">
        <div className="flex items-center mobile:flex-col">
          <div className="w-1/2 mobile:hidden">
            <Image
              src="/main.gif"
              unoptimized
              alt="GIF"
              width={814.27}
              height={768.44}
            />
          </div>
          <div className="w-full mobile:block hidden">
            <Image
              src="/lawyer-home-background.jpg"
              unoptimized
              alt="GIF"
              width={814}
              height={768}
              className="w-full"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center p-3 gap-[32px] mobile:w-full mobile:px-5">
            <div className="grid gap-3">
              <h1 className="font-bold text-4xl text-muted-light mobile:text-xl text-center">
                {t("experiance")}
              </h1>
              <p className="font-medium text-xl text-muted mobile:text-base mobile:text-center">
                {t("description-experiance")}
              </p>
            </div>
            <div className="flex gap-15 mobile:justify-center mobile:gap-6 justify-center">
              <Button
                className="font-medium text-lg rounded-4xl py-3 px-5 hover:bg-[#937abd] mobile:text-base mobile:px-3 hover:transition-[200] text-white flex items-center gap-2 smallIcon18"
                onClick={() => setPopUpContacte(true)}
              >
                {phoneIcon}
                {t("btn-consulation")}
              </Button>
            </div>
            {popUpContacte && <PopUp onClose={() => setPopUpContacte(false)} />}
          </div>
        </div>
      </section>

      <ServicesSection />

      <section className="max-w-[1280px] mx-auto mobile:w-full">
        <div className="grid px-10 py-16 gap-10 mobile:gap-4 mobile:py-8">
          <h2 className="text-muted-light text-4xl font-bold text-center mobile:text-xl">
            {t("makes")}
          </h2>
          <ul className="grid grid-cols-4 justify-between gap-4 text-center mobile:grid-cols-1 mobile:gap-10 mobile:px-0">
            <li>
              <div className="flex flex-col items-center justify-center gap-6 rounded-xl cart-bg-grey py-6 px-4 border border-custom  gradient-border-main ">
                {React.cloneElement(experienced)}
                <p className="font-medium text-xl text-muted-light mobile:text-base">
                  {t("makes-item1")}
                </p>
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center justify-center gap-6 rounded-xl cart-bg-grey py-6 px-4 border border-custom  gradient-border-main ">
                {afforable}
                <p className="font-medium text-xl text-muted-light mobile:text-base">
                  {t("makes-item2")}
                </p>
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center justify-center gap-6 rounded-xl cart-bg-grey py-6 px-4 border border-custom  gradient-border-main ">
                {flexible}
                <p className="font-medium text-xl text-muted-light mobile:text-base">
                  {t("makes-item3")}
                </p>
              </div>
            </li>
            <li>
              <div className="flex flex-col items-center justify-center gap-6 rounded-xl cart-bg-grey py-6 px-4 border border-custom  gradient-border-main ">
                {approachable}
                <p className="font-medium text-xl text-muted-light mobile:text-base">
                  {t("makes-item4")}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto mobile:w-full pt-8 pb-12">
        <div className="grid gap-4">
          {/* Header */}
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="font-bold text-4xl text-muted-light mobile:text-xl">
              {t("attorneys")}
            </h2>
            <p className="font-medium text-xl text-muted text-center mobile:text-sm max-w-[800px]">
              {t("attorneys-description")}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-4 p-4 mobile:gap-0 mobile:grid-cols-1 sup-lg:grid-cols-2 items-center">
            {lawyers.map((lawyer) => {
              const isOpen = openId === lawyer.id;
              return (
                <Area
                  key={lawyer.id}
                  className="relative group overflow-hidden rounded-[4px] mobile:m-0"
                >
                  {/* Make the entire image tappable */}
                  <div
                    className="w-full h-full cursor-pointer"
                    onClick={() => setOpenId(isOpen ? null : lawyer.id)}
                  >
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      width={301}
                      height={500}
                      className="rounded-[4px] w-full h-[500px] object-cover"
                    />
                  </div>

                  {/* Overlay */}
                  <div
                    className={`
                    absolute
                    bottom-0 left-[8px] right-[8px]
                    h-1/3 mobile:h-1/2
                    bg-[#44424C]
                    rounded-[4px]
                    p-4 flex flex-col gap-3

                    /* hide off-screen and block pointer when closed */
                    ${
                      isOpen
                        ? "translate-y-0 pointer-events-auto"
                        : "translate-y-full pointer-events-none"
                    }

                    /* show on desktop hover */
                    group-hover:translate-y-0 group-hover:pointer-events-auto

                    /* animate */
                    transform transition-transform duration-300
                  `}
                  >
                    <div className="flex justify-between gap-[6px]">
                      <h3 className="text-xl font-semibold text-[#D0D0D0] mobile:text-base">
                        {lawyer.name}
                      </h3>
                      {arrowUp}
                    </div>
                    <p className="text-sm text-[#AEAEAE] font-medium mobile:text-sm">
                      {lawyer.description}
                    </p>
                  </div>
                </Area>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="bg-[url('/contact-us-background.jpg')] bg-cover bg-bottom bg-no-repeat w-full h-[628px] relative"
        style={{
          backgroundPosition: "1% 33%",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] opacity-50"></div>
        <div className="absolute left-3/6 top-1/2 -translate-x-1/6 -translate-y-1/2  max-w-[1280px] mobile:top-2/4 mobile:left-1/6 mobile:-translate-x-1/10 mobile:-translate-y-1/4 bg-blend-color-burn">
          <div className="w-full py-6 px-8 grid gap-[42px] rounded-[4px] mobile:px-5 mobile:py-3">
            <div className="flex flex-col gap-6 max-w-[700px]">
              <h2 className="font-bold text-3xl text-center text-[#F5F5F5] mobile:text-base">
                {t("background-title")}
              </h2>
              <p className="font-[400] text-xl text-[#F5F5F5CC] text-center mobile:text-sm ">
                {t("background-description")}
              </p>
            </div>
            <div className="flex items-center gap-8 mobile:flex-col mobile:gap-1">
              <div className="flex gap-4 items-center">
                {React.cloneElement(telephone, {
                  className: "mobile:w-[24px] mobile:h-[24px] ",
                })}
                <p className="font-medium text-xl mobile:text-sm">
                  +374 12122112
                </p>
              </div>
              <div className="flex gap-4 items-center">
                {React.cloneElement(mail, {
                  className: "mobile:w-[24px] ",
                })}
                <p className="font-medium text-2xl mobile:text-sm">
                  lawyer@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto mobile:w-full">
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
      </section>

      <section className="max-w-[1280px] mx-auto mobile:w-full">
        <div className=" p-16 flex flex-col gap-10 mobile:px-5 mobile:py-12">
          <div className="flex flex-col gap-6 text-center">
            <h2 className="font-bold text-4xl text-muted-light  mobile:text-xl">
              {t("stay")}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {news?.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Area
                    key={i}
                    variant="lower__shadow"
                    className="grid gap-4 p-3 animate-pulse"
                  >
                    <div className="bg-gray-600 h-[200px] w-full rounded-xl" />
                    <div className="grid gap-10">
                      <div className="grid gap-2">
                        <div className="bg-gray-600 h-6 w-3/4 rounded" />
                        <div className="bg-gray-600 h-4 w-full rounded" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-600 h-4 w-4 rounded-full" />
                          <div className="bg-gray-600 h-4 w-20 rounded" />
                        </div>
                        <div className="bg-gray-600 h-6 w-6 rounded-full" />
                      </div>
                    </div>
                  </Area>
                ))
              : news?.map((news) => (
                  <Area
                    variant="lower__shadow"
                    className="flex flex-col gap-4 p-4 mobile:p-1"
                    key={news._id}
                  >
                    <Image
                      src={news.image}
                      alt="GIF"
                      width={301}
                      height={200}
                      className="object-cover h-[200px] w-full rounded-xl"
                    />
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-4">
                        <p className="text-muted-light text-xl font-semibold leading-[120%] mobile:text-sm mobile:text-">
                          {news[`title_${locale}` as keyof Blogs]}
                        </p>
                        <p className="text-muted text-sm font-semibold leading-[120%] mobile:text-sm mobile:text-">
                          {news[`description_${locale}` as keyof Blogs]}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                          {clock}
                          <p className="font-medium text-base  text-muted mobile:text-sm">
                            {news?.createTime
                              ? format(
                                  new Date(news.createTime),
                                  "MMMM d, yyyy"
                                )
                              : null}
                          </p>
                        </div>
                        <Link href={`/news/${news._id}`}>
                          <div className="p-1 text-muted  rounded-full hover:bg-[#6A49A2] hover:text-white transition duration-300">
                            {arrowRight}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Area>
                ))}
          </div>
        </div>
      </section>

      <section className="w-full">
        <AutoCarousel />
      </section>
    </>
  );
}
