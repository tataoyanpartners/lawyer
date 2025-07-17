import { logo } from "@/app/assets/svg";
import { NavBar } from "./navbar";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 px-4 mobile:px-0  bg-[#121212] bg-darkk  transition-shadow duration-250
        shadow-[0_3px_10px_rgba(255,255,255,0.1)]
      `}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between p-2 mobile:px-2 mobile:pr-4">
          <div className="mobile:my-auto cursor-pointer">
            <Link href="/">
              {React.cloneElement(logo, {
                className: "mobile:w-[150px] h-[70px]",
              })}
            </Link>
          </div>
          <NavBar />
        </div>
      </div>
    </header>
  );
};
