import { mail, telephone } from "@/app/assets/svg";
import { useTranslations } from "next-intl";
import React from "react";

const ContactUs = () => {
  const t = useTranslations("contactUs");
  return (
    <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
      <div className="mx-10 mobile:mx-6">
        <div className="bg-gradient-to-br from-[#486BAD] to-[#172554] rounded-2xl p-10 mobile:p-6 shadow-xl">
          <div className="flex flex-col gap-8 mobile:gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-4xl text-white mobile:text-2xl">
                {t("title")}
              </h3>
              <p className="text-lg text-white/90 mobile:text-base leading-relaxed">
                {t("addressDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="tel:+37494450054"
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-5 mobile:p-4 transition-all duration-300"
              >
                <div className="[&_svg]:w-8 [&_svg]:h-8 mobile:[&_svg]:w-7 mobile:[&_svg]:h-7 [&_svg_path]:stroke-white flex-shrink-0">
                  {telephone}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white/70 font-medium">Phone</span>
                  <span className="text-white font-semibold text-lg mobile:text-base">
                    +374 94 45 00 54
                  </span>
                </div>
              </a>

              <a
                href="tel:+37491006040"
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-5 mobile:p-4 transition-all duration-300"
              >
                <div className="[&_svg]:w-8 [&_svg]:h-8 mobile:[&_svg]:w-7 mobile:[&_svg]:h-7 [&_svg_path]:stroke-white flex-shrink-0">
                  {telephone}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white/70 font-medium">{t("lawyerInfo")}</span>
                  <span className="text-white font-semibold text-lg mobile:text-base">
                    +374 91 00 60 40
                  </span>
                </div>
              </a>

              <a
                href="mailto:tatoyan.partners@gmail.com"
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-5 mobile:p-4 transition-all duration-300 md:col-span-2"
              >
                <div className="[&_svg]:w-8 [&_svg]:h-8 mobile:[&_svg]:w-7 mobile:[&_svg]:h-7 [&_svg_path]:stroke-white flex-shrink-0">
                  {mail}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white/70 font-medium">Email</span>
                  <span className="text-white font-semibold text-lg mobile:text-base break-all">
                    tatoyan.partners@gmail.com
                  </span>
                </div>
              </a>
            </div>

            {/* Map Section */}
            <div className="w-full h-[400px] mobile:h-[300px] rounded-xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=40.178180,44.519140&hl=en&z=17&output=embed"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
