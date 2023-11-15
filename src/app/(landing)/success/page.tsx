"use client";
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`${Backend_URL}/order/confirm/${payment_intent}`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [payment_intent, router, session?.backendTokens.accessToken]);

  return (
    <>
      <div className="min-h-screen md:min-h-screen flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
        <ConfettiExplosion className="absolute m-auto" />
      </div>
    </>
  );
};

export default SuccessPage;
