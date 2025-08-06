"use client";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/actions";
import { Blogs } from "@/types/items";
import { format } from "date-fns";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  EyeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Import existing modals
import ModalForAdding from "@/custom/ModalForAdding";
import ModalForDelete from "@/custom/ModalForDelete";
import ModalForEdit from "@/custom/ModalForEdit";

export default function Blog() {
  const [addBlogIsOpen, setAddBlogIsOpen] = useState(false);
  const [blogEdit, setBlogEdit] = useState<number | null>(null);
  const [blogDelet, setBlogDelet] = useState<number | null>(null);
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [blogId, setBlogId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogsAndSet = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBlogs();
      if (data) {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsAndSet();
  }, []);

  const handleEditClick = (index: number, blogId: string) => {
    setBlogEdit(index);
    setBlogId(blogId);
  };

  const handleDeleteClick = (index: number, blogId: string) => {
    setBlogDelet(index);
    setBlogId(blogId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse"></div>
              <CardHeader className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-[#1e3a8a]">
              Բլոգի կառավարում
            </h1>
            <p className="text-gray-600">
              Ստեղծեք և կառավարեք բլոգային գրառումներ ձեր կայքի համար
            </p>
          </div>
          <Button
            onClick={() => setAddBlogIsOpen(true)}
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Ստեղծել նոր գրառում
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <DocumentTextIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1e3a8a]">
                    Ընդհանուր գրառումներ
                  </p>
                  <p className="text-2xl font-bold text-[#1e3a8a]">
                    {blogs.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <EyeIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1e3a8a]">
                    Հրապարակված
                  </p>
                  <p className="text-2xl font-bold text-[#1e3a8a]">
                    {blogs.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1e3a8a]">Այս ամիս</p>
                  <p className="text-2xl font-bold text-[#1e3a8a]">
                    {
                      blogs.filter(
                        (blog) =>
                          blog.createTime &&
                          new Date(blog.createTime).getMonth() ===
                            new Date().getMonth()
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <PencilIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1e3a8a]">Նախագծեր</p>
                  <p className="text-2xl font-bold text-[#1e3a8a]">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Blog Posts Grid */}
        {blogs.length === 0 ? (
          <Card className="p-12 text-center">
            <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1e3a8a] mb-2">
              Բլոգային գրառումներ չկան
            </h3>
            <p className="text-gray-600 mb-4">
              Սկսեք ճանապարհի վրա՝ ստեղծելով ձեր առաջին բլոգային գրառումը
            </p>
            <Button
              onClick={() => setAddBlogIsOpen(true)}
              className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Ստեղծել ձեր առաջին գրառումը
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <Card
                key={blog._id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 group"
              >
                <div className="relative">
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <Image
                      src={blog.image}
                      alt={blog.title_am || blog.title_en || blog.title_ru}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
                        >
                          <EllipsisVerticalIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() => handleEditClick(index, blog._id)}
                          className="cursor-pointer"
                        >
                          <PencilIcon className="w-4 h-4 mr-2" />
                          Խմբագրել
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(index, blog._id)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <TrashIcon className="w-4 h-4 mr-2" />
                          Ջնջել
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardHeader className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[#1e3a8a] text-white"
                    >
                      Հրապարակված
                    </Badge>
                    {blog.createTime && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {format(new Date(blog.createTime), "MMM d, yyyy")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold line-clamp-2 text-[#1e3a8a] group-hover:text-[#1e40af] transition-colors">
                    {blog.title_am || blog.title_en || blog.title_ru}
                  </h3>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {blog.description_am || blog.description_en || blog.description_ru}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <ModalForAdding
        isOpen={addBlogIsOpen}
        onClose={() => setAddBlogIsOpen(false)}
        title="Ստեղծել նոր բլոգային գրառում"
        fields={["title", "description"]}
        imageRequired={true}
        addType="blog"
        fetchAndUpdate={fetchBlogsAndSet}
      />

      {blogEdit !== null && (
        <ModalForEdit
          title="Խմբագրել բլոգային գրառումը"
          isOpen={blogEdit !== null}
          onClose={() => setBlogEdit(null)}
          imageRequired={true}
          editType="editBlog"
          editIndex={blogId}
          fetchAndUpdate={fetchBlogsAndSet}
          fields={[
            {
              title_am: blogs[blogEdit].title_am || "",
              title_en: blogs[blogEdit].title_en || "",
              title_ru: blogs[blogEdit].title_ru || "",
              description_am: blogs[blogEdit].description_am || "",
              description_en: blogs[blogEdit].description_en || "",
              description_ru: blogs[blogEdit].description_ru || "",
              image: blogs[blogEdit].image,
            },
          ]}
        />
      )}

      {blogDelet !== null && (
        <ModalForDelete
          id={blogId}
          isOpen={blogDelet !== null}
          onClose={() => setBlogDelet(null)}
          deleteType="blog"
          fetchAndUpdate={fetchBlogsAndSet}
        />
      )}
    </>
  );
}
