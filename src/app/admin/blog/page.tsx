"use client";
import ModalForAdding from "@/custom/ModalForAdding";
import ModalForDelete from "@/custom/ModalForDelete";
import ModalForEdit from "@/custom/ModalForEdit";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/actions";
import { Button } from "@/custom/Button";
import { more } from "@/app/assets/svg";
import { Area } from "@/custom/Area";
import { Blogs } from "@/types/items";
import { format } from "date-fns";
import Image from "next/image";

export default function Blog() {
  const [addBlogIsOpen, setAddBlogIsOpen] = useState(false);
  const [blogEdit, setBlogEdit] = useState<number | null>(null);
  const [blogDelet, setBlogDelet] = useState<number | null>(null);
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [blogId, setBlogId] = useState<string>("");
  const [selectedPopupIndex, setSelectedPopupIndex] = useState<number | null>(
    null
  );

  const fetchBlogsAndSet = async () => {
    const data = await fetchBlogs();
    console.log(data);

    if (data) {
      setBlogs(data);
    }
  };

  useEffect(() => {
    fetchBlogsAndSet();
  }, []);

  return (
    <>
      <div className="grid gap-10 ">
        <div className="flex justify-between font-semibold text-2xl p-10  items-center">
          <h1 className="font-bold text-3xl">Our Blogs</h1>
          <Button
            className="px-10 py-5 rounded-2xl text-white"
            onClick={() => setAddBlogIsOpen(true)}
          >
            Add Blog +
          </Button>
        </div>
        <div className="p-10 grid grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <div key={index}>
              <Area className="rounded-[4px] grid gap-2 bg-white px-5 border-[#ad90de]">
                <div className="relative flex justify-end">
                  <button
                    onClick={() =>
                      setSelectedPopupIndex(
                        selectedPopupIndex === index ? null : index
                      )
                    }
                    className="cursor-pointer p-3 hover:bg-[#d0d0d0] rounded-[10px]"
                  >
                    {more}
                  </button>

                  {/* Popup по click */}
                  {selectedPopupIndex === index && (
                    <div className="absolute right-0 top-full mt-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[220px]">
                      <button
                        onClick={() => {
                          setBlogEdit(index);
                          setSelectedPopupIndex(null);
                          setBlogId(blog._id);
                        }}
                        className="px-4 py-2 text-left text-2xl hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setBlogDelet(index);
                          setSelectedPopupIndex(null);
                          setBlogId(blog._id);
                        }}
                        className="px-4 py-2 text-left text-2xl text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid text-center gap-5">
                  <Image
                    src={blog.image}
                    alt={`Lawyer Image ${index + 1}`}
                    priority
                    width={100}
                    height={50}
                    className="rounded-[4px] object-cover"
                  />
                  <h2 className="font-bold text-base">
                    {blog.title_am} {blog.title_en}
                  </h2>
                </div>
                <p className="font-semibold text-sm text-muted">
                  {blog.description_am} {blog.description_en}
                </p>
                <p className="text-sm text-muted">
                  {blog.createTime
                    ? format(new Date(blog.createTime), "MMMM d, yyyy")
                    : null}
                </p>
              </Area>
            </div>
          ))}
        </div>
      </div>

      {/* Add Blog Modal */}
      <ModalForAdding
        isOpen={addBlogIsOpen}
        onClose={() => setAddBlogIsOpen(false)}
        title="Add Blog"
        fields={["title", "description"]}
        imageRequired={true}
        addType="blog"
        fetchAndUpdate={fetchBlogsAndSet}
      />

      {/* Edit Modal — только 1 */}
      {blogEdit !== null && (
        <ModalForEdit
          title="Blog Edit"
          isOpen={blogEdit !== null}
          onClose={() => setBlogEdit(null)}
          imageRequired={true}
          editType="editBlog"
          editIndex={blogId}
          fetchAndUpdate={fetchBlogsAndSet}
          fields={[
            {
              title_am: blogs[blogEdit].title_am,
              title_en: blogs[blogEdit].title_en,
              description_am: blogs[blogEdit].description_am,
              description_en: blogs[blogEdit].description_en,
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
