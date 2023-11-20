"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import { ORDER_NUMBER } from "@/lib/createOrderNumber";
import { useCartStore } from "@/lib/store";
import { User } from "@/types/types";
import { getData } from "@/lib/utils";
import { ProductType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { toast } = useToast();
  const {
    products,
    resetCart,
    deleteFromcart,
    increaseCartItem,
    decreaseCartItem,
  } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  // const serviceFee = 6 || 0;
  // const deliveryFee = 3 || 0;
  // const discount = 2 || 0;
  // const fees = serviceFee + deliveryFee;
  // const totalPrice = fees + (subTotal - discount);
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const getSubTotal = () => {
      const res = products.reduce(
        (prev, item) => prev + item.price * item.quantity,
        0
      );
      // Calculate total quantity
      const totalQuantity = products.reduce(
        (prev, product) => prev + product.quantity,
        0
      );
      setQuantity(totalQuantity);
      setSubTotal(res);
    };
    getSubTotal();
  }, [products]);

  const handleCheckout = async () => {
    const userInfo: User = await getData(
      "users/me",
      session?.backendTokens.accessToken
    );
    if (!session) {
      router.push("/sign-in");
    } else {
      if (!userInfo?.profile?.address || !userInfo?.profile?.phoneNo) {
        toast({
          title: "Please update your profile",
          description: "Update your address and phone number",
          variant: "destructive",
        });
        router.push(`${session?.user.role}/profile`);
      } else {
        try {
          const res = await fetch(`${Backend_URL}/order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
            body: JSON.stringify({
              order_number: ORDER_NUMBER,
              price: subTotal,
              products,
              userId: session?.user.id,
              address: userInfo?.profile.address,
              phoneNo: userInfo?.profile.phoneNo,
            }),
          });
          const data = await res.json();
          if (!!data.data.id) {
            toast({ title: `Order placed! Order ID: ${data.data.id}` });
            router.push(`/pay/${data?.data?.id}`);
            resetCart();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            {/* SINGLE ITEM */}
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Cart</h2>
            <hr className="my-2" />
            {products.length > 0 ? (
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
                      {/* <p className="text-gray-500 text-sm">{item.}</p> */}
                      <div className="flex items-center gap-3 mt-3 ">
                        <button
                          onClick={() => decreaseCartItem(products, item.id)}
                          className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center"
                          disabled={item.quantity === 1 ? true : false}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseCartItem(products, item.id)}
                          className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="  font-medium text-lg">{item.price} $</p>
                    <button
                      onClick={() => deleteFromcart(item.id)}
                      className="text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="flex items-center justify-center text-2xl">
                Your cart is empty.
              </p>
            )}
          </div>
          {/* PAYMENT CONTAINER */}
          <div className="max-w-[450px] w-full h-fit">
            <h3 className="text-xl font-semibold mb-2">Total</h3>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span className="">Subtotal ({quantity} items)</span>
              <span className="">${subTotal.toFixed(2)}</span>
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
              <span className="font-bold">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-4 justify-end my-4">
              <Button
                className="bg-green-500 text-white p-3 rounded-md self-end"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <Button
                className="bg-red-500 text-white p-3 rounded-md self-end"
                onClick={resetCart}
              >
                Reset Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* PRODUCTS CONTAINER */}
    </div>
  );
};

export default CartPage;
