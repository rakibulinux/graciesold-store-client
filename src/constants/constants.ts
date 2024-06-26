import {
  Store,
  Code,
  ImageIcon,
  Layers2,
  Music,
  PackageSearch,
  Settings,
  User,
  Users,
  VideoIcon,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const adminTools = [
  {
    label: "Customers",
    icon: Users,
    href: "/admin/customers",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Profile",
    icon: User,
    color: "text-pink-700",
    href: "/admin/profile",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Products",
    icon: PackageSearch,
    color: "text-orange-700",
    href: "/admin/products",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Categories",
    icon: Layers2,
    color: "text-emerald-500",
    href: "/admin/categories",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Orders",
    icon: Store,
    color: "text-green-700",
    href: "/admin/orders",

    bgColor: "bg-green-600/10",
  },
];
export const tools = [
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];
export const customerTools = [
  {
    label: "Profile",
    icon: User,
    color: "text-pink-700",
    href: "/customer/profile",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Order History",
    icon: Store,
    color: "text-pink-700",
    href: "/customer/order-history",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/customer/settings",
    bgColor: "bg-orange-700/10",
  },
];
