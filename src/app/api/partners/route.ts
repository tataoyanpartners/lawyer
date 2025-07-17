import { connectDB } from "@/lib/mongodb";
import Partner from "@/models/partner";
import { unlink } from "fs/promises";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const partners = await Partner.find();

    return NextResponse.json(partners, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { image, description_en, description_am, title_en, title_am } =
      await request.json();

    console.log(image, description_en, description_am, title_en, title_am);

    const newPartner = new Partner({
      image: image,
      description_en: description_en,
      description_am: description_am,
      title_en: title_en,
      title_am: title_am,
    });

    await newPartner.save();
    return NextResponse.json(newPartner, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lawyers" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { id, image, description_am, description_en, title_en, title_am } =
      await request.json();

    const updatePartner = await Partner.findByIdAndUpdate(id, {
      image,
      description_am,
      description_en,
      title_en,
      title_am,
    });

    if (!updatePartner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(updatePartner, { status: 200 });
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

    const deletedPartner = await Partner.findByIdAndDelete(id);

    if (!deletedPartner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    if (deletedPartner.image) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        deletedPartner.image
      );
      try {
        await unlink(imagePath);
        console.log("Image file deleted:", imagePath);
      } catch (fileError) {
        console.error("Failed to delete image file:", fileError);
      }
    }

    return NextResponse.json(
      { message: "Partner deleted successfully", deletedPartner },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete partner" },
      { status: 500 }
    );
  }
}
