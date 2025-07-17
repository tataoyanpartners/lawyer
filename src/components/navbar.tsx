"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Button } from "@/custom/Button";
import { Menu, X } from "lucide-react";
import PopUp from "@/custom/PopUp";
import Link from "next/link";
import React from "react";
import { phoneIcon } from "@/app/assets/svg";

export const NavBar = () => {
  const t = useTranslations("Navbar");
  const [locale, setLocale] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [popUpContacte, setPopUpContacte] = useState<boolean>(false);
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
    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  const changeLocal = (newLocal: string) => {
    setLocale(newLocal);
    document.cookie = `MYNEXTAPP_LOCALE=${newLocal};`;
    router.refresh();
  };

  // sup-lg:grid sup-lg:grid-cols-2 sup-lg:gap-4

  return (
    <nav className=" border-muted flex items-center gap-15 text-[#D0D0D0] sup-lg:flex sup-lg:justify-between sup-lg:gap-6">
      <ul className="mobile:hidden sup-lg:hidden flex flex-row gap-6 text-lg font-medium">
        <li
          className={`cursor-pointer hover:text-[#6A49A2] ${
            pathname === "/about" ? "text-[#6A49A2]" : ""
          }`}
        >
          <Link href="/about">{t("about")}</Link>
        </li>
        <li
          className={`cursor-pointer hover:text-[#6A49A2] ${
            pathname === "/services" ? "text-[#6A49A2]" : ""
          }`}
        >
          <Link href="/services">{t("services")}</Link>
        </li>
        <li
          className={`cursor-pointer hover:text-[#6A49A2] ${
            pathname === "/partners" ? "text-[#6A49A2]" : ""
          }`}
        >
          <Link href="/partners">{t("partners")}</Link>
        </li>
        <li
          className={`cursor-pointer hover:text-[#6A49A2] ${
            pathname === "/news" ? "text-[#6A49A2]" : ""
          }`}
        >
          <Link href="/news">{t("news")}</Link>
        </li>
      </ul>
      <div className="flex items-center gap-5  mobile:hidden ">
        <Button
          className="text-lg py-3 px-5  rounded-[50px] text-white flex items-center gap-2 smallIcon18 cursor-pointer"
          onClick={() => setPopUpContacte(true)}
        >
          {phoneIcon} {t("contact")}
        </Button>

        {popUpContacte && <PopUp onClose={() => setPopUpContacte(false)} />}

        <div className="relative w-36 text-sm font-medium " ref={modalRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-full px-4 py-3 flex items-center justify-between rounded-xl bg-none cursor-pointer"
          >
            <span className="text-[#f2f2f2] flex items-center gap-2 cursor-pointer">
              {locale === "en" ? (
                <>
                  🇺🇸 <span>{t("en")}</span>
                </>
              ) : (
                <>
                  🇦🇲 <span>{t("am")}</span>
                </>
              )}
            </span>
            <FaChevronDown className="text-[#f2f2f2]" />
          </button>

          {open && (
            <div className="absolute top-full left-0  w-full bg-[#413e3e] rounded-xl animate-fade-in grid p-1 gap-1">
              <div
                className={`px-4 py-2 cursor-pointer hover:bg-[#937abd] rounded-xl  flex items-center gap-2 
                  ${locale === "en" ? "bg-[#6A49A2]" : ""}`}
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
                className={`px-4 py-2 cursor-pointer hover:bg-[#937abd] rounded-xl  flex items-center gap-2 
                  ${locale === "am" ? "bg-[#6A49A2]" : ""}`}
                onClick={() => {
                  changeLocal("am");
                  setOpen(false);
                }}
              >
                <>
                  🇦🇲 <span>{t("am")}</span>
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
        <div className="md:hidden absolute top-[70px] left-0 w-full h-screen bg-darkk p-10 grid text-lg font-medium z-50">
          <div>
            <ul className="grid gap-4">
              <li>
                <Link href="/about" onClick={toggleMenu}>
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={toggleMenu}>
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link href="/partners" onClick={toggleMenu}>
                  {t("partners")}
                </Link>
              </li>
              <li>
                <Link href="/news" onClick={toggleMenu}>
                  {t("news")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid justify-center items-center gap-0">
            {/* <Button className="w-[200px] h-[50px] text-lg leading-[100%] py-[10px]">
              {t("contact")}
            </Button> */}

            {/* <div className="relative  text-lg font-medium flex justify-center items-center w-full h-full">
              <div>
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full px-4 py-3  rounded-xl bg-none cursor-pointer"
                >
                  <span className="text-[#f2f2f2] flex items-center gap-2">
                    {locale === "en" ? (
                      <>
                        🇺🇸 <span>{t("en")}</span>
                      </>
                    ) : (
                      <>
                        🇦🇲 <span>{t("am")}</span>
                      </>
                    )}
                  </span>
                </button>
              </div>

              {open && (
                <>
                  <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                  ></div>
                  <div className=" fixed bottom-0 left-0 w-full h-1/3 bg-[#413e3e] z-50 rounded-t-xl p-4 flex flex-col gap-2 animate-fade-in">
                    <div
                      className={`px-4 py-2 cursor-pointer hover:bg-[#937abd] rounded-xl flex items-center gap-5 ${
                        locale === "en" ? "bg-[#6A49A2]" : ""
                      }`}
                      onClick={() => {
                        changeLocal("en");
                        setOpen(false);
                      }}
                    >
                      🇺🇸 <span>{t("en")}</span>
                    </div>
                    <div
                      className={`px-4 py-2 cursor-pointer hover:bg-[#937abd] rounded-xl flex items-center gap-5 ${
                        locale === "am" ? "bg-[#6A49A2]" : ""
                      }`}
                      onClick={() => {
                        changeLocal("am");
                        setOpen(false);
                      }}
                    >
                      🇦🇲 <span>{t("am")}</span>
                    </div>
                  </div>
                </>
              )}
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
};
