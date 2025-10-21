"use client";
import { useLocale, useTranslations } from "next-intl";
import { arrowRight, clock } from "@/app/assets/svg";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/actions";
import { Button } from "@/custom/Button";
import { Blogs } from "@/types/items";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function News() {
  const [news, setNews] = useState<Blogs[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      const fetchedNews = await fetchBlogs();

      const sortedNews = fetchedNews.slice().sort((a, b) => {
        return (
          new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
        );
      });

      setNews(sortedNews);
    })();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  const t = useTranslations("News");
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] mobile:h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-us-background.jpg"
            alt="News"
            fill
            className="object-cover"
            style={{ objectPosition: "1% 33%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 mobile:bg-gradient-to-t mobile:from-black/60 mobile:via-black/30 mobile:to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-10 mobile:px-6 text-center">
          <h1 className="text-5xl font-bold text-white mobile:text-3xl leading-tight">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="max-w-[1280px] mx-auto mobile:w-full py-16 mobile:py-10">
        <div className="px-10 mobile:px-6 flex flex-col gap-12 mobile:gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile:gap-6">
            {news.length === 0
              ? Array.from({ length: visibleCount }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="bg-gray-300 h-[240px] w-full" />
                  <div className="p-6 flex flex-col gap-4">
                    <div className="bg-gray-300 h-6 w-3/4 rounded" />
                    <div className="bg-gray-300 h-20 w-full rounded" />
                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-300 h-4 w-4 rounded-full" />
                        <div className="bg-gray-300 h-4 w-24 rounded" />
                      </div>
                      <div className="bg-gray-300 h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
              : news.slice(0, visibleCount).map((newsItem) => (
                <Link
                  href={`/news/${newsItem._id}`}
                  key={newsItem._id}
                  className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
                >
                  <div className="relative overflow-hidden h-[240px]">
                    <Image
                      src={newsItem.image}
                      alt={newsItem[`title_${locale}` as keyof Blogs] as string || "News"}
                      width={400}
                      height={240}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 mobile:p-5 flex flex-col gap-4 flex-1">
                    <div className="flex flex-col gap-3 flex-1">
                      <h3 className="text-xl font-bold text-[#0c0c0c] mobile:text-lg line-clamp-2 leading-tight">
                        {newsItem[`title_${locale}` as keyof Blogs] as string}
                      </h3>
                      <p className="text-base text-[#6B7280] mobile:text-sm line-clamp-3 leading-relaxed">
                        {newsItem[`description_${locale}` as keyof Blogs] as string}
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
                          {newsItem?.createTime
                            ? format(new Date(newsItem.createTime), "MMM d, yyyy")
                            : null}
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
          {visibleCount < news.length && (
            <div className="flex justify-center">
              <Button
                onClick={handleLoadMore}
                className="font-medium text-lg rounded-[50px] py-3 px-8 bg-[#1e3a8a] hover:bg-[#172554] mobile:text-base mobile:py-3 mobile:px-6 transition-all text-white shadow-lg hover:shadow-xl"
              >
                {t("loadMore") || "Load More"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
