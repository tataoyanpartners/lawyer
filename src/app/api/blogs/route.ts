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
    const { image, title_en, title_am, description_am, description_en } =
      await request.json();

    const newBlog = new Blog({
      image: image,
      title_en: title_en,
      title_am: title_am,
      description_am: description_am,
      description_en: description_en,
      createTime: new Date(),
    });

    await newBlog.save();
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
    const { id, image, description_am, description_en } = await request.json();

    const updateBlog = await Blog.findByIdAndUpdate(id, {
      image,
      description_am,
      description_en,
    });

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
