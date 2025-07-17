"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { edit, logo, logOuth } from "@/app/assets/svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayer() {
  const pathname = usePathname();
  const navItems = [
    { title: "Blog", href: "/admin/blog" },
    { title: "Our Partners", href: "/admin/partners" },
  ];

  return (
    <section className=" bg-[#d0d0d0] rounded-[10px] h-full">
      <div className="flex flex-col justify-between h-full p-10 ">
        <div className="grid gap-15">
          {logo}
          <ul className="grid gap-4 font-medium text-3xl">
            {navItems.map(({ title, href }) => (
              <li key={href}>
                <div
                  className={`flex justify-between items-center rounded-2xl p-3 ${
                    pathname === href ? "bg-gray-200" : ""
                  }`}
                >
                  <Link
                    href={href}
                    className={`${
                      pathname === href ? "text-[#6A49A2] " : ""
                    } transition`}
                  >
                    {title}
                  </Link>
                  {pathname === href && edit}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <LogoutLink postLogoutRedirectURL="/login">
          <div className="flex justify-between p-5 font-semibold text-3xl hover:bg-gray-200 items-center cursor-pointer rounded-2xl">
            <p>Log Out</p>
            {logOuth}
          </div>
        </LogoutLink>
        {/* <Link onClick={removeToken} href="/login">
          <div className="flex justify-between p-5 font-semibold text-3xl hover:bg-amber-50 curs">
            <p>Log Out</p>
            {logOuth}
          </div>
        </Link> */}
      </div>
    </section>
  );
}
