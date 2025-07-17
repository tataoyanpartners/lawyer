"use client";

import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/custom/Button";
import React, { useState } from "react";
import PopUp from "@/custom/PopUp";
import Link from "next/link";
import {
  location_black,
  logo,
  mail_black,
  phoneIcon,
  telephone_black,
} from "@/app/assets/svg";

export const Footer = () => {
  const [popUpContacte, setPopUpContacte] = useState<boolean>(false);
  const t = useTranslations("Footer");
  const tNavbar = useTranslations("Navbar");
  const pathname = usePathname();

  return (
    <footer className="px-10 mt-16 mobile:mt-8 rounded-tl-[44px] rounded-tr-[44px] py-10 bg-black mobile:px-8 mobile:pt-10 ">
      <section className="max-w-[1280px] mx-auto grid gap-10 mobile:max-w-full">
        <div className="flex justify-between  mobile:flex-col mobile:gap-10">
          <div className="flex flex-col gap-4 mobile:items-start max-w-[350px]">
            <Link href="/">
              {React.cloneElement(logo, {
                className: "mobile:w-[150px]  mobile:h-[70px] ",
              })}
            </Link>
            <h2 className="font-bold text-xl text-muted-light mobile:text-base ">
              {t("specialised")}
            </h2>

            <Button
              className="text-lg py-3 px-5  rounded-[50px] md:hidden mobile:w-full text-white flex items-center gap-2 smallIcon18"
              onClick={() => setPopUpContacte(true)}
            >
              {phoneIcon}
              {tNavbar("contact")}
            </Button>
          </div>

          <ul className="flex flex-col gap-3 font-medium  mobile:w-full mobile:text-base ">
            <li className={`${pathname === "/about" ? "text-[#6A49A2]" : ""}`}>
              <Link href="/about">{tNavbar("about")}</Link>
            </li>
            <li
              className={`${pathname === "/services" ? "text-[#6A49A2]" : ""}`}
            >
              <Link href="/services">{tNavbar("services")}</Link>
            </li>
            <li
              className={`${pathname === "/partners" ? "text-[#6A49A2]" : ""}`}
            >
              <Link href="/partners">{tNavbar("partners")}</Link>
            </li>
            <li className={`${pathname === "/news" ? "text-[#6A49A2]" : ""}`}>
              <Link href="/news">{tNavbar("news")}</Link>
            </li>
          </ul>

          <div className="flex flex-col font-medium">
            <div className="flex items-center gap-4">
              {React.cloneElement(telephone_black, {
                className: "mobile:w-[40px]",
              })}
              <p>+374 12122112</p>
            </div>
            <div className="flex items-center gap-4">
              {React.cloneElement(mail_black, {
                className: "mobile:w-[40px]",
              })}
              <p>Lawyerhelp@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              {React.cloneElement(location_black, {
                className: "mobile:w-[40px]",
              })}
              <p>{t("address")}</p>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#111] rounded-2xl px-8 py-3 flex justify-between mobile:grid mobile:justify-center">
          <Button
            className="text-lg py-3 px-5  rounded-[50px] mobile:hidden text-white flex items-center gap-2 smallIcon18"
            onClick={() => setPopUpContacte(true)}
          >
            {phoneIcon}
            {tNavbar("contact")}
          </Button>
          <div className="flex items-center gap-6 ">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-white text-4xl hover:text-[#6A49A2]" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white text-4xl hover:text-[#6A49A2]" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-white text-4xl hover:text-[#6A49A2]" />
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="font-normal text-[#717173]  mobile:text-base">
            {t("serteficate")}
          </p>
        </div>
        {popUpContacte && <PopUp onClose={() => setPopUpContacte(false)} />}
      </section>
    </footer>
  );
};
