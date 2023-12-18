import { Circle } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full mx-auto p-4 flex flex-col md:flex-row items-center justify-evenly md:justify-between bg-gray-850 py-14 text-base">
      <span className="text-white sm:text-center">
        © 2023{" "}
        <Link href="/" className="hover:underline">
          Gracie&apos;s Cuisine
        </Link>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 font-medium text-white sm:mt-0">
        <li>
          <Link href="/" className="mr-4 hover:underline md:mr-6 ">
            Home
          </Link>
        </li>
        <li>
          <Link href="/menu" className="mr-4 hover:underline md:mr-6">
            Menu
          </Link>
        </li>
        <li>
          <Link href="/contact" className="mr-4 hover:underline md:mr-6">
            Contact
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline">
            Call To Order
          </Link>
        </li>
      </ul>
      <Link
        className="bg-sky-200 rounded-full mt-3 md:mt-0 md:mr-32"
        href="https://www.yelp.com/biz/gracies-cuisine-everett"
      >
        <Circle className="bg-sky-300 rounded-full text-sky-300 h-10 w-10" />
      </Link>
    </div>
  );
};

export default Footer;
