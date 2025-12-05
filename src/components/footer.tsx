"use client";

import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/custom/Button";
import React from "react";
import Link from "next/link";
import {
  location_black,
  logo,
  mail_black,
  phoneIcon,
  telephone_black,
} from "@/app/assets/svg";

export const Footer = () => {
  const t = useTranslations("Footer");
  const tNavbar = useTranslations("Navbar");
  const pathname = usePathname();

  return (
    <footer className="px-10 mt-16 mobile:mt-8 rounded-tl-[44px] rounded-tr-[44px] py-10 bg-gray-100 mobile:px-8 mobile:pt-10 ">
      <section className="max-w-[1280px] mx-auto grid gap-10 mobile:max-w-full">
        <div className="flex justify-between  mobile:flex-col mobile:gap-10">
          <div className="flex flex-col gap-4 mobile:items-start max-w-[350px]">
            <Link href="/">
              {React.cloneElement(logo, {
                className: "mobile:w-[150px]  mobile:h-[70px] ",
              })}
            </Link>
            <h2 className="font-bold text-xl text-[#0c0c0c] mobile:text-base ">
              {t("specialised")}
            </h2>

            <Link
              href="/contact"
              className="text-lg py-3 px-5 bg-[#486BAD] hover:bg-[#172554] rounded-[50px] md:hidden mobile:w-full text-white flex items-center justify-center gap-2 smallIcon18 cursor-pointer transition-colors"
            >
              {phoneIcon}
              {tNavbar("contact")}
            </Link>
          </div>

          <ul className="flex flex-col gap-3 font-medium text-[#0c0c0c] mobile:w-full mobile:text-base ">
            <li className={`hover:text-[#486BAD] ${pathname === "/about" ? "text-[#486BAD]" : ""}`}>
              <Link href="/about">{tNavbar("about")}</Link>
            </li>
            <li
              className={`hover:text-[#486BAD] ${pathname === "/services" ? "text-[#486BAD]" : ""}`}
            >
              <Link href="/services">{tNavbar("services")}</Link>
            </li>
            <li
              className={`hover:text-[#486BAD] ${pathname === "/partners" ? "text-[#486BAD]" : ""}`}
            >
              <Link href="/partners">{tNavbar("partners")}</Link>
            </li>
            <li className={`hover:text-[#486BAD] ${pathname === "/news" ? "text-[#486BAD]" : ""}`}>
              <Link href="/news">{tNavbar("news")}</Link>
            </li>
          </ul>

          <div className="flex flex-col font-medium text-[#0c0c0c]">
            <div className="flex items-center gap-4">
              <div className="[&_svg_path]:stroke-[#486BAD] [&_svg_rect]:fill-transparent">
                {React.cloneElement(telephone_black, {
                  className: "mobile:w-[40px]",
                })}
              </div>
              <p>+374 94 45 00 54</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="[&_svg_path]:stroke-[#486BAD] [&_svg_rect]:fill-transparent">
                {React.cloneElement(mail_black, {
                  className: "mobile:w-[40px]",
                })}
              </div>
              <p>tatoyan.partners@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="[&_svg_path]:stroke-[#486BAD] [&_svg_rect]:fill-transparent">
                {React.cloneElement(location_black, {
                  className: "mobile:w-[40px]",
                })}
              </div>
              <p>{t("address")}</p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-2xl px-8 py-3 flex justify-between mobile:grid mobile:justify-center">
          <Link
            href="/contact"
            className="text-lg py-3 px-5 bg-[#486BAD] hover:bg-[#172554] rounded-[50px] mobile:hidden text-white flex items-center gap-2 smallIcon18 cursor-pointer transition-colors"
          >
            {phoneIcon}
            {tNavbar("contact")}
          </Link>
          <div className="flex items-center gap-6 ">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-[#486BAD] text-4xl hover:text-[#172554] transition-colors duration-300" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-[#486BAD] text-4xl hover:text-[#172554] transition-colors duration-300" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-[#486BAD] text-4xl hover:text-[#172554] transition-colors duration-300" />
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="font-normal text-[#717173]  mobile:text-base">
            {t("serteficate")}
          </p>
        </div>
      </section>
    </footer>
  );
};
