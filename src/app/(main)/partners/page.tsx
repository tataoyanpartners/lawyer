"use client";

import { useTranslations } from "next-intl";
import { Area } from "@/custom/Area";

export default function PartnerPage() {
  const t = useTranslations("Partners");
  const partners = [
    {
      _id: 1,
      name: t("partner1.name"),
      description: t("partner1.description"),
    },
    {
      _id: 2,
      name: t("partner2.name"),
      description: t("partner2.description"),
    },
    {
      _id: 3,
      name: t("partner3.name"),
      description: t("partner3.description"),
    },
  ];

  return (
    <>
      <section className=" max-w-[1024px] mx-auto mobile:w-full pt-10">
        <div className="grid justify-center gap-15 ">
          <div className="grid gap-4 text-center px-20 mobile:px-10">
            <h1 className="font-bold text-3xl text-muted-light mobile:text-2xl">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-[1024px] mx-auto py-25 mobile:py-10 mobile:w-full">
        <div className="grid gap-15 mobile:m-5">
          {partners.map((partner) => (
            <Area
              key={partner._id}
              variant="lower__shadow"
              className="flex gap-4 mobile:grid mobile:gap-10 p-4 px-6 mobile:px-3"
            >
              <div className="w-full grid gap-2 pb-10 mobile:w-full ">
                <div className="font-bold text-2xl mobile:text-xl text-muted-light">
                  {partner.name}
                </div>
                <p className="text-muted font-semibold leading-[120%] mobile:text-sm mobile:font-normal">
                  {partner.description}
                </p>
              </div>
            </Area>
          ))}
        </div>
      </section>
    </>
  );
}
