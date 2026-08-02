import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET ALL PRODUCTS
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    const where = section ? { targetSection: section } : {};

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. CREATE PRODUCT
export async function POST(request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        title: body.title,
        description: body.description || "",
        originalPrice: body.originalPrice || "",
        discountedPrice: body.discountedPrice,
        savings: body.savings || "",
        image: body.image || "/placeholder.png",
        buttonText: body.buttonText || "Add To Cart",
        category: body.category || "",
        targetSection: body.targetSection,
        warranty: body.warranty || "",
        inStock: body.inStock ?? true,
        badgeText: body.badgeText || "",
        specs: body.specs || "",
      },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 3. DELETE PRODUCT
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}