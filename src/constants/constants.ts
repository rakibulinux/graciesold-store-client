import {
  Store,
  Code,
  ImageIcon,
  Layers2,
  Music,
  Repeat,
  Settings,
  ShieldPlus,
  User2,
  UserPlus,
  VideoIcon,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const adminTools = [
  {
    label: "Customers",
    icon: User2,
    href: "/admin/customers",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Profile",
    icon: ShieldPlus,
    color: "text-pink-700",
    href: "/admin/profile",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Services",
    icon: Repeat,
    color: "text-orange-700",
    href: "/admin/services",
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
    label: "Posts",
    icon: Code,
    color: "text-green-700",
    href: "/admin/posts",
    bgColor: "bg-green-700/10",
  },
  {
    label: "Stores",
    icon: Store,
    color: "text-green-700",
    href: "/admin/Stores",

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
    icon: ShieldPlus,
    color: "text-pink-700",
    href: "/customer/profile",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Booking History",
    icon: Store,
    color: "text-pink-700",
    href: "/customer/booking-history",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/customer/settings",
    bgColor: "bg-orange-700/10",
  },
];
