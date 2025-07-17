"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { phoneIcon, emailIcon, closeIcon } from "@/app/assets/svg";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScroll, setShowScroll] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Header />

      <main className="md:pt-[86px] mobile:pt-20 bg-darkk relative">
        {children}
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="
              fixed bottom-4 right-4
              w-12 h-12
              bg-purple-600 hover:bg-purple-700
              rounded-full
              flex items-center justify-center
              text-white shadow-lg z-50 cursor-pointer
            "
            aria-label="Scroll to top"
          >
            ▲
          </button>
        )}

        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
          <div
            className={`
              flex items-center
              bg-green-500 text-white
              rounded-tl-4xl rounded-bl-4xl
              overflow-hidden
              transition-all duration-300
              ${contactOpen ? "w-36" : "w-14"}
            `}
          >
            <button
              onClick={() => setContactOpen((o) => !o)}
              className="w-12 h-12 flex items-center justify-center cursor-pointer"
              aria-label={contactOpen ? "Close contact" : "Open contact"}
            >
              {contactOpen ? closeIcon : phoneIcon}
            </button>
            {!contactOpen && <span className="font-semibold"></span>}
            {contactOpen && (
              <div className="flex items-center gap-2">
                <a
                  href="tel:+37494450054"
                  className="p-2 hover:bg-green-600 rounded-full shadow-[1px_1px_1px_1px_#80808052] transition-all duration-300"
                  aria-label="Call us"
                >
                  {phoneIcon}
                </a>
                <a
                  href="mailto:tatoyan.partners@gmail.com"
                  className="p-2 hover:bg-green-600 rounded-full shadow-[1px_1px_1px_1px_#80808052] transition-all duration-300"
                  aria-label="Email us"
                >
                  {emailIcon}
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
