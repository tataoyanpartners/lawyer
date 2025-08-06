import { mail_black, telephone_black } from "@/app/assets/svg";
import { useTranslations } from "next-intl";
import React from "react";

const ContactUs = () => {
  const t = useTranslations("contactUs");
  return (
    <section className="flex items-center justify-center py-15 px-10 mobile:p-0 ">
      <div className="flex flex-col gap-4 max-w-[1280px] w-full bg-[#212121] shadow-2xl rounded-2xl p-10 mobile:rounded-tl-none mobile:rounded-tr-none mobile:p-6">
        <h3 className="font-bold text-3xl  text-muted-light mobile:text-xl">
          {t("title")}
        </h3>
        <div className="flex flex-col gap-2">
          <p>
            {t("addressDescription")}
          </p>
          <div className="flex items-center gap-1">
            {React.cloneElement(telephone_black, {
              className: "w-[40px] mobile:w-[24px]",
            })}

            <a
              href="tel:+37494450054"
              className="text-purple-600 hover:underline"
            >
              (+37494) 45-00-54{" "}
            </a>
          </div>
          <div className="flex items-center gap-1">
            {React.cloneElement(telephone_black, {
              className: "w-[40px] mobile:w-[24px]",
            })}
            <div>
              <a
                className="text-purple-600 hover:underline"
                href="tel:+37491006040"
              >
                (+37491) 00-60-40{"  "}
              </a>
              {t("lawyerInfo")}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {React.cloneElement(mail_black, {
              className: "w-[40px] mobile:w-[24px]",
            })}

            <a
              className="text-purple-600 hover:underline"
              href="mailto:tatoyan.partners@gmail.com"
            >
              tatoyan.partners@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
