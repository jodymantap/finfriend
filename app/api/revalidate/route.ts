import { NextRequest, NextResponse } from "next/server";
import { revalidateTransactionCache } from "@/actions";

export async function GET(req: NextRequest) {
  try {
    await revalidateTransactionCache();
    return NextResponse.json({ message: "Cache revalidated" });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: 500 }
    );
  }
}
