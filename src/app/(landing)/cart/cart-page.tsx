"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import { useCartStore } from "@/lib/store";
import { postData } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CartPage = () => {
  const { toast } = useToast();
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/sign-in");
    } else {
      try {
        const res = await fetch(`${Backend_URL}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
          body: JSON.stringify({
            price: totalPrice,
            products,
            userId: session.user.id,
          }),
        });
        const data = await res.json();
        if (data.data.id) {
          toast({ title: `Order placed! Order ID: ${data.data.id}` });
          router.push(`/pay/${data.data.id}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(products);
  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            {/* SINGLE ITEM */}
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Cart</h2>
            <hr className="my-2" />
            {products ? (
              products.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div className="flex justify-between border-b border-gray-300 py-4">
                  <div className="flex gap-4">
                    <Image
                      src={Backend_URL! + item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      width={100}
                      height={100}
                    />
                    <div>
                      <h3 className=" text-md md:text-lg font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm">Pizza</p>
                      <div className="flex items-center gap-3 mt-3 ">
                        <button className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center">
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="  font-medium text-lg">{item.price} $</p>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                // <div
                //   className="flex items-center justify-between mb-4"
                //   key={item.id}
                // >
                //   {item.image && (
                //     <Image src={item.image} alt="" width={100} height={100} />
                //   )}
                //   <div className="">
                //     <h1 className="uppercase text-xl font-bold">
                //       {item.name} x{item.quantity}
                //     </h1>
                //     <span>{item.name}</span>
                //   </div>
                //   <h2 className="font-bold">${item.price}</h2>
                //   <span
                //     className="cursor-pointer"
                //     onClick={() => removeFromCart(item)}
                //   >
                //     X
                //   </span>
                //</div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          {/* PAYMENT CONTAINER */}
          <div className="max-w-[450px] w-full h-fit">
            <h3 className="text-xl font-semibold mb-2">Total</h3>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span className="">Subtotal ({totalItems} items)</span>
              <span className="">${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="">Service Cost</span>
              <span className="">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="">Delivery Cost</span>
              <span className="text-green-500">FREE!</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span className="">TOTAL(INCL. VAT)</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
            <Button
              className="bg-red-500 text-white p-3 rounded-md self-end"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
      {/* PRODUCTS CONTAINER */}
    </div>
  );
};

export default CartPage;
