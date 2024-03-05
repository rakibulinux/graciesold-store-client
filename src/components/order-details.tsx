"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Backend_URL } from "@/lib/Constants";
import { OrderType } from "@/types/types";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type DialogProps = {
  order: OrderType;
};

const OrderDetails = ({ order }: DialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Order ID: {order.order_number}</DialogTitle>
          <DialogDescription>
            <div className="mt-3 bg-slate-50 p-2 rounded-md ">
              <p>{order.user?.name}</p>
              <p>{order.user?.email}</p>
              <p>{order.phoneNo} </p>
              <p>{order.address} </p>
            </div>

            <div className="mt-4">
              {order?.products?.map((cart) => (
                <div className="flex items-center space-y-3 " key={cart?.id}>
                  <div className="w-16 h-16 overflow-hidden  rounded-full">
                    <Image
                      src={Backend_URL! + cart.image}
                      alt="logo"
                      width={70}
                      height={70}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="pl-4 font-semibold ">{cart.name}</span>
                    {/* <p className="pl-4 text-xs">
                      Preparation:{" "}
                      <span className=" italic text-gray-500">
                        {cart.prepare}
                      </span>
                    </p>
                    <p className="pl-4 text-xs">
                      Note:{" "}
                      <span className=" italic text-gray-500">
                        {cart.instructions}
                      </span>
                    </p> */}
                    <p className="pl-4 inline-flex space-x-3 text-xs ">
                      Price:
                      <span className="font-semibold mx-2 text-green-600">
                        ${cart.price}
                      </span>
                      x<span>{cart.quantity} </span>
                    </p>
                  </div>
                </div>
              ))}

              {/* <div className="flex items-center justify-between p-2 mt-3 text-gray-500 border-t">
                <span>Discount</span>
                <span>$-{order.price}</span>
              </div>
              <div className="flex items-center justify-between p-2 text-gray-500">
                <span>Service Fees</span>
                <span>${order?.price}</span>
              </div>
              <div className="flex items-center justify-between p-2 text-gray-500">
                <span>Delivery Fee</span>
                <span>${order.price}</span>
              </div> */}
              <div className="flex items-center justify-between p-2 text-gray-500 border-t">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">
                  ${Number(order.price).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-slate-50 rounded-md">
              {/* <p>
                Delivery Note:
                <span className="text-xs ml-2 text-gray-500">
                  {order.price}
                </span>
              </p> */}
              <p>
                Delivery Address:{" "}
                <span className="text-xs ml-2 text-gray-500">
                  {order.address}
                </span>{" "}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
