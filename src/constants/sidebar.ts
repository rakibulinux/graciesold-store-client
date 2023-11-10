import {
  Store,
  Code,
  Layers2,
  LayoutDashboard,
  Repeat,
  Settings,
  ShieldPlus,
  User2,
  UserPlus,
} from "lucide-react";

export const adminRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Customers",
    icon: User2,
    href: "/admin/customers",
    color: "text-violet-500",
  },
  {
    label: "Profile",
    icon: ShieldPlus,
    color: "text-pink-700",
    href: "/admin/profile",
  },
  {
    label: "Products",
    icon: Repeat,
    color: "text-orange-700",
    href: "/admin/products",
  },
  {
    label: "Categories",
    icon: Layers2,
    color: "text-emerald-500",
    href: "/admin/categories",
  },
  {
    label: "Orders",
    icon: Store,
    color: "text-green-700",
    href: "/admin/orders",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];
export const customerRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/customer",
    color: "text-sky-500",
  },
  {
    label: "Profile",
    icon: ShieldPlus,
    color: "text-pink-700",
    href: "/customer/profile",
  },
  {
    label: "Order History",
    icon: Store,
    color: "text-pink-700",
    href: "/customer/order-history",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/customer/settings",
  },
];
