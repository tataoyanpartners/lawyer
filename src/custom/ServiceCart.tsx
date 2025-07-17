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
    <Area className="mobile:m-5 h-[450px]">
      <div className="h-full flex flex-col gap-2 justify-between p-6 mobile:w-full">
        <div className="mb-4">{icone}</div>
        <h2 className="font-semibold text-xl mobile:text-base text-muted-light">
          {title}
        </h2>
        <div
          className="flex-1 relative overflow-hidden"
          style={{ maxHeight: 210 }}
        >
          <div className="pr-4 text-sm">
            <p className="font-medium text-[#757677] mobile:text-sm mb-2">
              {description}
            </p>
            {subItems && (
              <ul className="list-disc list-inside space-y-1">
                {subItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="font-medium text-[#757677] mobile:text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {bottomDescription && (
              <p className="font-medium text-[#757677] mobile:text-sm mt-2">
                {bottomDescription}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#D0D0D0] group-hover:border-white rounded-md text-base font-medium text-muted-light hover:bg-[#44424C] transition-all duration-300 ease-in-out"
          >
            {t("btn-learn")} <span>{arrowRight}</span>
          </Button>
        </div>
      </div>
    </Area>
  );
};
