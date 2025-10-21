import React, { FC, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { Area } from "./Area";
import { arrowRight } from "@/app/assets/svg";

export interface ServiceCardProps {
  icone: ReactNode;
  title: string;
  description: string;
  subItems?: string[];
  bottomDescription?: string;
  link: string;
}

export const ServiceCard: FC<ServiceCardProps> = ({
  icone,
  title,
  description,
  subItems,
  bottomDescription,
  link,
}) => {
  const t = useTranslations("Home");
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  return (
    <Area className="mobile:m-5 h-[450px] group border-2 border-gray-200 transition-all duration-300">
      <div className="h-full flex flex-col gap-4 justify-between p-6 mobile:p-5 mobile:w-full">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#172554] flex items-center justify-center">
          <div className="[&_svg]:w-8 [&_svg]:h-8 [&_svg_path]:fill-white [&_svg_g_path]:fill-white">{icone}</div>
        </div>
        <h2 className="font-bold text-xl mobile:text-lg text-[#0c0c0c] leading-tight">
          {title}
        </h2>
        <div
          className="flex-1 relative overflow-hidden"
          style={{ maxHeight: 210 }}
        >
          <div className="pr-2 text-sm">
            <p className="font-medium text-[#6B7280] mobile:text-sm mb-2 leading-relaxed">
              {description}
            </p>
            {subItems && (
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                {subItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="font-medium text-[#6B7280] mobile:text-sm leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {bottomDescription && (
              <p className="font-medium text-[#6B7280] mobile:text-sm mt-2 leading-relaxed">
                {bottomDescription}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-gray-200 rounded-full text-sm font-semibold text-[#0c0c0c] hover:bg-[#1e3a8a] hover:border-[#1e3a8a] hover:text-white transition-all duration-300 ease-in-out group/btn"
          >
            {t("btn-learn")} <span className="group-hover/btn:translate-x-1 transition-transform duration-300">{arrowRight}</span>
          </Button>
        </div>
      </div>
    </Area>
  );
};
