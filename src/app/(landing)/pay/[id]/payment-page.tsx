"use client";

import CheckoutForm from "@/components/product/CheckoutForm";
import { Backend_URL } from "@/lib/Constants";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const { id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(`${Backend_URL}/order/create-intent/${id}`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${session?.backendTokens?.accessToken}`,
          },
        });
        const data = await res.json();
        if (data.data) {
          setClientSecret(data.data.clientSecret);
        }
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [id, session]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };
  // if (!clientSecret) {
  //   router.push("/menu");
  // }
  return (
    <section className="min-h-screen">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </section>
  );
};

export default PayPage;
