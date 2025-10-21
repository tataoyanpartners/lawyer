"use client";
import { arrowRight, clock } from "@/app/assets/svg";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/actions";
import { Blogs } from "@/types/items";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

export default function NewsSlugPage() {
  const { slug } = useParams();
  const t = useTranslations("News");
  const [news, setNews] = useState<Blogs[]>([]);
  const otherNews = news.filter((n) => n._id !== slug);
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      setNews(await fetchBlogs());
    })();
  }, []);
  const post = news.find((item: Blogs) => item._id == slug);

  if (news.length === 0) {
    return (
      <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
        <div className="px-10 mobile:px-6">
          <div className="pb-10 animate-pulse">
            <div className="bg-gray-300 h-6 w-24 rounded" />
          </div>
          <div className="flex flex-col gap-8 animate-pulse">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-10 mobile:p-6">
              <div className="flex flex-col gap-6">
                <div className="bg-gray-300 h-8 w-1/3 rounded" />
                <div className="bg-gray-300 h-4 w-1/4 rounded" />
                <div className="bg-gray-300 h-[400px] w-full rounded-xl mobile:h-[300px]" />
                <div className="flex flex-col gap-4">
                  <div className="bg-gray-300 h-6 w-full rounded" />
                  <div className="bg-gray-300 h-6 w-3/4 rounded" />
                  <div className="bg-gray-300 h-6 w-1/2 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return <div className="text-center p-8">News post not found.</div>;
  }

  return (
    <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
      <div className="px-10 mobile:px-6">
        <div className="pb-10">
          <Link href={"/news"} className="flex items-center gap-2 text-[#1e3a8a] font-semibold hover:gap-3 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M21 12.013L3.211 12M9.988 19L3 12L9.988 5"
                stroke="#1e3a8a"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            {t("backBtn")}
          </Link>
        </div>

        <div className="flex flex-col gap-12 mobile:gap-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-10 mobile:p-6 shadow-sm">
            <div className="flex flex-col gap-8 mobile:gap-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-[#0c0c0c] mobile:text-xl leading-tight">
                  {(post as any)[`title_${locale}`] || post.title_am || post.title_en || post.title_ru}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <div className="[&_svg]:w-4 [&_svg]:h-4 [&_svg_path]:fill-[#1e3a8a]">
                      {clock}
                    </div>
                  </div>
                  <p className="text-base text-[#6B7280] font-medium">
                    {format(new Date(post.createTime), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl h-[420px] mobile:h-[240px]">
                <Image
                  src={post.image}
                  alt={`Image ${post._id} not found`}
                  width={1000}
                  height={420}
                  quality={100}
                  priority
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed text-[#6B7280] mobile:text-base">
                  {(post as any)[`description_${locale}`] || post.description_am || post.description_en || post.description_ru}
                </p>
              </div>
            </div>
          </div>

          {otherNews.length > 0 && (
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-bold text-[#0c0c0c] mobile:text-2xl">
                {t("otherNews")}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile:gap-6">
                {otherNews.slice(0, 3).map((item) => (
                  <Link
                    href={`/news/${item._id}`}
                    key={item._id}
                    className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
                  >
                    <div className="relative overflow-hidden h-[240px]">
                      <Image
                        src={item.image}
                        alt={item[`title_${locale}` as keyof Blogs] as string || "News"}
                        width={400}
                        height={240}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 mobile:p-5 flex flex-col gap-4 flex-1">
                      <div className="flex flex-col gap-3 flex-1">
                        <h4 className="text-xl font-bold text-[#0c0c0c] mobile:text-lg line-clamp-2 leading-tight">
                          {item[`title_${locale}` as keyof Blogs] as string}
                        </h4>
                        <p className="text-base text-[#6B7280] mobile:text-sm line-clamp-3 leading-relaxed">
                          {item[`description_${locale}` as keyof Blogs] as string}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="flex gap-3 items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <div className="[&_svg]:w-4 [&_svg]:h-4 [&_svg_path]:fill-[#1e3a8a]">
                              {clock}
                            </div>
                          </div>
                          <p className="font-medium text-sm text-[#6B7280]">
                            {item.createTime ? format(new Date(item.createTime), "MMM d, yyyy") : ""}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#1e3a8a] transition-all duration-300">
                          <div className="[&_svg]:w-4 [&_svg]:h-4 [&_svg_path]:stroke-[#0c0c0c] group-hover:[&_svg_path]:stroke-white [&_svg_path]:transition-all [&_svg_path]:duration-300">
                            {arrowRight}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
