import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { Backend_URL } from "@/lib/Constants";
import { NextResponse } from "next/server";

export const PUT = async ({ params }: { params: { intentId: string } }) => {
  const { intentId } = params;
  const session = await getServerAuthSession();
  try {
    const res = await fetch(`${Backend_URL}/order`, {
      method: "PATCH",
      body: JSON.stringify({ intent_id: intentId }),
    });
    if (res.ok) {
      return new NextResponse(
        JSON.stringify({ message: "Order has been updated" }),
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
