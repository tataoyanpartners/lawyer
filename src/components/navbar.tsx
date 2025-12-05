"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { phoneIconWhite } from "@/app/assets/svg";

export const NavBar = () => {
  const t = useTranslations("Navbar");
  const [locale, setLocale] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const router = useRouter();
  const pathname = usePathname();

  const modalRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(modalRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];
    
    const supportedLocales = ['en', 'am', 'ru'];
    
    if (cookieLocale && supportedLocales.includes(cookieLocale)) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      const fallbackLocale = supportedLocales.includes(browserLocale) ? browserLocale : 'am';
      setLocale(fallbackLocale);
      document.cookie = `MYNEXTAPP_LOCALE=${fallbackLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
    }
  }, [router]);

  const changeLocal = (newLocal: string) => {
    setLocale(newLocal);
    document.cookie = `MYNEXTAPP_LOCALE=${newLocal}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <nav className=" border-muted flex items-center gap-15 text-[#0c0c0c] sup-lg:flex sup-lg:justify-between sup-lg:gap-6">
      <ul className="mobile:hidden sup-lg:hidden flex flex-row gap-6 text-lg font-medium">
        <li
          className={`cursor-pointer hover:text-[#486BAD] ${
            pathname === "/about" ? "text-[#486BAD]" : ""
          }`}
        >
          <Link href="/about">{t("about")}</Link>
        </li>
        <li
          className={`cursor-pointer hover:text-[#486BAD] ${
            pathname === "/services" ? "text-[#486BAD]" : ""
          }`}
        >
          <Link href="/services">{t("services")}</Link>
        </li>
        <li
          className={`cursor-pointer hover:text-[#486BAD] ${
            pathname === "/partners" ? "text-[#486BAD]" : ""
          }`}
        >
          <Link href="/partners">{t("partners")}</Link>
        </li>
        <li
          className={`cursor-pointer hover:text-[#486BAD] ${
            pathname === "/news" ? "text-[#486BAD]" : ""
          }`}
        >
          <Link href="/news">{t("news")}</Link>
        </li>
      </ul>
      <div className="flex items-center gap-5  mobile:hidden ">
        <Link
          href="/contact"
          className="text-lg py-3 px-5 bg-[#486BAD] hover:bg-[#172554] rounded-[50px] text-white flex items-center gap-2 smallIcon18 cursor-pointer transition-colors"
        >
          {phoneIconWhite} {t("contact")}
        </Link>

        <div className="relative w-36 text-sm font-medium " ref={modalRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-full px-4 py-3 flex items-center justify-between rounded-xl bg-none cursor-pointer"
          >
            <span className="text-[#0c0c0c] flex items-center gap-2 cursor-pointer">
              {locale === "en" ? (
                <>
                  🇺🇸 <span>{t("en")}</span>
                </>
              ) : locale === "ru" ? (
                <>
                  🇷🇺 <span>{t("ru")}</span>
                </>
              ) : (
                <>
                  🇦🇲 <span>{t("am")}</span>
                </>
              )}
            </span>
            <FaChevronDown className="text-[#0c0c0c]" />
          </button>

          {open && (
            <div className="absolute top-full left-0  w-full bg-white border border-gray-200 shadow-lg rounded-xl animate-fade-in grid p-1 gap-1">
              <div
                className={`px-4 py-2 cursor-pointer rounded-xl flex items-center gap-2
                  ${locale === "am" ? "bg-[#486BAD] text-white" : "text-[#0c0c0c] hover:bg-blue-50"}`}
                onClick={() => {
                  changeLocal("am");
                  setOpen(false);
                }}
              >
                <>
                  🇦🇲 <span>{t("am")}</span>
                </>
              </div>
              <div
                className={`px-4 py-2 cursor-pointer rounded-xl flex items-center gap-2
                  ${locale === "en" ? "bg-[#486BAD] text-white" : "text-[#0c0c0c] hover:bg-blue-50"}`}
                onClick={() => {
                  changeLocal("en");
                  setOpen(false);
                }}
              >
                <>
                  🇺🇸 <span>{t("en")}</span>
                </>
              </div>

              <div
                className={`px-4 py-2 cursor-pointer rounded-xl flex items-center gap-2
                  ${locale === "ru" ? "bg-[#486BAD] text-white" : "text-[#0c0c0c] hover:bg-blue-50"}`}
                onClick={() => {
                  changeLocal("ru");
                  setOpen(false);
                }}
              >
                <>
                  🇷🇺 <span>{t("ru")}</span>
                </>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden  h-full relative sup-lg:flex mobile:flex items-center">
        <button onClick={toggleMenu} className="text-muted-light">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full h-screen bg-white p-10 grid text-lg font-medium z-50">
          <div>
            <ul className="grid gap-4 text-[#0c0c0c]">
              <li className="hover:text-[#486BAD]">
                <Link href="/about" onClick={toggleMenu}>
                  {t("about")}
                </Link>
              </li>
              <li className="hover:text-[#486BAD]">
                <Link href="/services" onClick={toggleMenu}>
                  {t("services")}
                </Link>
              </li>
              <li className="hover:text-[#486BAD]">
                <Link href="/partners" onClick={toggleMenu}>
                  {t("partners")}
                </Link>
              </li>
              <li className="hover:text-[#486BAD]">
                <Link href="/news" onClick={toggleMenu}>
                  {t("news")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid justify-center items-center gap-0"></div>
        </div>
      )}
    </nav>
  );
};
