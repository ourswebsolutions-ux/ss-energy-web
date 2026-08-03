import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary"; // Ya relative path: "../../../lib/cloudinary"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 }
      );
    }

    // 1. File ko Buffer aur phir Base64 String me convert karein
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // 2. Direct Base64 String Upload (Ye stream timeout nahi karta)
    const upload = await cloudinary.uploader.upload(base64Image, {
      folder: "energy-products",
      resource_type: "auto",
    });

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      url: upload.secure_url,
    });
  } catch (error: any) {
    console.error("Upload Route Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}