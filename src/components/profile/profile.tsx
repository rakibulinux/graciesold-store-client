"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "@/types/types";
import { Preview } from "../quil/preview";
import { Backend_URL } from "@/lib/Constants";

const Profile = ({ user }: { user: User }) => {
  const { data: session } = useSession();
  return (
    <div className="px-6 w-11/12 mx-auto">
      <div className="flex flex-wrap justify-end">
        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
          <Image
            src={
              user?.profile?.profileImg
                ? Backend_URL + user?.profile?.profileImg.path!
                : "https://github.com/shadcn.png"
            }
            alt="My Profile Image"
            className="rounded-full"
            width={100}
            height={100}
          />
        </div>
        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
          <div className="py-6 px-3 mt-32 sm:mt-0">
            <Link
              href={`/${session?.user?.role}/profile/edit/${session?.user?.id}`}
            >
              <button
                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center my-12">
        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
          {user?.name}
        </h3>
        <div className="flex gap-4 text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <MapPin className="mr-2 text-lg text-gray-400" />
          {user?.profile?.address || "Update Your Address"}
        </div>
        <div className="flex gap-4 mb-2 text-blueGray-600">
          <Mail className="mr-2 text-lg text-gray-400" />
          <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          {user?.email}
        </div>
        <div className="flex gap-4 mb-2 text-blueGray-600">
          <Phone />
          {user?.profile?.phoneNo || "Add Your Phone Number"}
        </div>
      </div>
      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-4">
            <Preview value={user?.profile?.bio || "Update Your Boi"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
