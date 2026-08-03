import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET Products ebfd850 (updated)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    const products = await prisma.product.findMany({
      where: section ? { targetSection: section } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// CREATE Product
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        title: body.title,
        description: body.description || null,
        originalPrice: body.originalPrice || null,
        discountedPrice: body.discountedPrice,
        savings: body.savings || null,
        image: body.image || null,
        buttonText: body.buttonText || "Add To Cart",
        category: body.category || null,
        targetSection: body.targetSection,
        warranty: body.warranty || null,
        inStock: body.inStock ?? true,
        badgeText: body.badgeText || null,
        specs: body.specs || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// DELETE Product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID required" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: {
        id: parseInt(id, 10), // Converts query string ID to Integer required by Prisma
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { success: false, error: "Delete failed" },
      { status: 500 }
    );
  }
}