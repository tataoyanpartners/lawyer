"use client";
import { arrowRight, clock } from "@/app/assets/svg";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/actions";
import { Blogs } from "@/types/items";
import { useLocale } from "next-intl";
import { Area } from "@/custom/Area";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/dateFormatter";

export default function NewsSlugPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<Blogs[]>([]);
  const otherNews = news.filter((n) => n._id !== slug);
  const slidesToShow = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () =>
    setCurrentIndex((i) =>
      i <= 0 ? Math.max(otherNews.length - slidesToShow, 0) : i - 1
    );
  const nextSlide = () =>
    setCurrentIndex((i) => (i >= otherNews.length - slidesToShow ? 0 : i + 1));
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      setNews(await fetchBlogs());
    })();
  }, []);
  const post = news.find((item: Blogs) => item._id == slug);

  if (news.length === 0) {
    return (
      <section className="max-w-[1224px] mx-auto mobile:w-full mobile:px-4 pt-12 mobile:pt-4">
        <div className="pb-10 animate-pulse">
          <div className="bg-gray-600 h-6 w-24 rounded" />
        </div>
        <div className="flex flex-col gap-6 animate-pulse">
          <Area
            variant="lower__shadow"
            className="grid gap-8 p-10 mobile:p-6 w-full mobile:mx-auto"
          >
            <div className="flex flex-col gap-3">
              <div className="bg-gray-600 h-8 w-1/3 rounded" />
              <div className="bg-gray-600 h-4 w-1/4 rounded" />
            </div>
            <div className="bg-gray-600 h-[400px] w-full rounded-xl mobile:h-[200px]" />
            <div className="grid gap-6 mobile:gap-4">
              <div className="bg-gray-600 h-6 w-full rounded" />
              <div className="bg-gray-600 h-6 w-3/4 rounded" />
              <div className="bg-gray-600 h-6 w-1/2 rounded" />
            </div>
          </Area>
          <div className="flex flex-col gap-4 w-full mobile:mx-auto">
            <h3 className="text-xl font-medium text-muted-light mobile:text-lg">
              Այլ նորություններ
            </h3>
            <div className="overflow-hidden">
              <div className="flex gap-10 p-2">
                {Array.from({ length: slidesToShow }).map((_, i) => (
                  <Area
                    key={i}
                    variant="lower__shadow"
                    className="flex-shrink-0 w-[300px] flex flex-col gap-4 p-3 mobile:p-4"
                  >
                    <div className="bg-gray-600 h-[200px] w-full rounded-xl mobile:h-[150px]" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="bg-gray-600 h-4 w-full rounded" />
                      <div className="bg-gray-600 h-4 w-3/4 rounded" />
                    </div>
                    <div className="flex justify-between items-center mobile:flex-col mobile:items-start mobile:gap-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-600 h-4 w-4 rounded-full" />
                        <div className="bg-gray-600 h-4 w-20 rounded" />
                      </div>
                      <div className="bg-gray-600 h-6 w-6 rounded-full" />
                    </div>
                  </Area>
                ))}
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
    <section className="max-w-[1224px] mx-auto mobile:w-full mobile:px-4 pt-12 mobile:pt-4">
      <div className="pb-10">
        <Link href={"/news"} className="flex items-center gap-2 text-[#6A49A2]">
          <svg width="24" height="24">
            <path
              d="M21 12.013L3.211 12M9.988 19L3 12L9.988 5"
              stroke="#6A49A2"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          Վերադառնալ
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <Area
          variant="lower__shadow"
          className="grid gap-8 p-10 mobile:p-6 w-full mobile:mx-auto"
        >
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold mobile:text-2xl">
              {post[`title_${locale}` as keyof Blogs]}
            </h1>
            <p className="text-muted-light">{formatDate(post.createTime)}</p>
          </div>
          <Image
            src={post.image}
            alt={`Image ${post._id} not found`}
            width={852}
            height={400}
            className="object-cover h-[400px] w-full rounded-xl mobile:h-[200px]"
          />
          <div className="grid gap-6 mobile:gap-4">
            <p className="text-xl leading-[100%] font-semibold text-muted-light mobile:text-lg">
              {post[`description_${locale}` as keyof Blogs]}
            </p>
          </div>
        </Area>

        <div className="flex flex-col gap-4 w-full mobile:px-0 mobile:gap-3">
          <h3 className="text-xl font-medium text-muted-light mobile:text-lg">
            Այլ նորություններ
          </h3>
          <div className="mt-8 mobile:mt-4">
            {/* Desktop carousel */}
            <div className="hidden md:block relative">
              <button
                onClick={prevSlide}
                className="absolute -left-[46px] top-1/2 transform -translate-y-1/2 z-10 rotate-180 bg-[#dac4ff] hover:opacity-95 transition-all duration-300 p-2 rounded-full cursor-pointer"
              >
                {arrowRight}
              </button>

              <div className="overflow-hidden">
                <div
                  className="flex gap-10 transition-transform duration-300"
                  style={{
                    transform: `translateX(-${currentIndex * (300 + 40)}px)`,
                  }}
                >
                  {otherNews.map((item) => (
                    <Area
                      key={item._id}
                      variant="lower__shadow"
                      className="flex-shrink-0 w-[300px] flex flex-col gap-4 p-3 mobile:p-4"
                    >
                      <Image
                        src={item.image}
                        alt={`Image ${item._id}`}
                        width={301}
                        height={200}
                        className="object-cover h-[200px] w-full rounded-xl mobile:h-[150px]"
                      />
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-muted-light text-center mobile:text-lg">
                          {item[`title_${locale}` as keyof Blogs]}
                        </h3>
                        <p className="text-sm font-semibold leading-[120%] text-muted mobile:text-xs">
                          {item[`description_${locale}` as keyof Blogs]}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mobile:flex-col mobile:items-start mobile:gap-2">
                        <div className="flex items-center gap-3">
                          {clock}
                          <p className="text-base font-medium text-muted mobile:text-sm">
                            {item.createTime ? formatDate(item.createTime) : ""}
                          </p>
                        </div>
                        <Link
                          href={`/news/${item._id}`}
                          className="text-muted ml-auto mobile:ml-0"
                        >
                          <div className="p-1 text-muted rounded-full hover:bg-[#6A49A2] hover:text-white transition duration-300">
                            {arrowRight}
                          </div>
                        </Link>
                      </div>
                    </Area>
                  ))}
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="absolute -right-[50px] top-1/2 transform -translate-y-1/2 z-10 bg-[#dac4ff] hover:opacity-95 p-2 transition-all duration-300 rounded-full cursor-pointer"
              >
                {arrowRight}
              </button>
            </div>

            {/* Mobile list fallback */}
            <div className="md:hidden grid gap-4 mobile:px-2">
              {otherNews.map((item) => (
                <Area
                  key={item._id}
                  variant="lower__shadow"
                  className="flex flex-col gap-4 p-3 mobile:p-4"
                >
                  <Image
                    src={item.image}
                    alt={`Image ${item._id}`}
                    width={301}
                    height={200}
                    className="object-cover h-[200px] w-full rounded-xl mobile:h-[150px]"
                  />
                  <h3 className="text-xl font-semibold text-muted-light text-center mobile:text-lg">
                    {item[`title_${locale}` as keyof Blogs]}
                  </h3>
                  <div className="flex justify-between items-center  mobile:items-start mobile:gap-2">
                    <div className="flex items-center gap-3">
                      {clock}
                      <p className="text-base font-medium text-muted mobile:text-sm">
                        {item.createTime ? formatDate(item.createTime) : ""}
                      </p>
                    </div>
                    <Link
                      href={`/news/${item._id}`}
                      className="text-muted ml-auto mobile:ml-0"
                    >
                      <div className="p-1 text-muted rounded-full hover:bg-[#6A49A2] hover:text-white transition duration-300">
                        {arrowRight}
                      </div>
                    </Link>
                  </div>
                </Area>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
