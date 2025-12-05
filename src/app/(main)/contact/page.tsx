"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { mail, telephone, location_black } from "@/app/assets/svg";
import { Button } from "@/custom/Button";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>


      <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
        <div className="px-10 mobile:px-6 flex flex-col gap-12 mobile:gap-8">
          {/* Top Section with Image */}
          <div className="flex flex-col lg:flex-row gap-8 mobile:gap-6 items-center justify-between">
            <div className="flex flex-col gap-6 flex-1">
              <h2 className="text-4xl font-bold text-[#0c0c0c] mobile:text-2xl">
                {t("getInTouch")}
              </h2>
              <p className="text-lg text-[#6B7280] leading-relaxed mobile:text-base">
                {t("description")}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden mobile:w-full">
              <Image
                src="/contact-us-image.avif"
                alt="Contact Us"
                width={600}
                height={200}
                className="object-cover mobile:w-full mobile:h-auto"
                unoptimized
              />
            </div>
          </div>

          {/* Contact Info and Form Section */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-10 mobile:p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mobile:gap-8">
              {/* Left Side - Contact Information */}
              <div className="flex flex-col gap-10 mobile:gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#486BAD]/10 flex items-center justify-center flex-shrink-0">
                    <div className="[&_svg]:w-8 [&_svg]:h-8 [&_svg_path]:stroke-[#486BAD]">
                      {telephone}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-[#0c0c0c] mobile:text-lg">
                      {t("phone")}
                    </h3>
                    <div className="flex flex-col gap-2">
                      <a
                        href="tel:+37494450054"
                        className="text-base text-[#6B7280] hover:text-[#486BAD] transition-colors mobile:text-sm"
                      >
                        +374 94 45 00 54
                      </a>
                      <a
                        href="tel:+37491006040"
                        className="text-base text-[#6B7280] hover:text-[#486BAD] transition-colors mobile:text-sm"
                      >
                        +374 91 00 60 40
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#486BAD]/10 flex items-center justify-center flex-shrink-0">
                    <div className="[&_svg]:w-8 [&_svg]:h-8 [&_svg_path]:stroke-[#486BAD]">
                      {mail}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-[#0c0c0c] mobile:text-lg">
                      {t("email")}
                    </h3>
                    <a
                      href="mailto:tatoyan.partners@gmail.com"
                      className="text-base text-[#6B7280] hover:text-[#486BAD] transition-colors mobile:text-sm break-all"
                    >
                      tatoyan.partners@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#486BAD]/10 flex items-center justify-center flex-shrink-0">
                    <div className="[&_svg]:w-8 [&_svg]:h-8 [&_svg_path]:fill-[#486BAD]">
                      {location_black}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-[#0c0c0c] mobile:text-lg">
                      {t("address")}
                    </h3>
                    <p className="text-base text-[#6B7280] mobile:text-sm">
                      {t("addressText")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {t("form.successMessage")}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {t("form.errorMessage")}
                  </div>
                )}

                {/* Name and Phone in same line */}
                <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-base font-semibold text-[#0c0c0c] mobile:text-sm">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-[#0c0c0c] focus:border-[#486BAD] focus:outline-none transition-colors mobile:text-sm disabled:opacity-50"
                      placeholder={t("form.namePlaceholder")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-base font-semibold text-[#0c0c0c] mobile:text-sm">
                      {t("form.phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-[#0c0c0c] focus:border-[#486BAD] focus:outline-none transition-colors mobile:text-sm disabled:opacity-50"
                      placeholder={t("form.phonePlaceholder")}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base font-semibold text-[#0c0c0c] mobile:text-sm">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-[#0c0c0c] focus:border-[#486BAD] focus:outline-none transition-colors mobile:text-sm disabled:opacity-50"
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-base font-semibold text-[#0c0c0c] mobile:text-sm">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="border-2 border-gray-200 rounded-lg px-4 py-3 text-base text-[#0c0c0c] focus:border-[#486BAD] focus:outline-none transition-colors resize-none mobile:text-sm disabled:opacity-50"
                    placeholder={t("form.messagePlaceholder")}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="font-medium text-lg rounded-[50px] py-3 px-8 bg-[#486BAD] hover:bg-[#172554] mobile:text-base mobile:py-3 mobile:px-6 transition-all text-white shadow-lg hover:shadow-xl w-full disabled:opacity-50"
                >
                  {isLoading ? t("form.submitting") : t("form.submit")}
                </Button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-[1280px] mx-auto mobile:w-full pb-16 mobile:pb-10">
        <div className="px-10 mobile:px-6">
          <div className="w-full h-[400px] mobile:h-[300px] rounded-xl overflow-hidden border-2 border-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=40.178180,44.519140&hl=en&z=17&output=embed"
              width="100%"
              height="100%"

              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
