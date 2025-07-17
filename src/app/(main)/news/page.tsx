"use client";
import { useLocale, useTranslations } from "next-intl";
import { arrowRight, clock } from "@/app/assets/svg";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/actions";
import { Button } from "@/custom/Button";
import { Blogs } from "@/types/items";
import { Area } from "@/custom/Area";
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
    <section className="bg-news-gradient mobile:w-full pt-12 mobile:pt-4">
      <div className="max-w-[1224px] mx-auto mobile:w-full">
        <div className="grid gap-10 mobile:m-5 p-4 mobile:p-0">
          <h1 className="font-bold text-3xl text-muted-light mobile:text-2xl">
            {t("title")}
          </h1>
          <div className="grid  gap-10 lg:grid-cols-3 sup-lg:grid-cols-2  mobile:grid-cols-1">
            {news.length === 0
              ? Array.from({ length: visibleCount }).map((_, i) => (
                  <Area
                    key={i}
                    variant="lower__shadow"
                    className="grid gap-4 p-3 animate-pulse"
                  >
                    <div className="bg-gray-600 h-[200px] w-full rounded-xl" />
                    <div className="grid gap-10">
                      <div className="grid gap-2">
                        <div className="bg-gray-600 h-6 w-3/4 rounded" />
                        <div className="bg-gray-600 h-4 w-full rounded" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-600 h-4 w-4 rounded-full" />
                          <div className="bg-gray-600 h-4 w-20 rounded" />
                        </div>
                        <div className="bg-gray-600 h-6 w-6 rounded-full" />
                      </div>
                    </div>
                  </Area>
                ))
              : news.map((newss) => (
                  <Area
                    key={newss._id}
                    variant="lower__shadow"
                    className="grid gap-4 p-3"
                  >
                    <Image
                      src={newss.image}
                      alt={`Image ${newss._id} is not find `}
                      width={301}
                      height={200}
                      className="object-cover h-[200px] w-full rounded-xl"
                    />
                    <div className="grid  gap-10">
                      <div className="grid gap-2">
                        <h3 className="font-semibold text-xl text-muted-light text-center">
                          {newss[`title_${locale}` as keyof Blogs]}
                        </h3>
                        <p className=" text-sm font-semibold leading-[120%] text-muted">
                          {newss[`description_${locale}` as keyof Blogs]}
                        </p>
                      </div>
                      <div className="flex justify-between items-center ">
                        <div className="flex  gap-3  items-center">
                          {clock}
                          <p className="font-medium text-base  text-muted">
                            {newss?.createTime
                              ? format(
                                  new Date(newss.createTime),
                                  "MMMM d, yyyy"
                                )
                              : null}
                          </p>
                        </div>
                        <Link href={`/news/${newss._id}`}>
                        <div className="p-1 text-muted  rounded-full hover:bg-[#6A49A2] hover:text-white transition duration-300">
                            {arrowRight}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Area>
                ))}
          </div>
          {visibleCount < news.length - 3 && (
            <div className="grid justify-center">
              <Button
                onClick={handleLoadMore}
                className="font-semibold text-xl text-muted-light  px-6 py-3"
              >
                Upload More
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
