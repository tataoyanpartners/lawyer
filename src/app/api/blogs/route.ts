import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { unlink } from "fs/promises";
import Blog from "@/models/blog";
import path from "path";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const requestData = await request.json();
    console.log("API received data:", requestData);
    
    const { image, title_en, title_am, title_ru, description_am, description_en, description_ru } = requestData;
    
    console.log("Extracted fields:", {
      title_ru,
      description_ru,
      title_am,
      title_en,
      description_am,
      description_en
    });

    const blogData = {
      image: image,
      title_en: title_en || "",
      title_am: title_am || "",
      title_ru: title_ru || "",
      description_am: description_am || "",
      description_en: description_en || "",
      description_ru: description_ru || "",
      createTime: new Date(),
    };
    
    console.log("Creating blog with data:", blogData);
    
    const newBlog = new Blog(blogData);
    console.log("Blog object before save:", newBlog.toObject());
    
    await newBlog.save();
    console.log("Blog object after save:", newBlog.toObject());
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { id, image, title_am, title_en, title_ru, description_am, description_en, description_ru } = await request.json();

    const updateData: any = {
      title_am: title_am || "",
      title_en: title_en || "",
      title_ru: title_ru || "",
      description_am: description_am || "",
      description_en: description_en || "",
      description_ru: description_ru || "",
    };
    
    // Only update image if provided
    if (image) {
      updateData.image = image;
    }

    const updateBlog = await Blog.findByIdAndUpdate(id, updateData);

    if (!updateBlog) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(updateBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update partner" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { id } = await request.json();

    const deleteBlog = await Blog.findByIdAndDelete(id);

    if (!deleteBlog) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    if (deleteBlog.image) {
      const imagePath = path.join(process.cwd(), "public", deleteBlog.image);
      try {
        await unlink(imagePath);
      } catch (fileError) {
        console.error("Failed to delete image file:", fileError);
      }
    }

    return NextResponse.json(
      { message: "Partner deleted successfully", deleteBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete partner" },
      { status: 500 }
    );
  }
}
