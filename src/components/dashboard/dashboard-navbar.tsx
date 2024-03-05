"use client";
import { DropdownMenuItems } from "../dropdown-menu";

import { useSession } from "next-auth/react";
import { MobileSidebar } from "./mobile-sidebar";
import { Notification, User } from "@/types/types";
import { useEffect, useState } from "react";
import { getQueryData } from "@/lib/utils";
import Notifications from "./Notifications";
import { io } from "socket.io-client";
import { ModeToggle } from "../mode-toggle";

export const DashboardNavbar = ({ user }: { user: User }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false); // New state to track socket connection
  const [notificationStatus, setNotificationStatus] = useState(); // New state to track socket connection
  const { data: session } = useSession();
  let positiveNotification: HTMLAudioElement | null = null;
  const where = !!notificationStatus ? { status: notificationStatus } : {};
  if (typeof window !== "undefined") {
    positiveNotification = new Audio("/music/notification.mp3");
  }

  const fetchNotifications = async () => {
    const { data } = await getQueryData({
      url: `notification`,
      token: session?.backendTokens.accessToken,
      where,
      orderBy: { createdAt: "desc" },
    });
    setNotifications(data);
  };
  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, notificationStatus]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET!);
    const handleConnect = () => {
      setIsSocketConnected(true);
    };

    const handleDisconnect = () => {
      setIsSocketConnected(false);
    };

    socket.on("findAllNotification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });

    const handleNewOrder = (notification: Notification[]) => {
      console.log("New Order:", notification);
      setNotifications(
        (prevOrder) => [...prevOrder, notification] as Notification[]
      );
      try {
        // Play notification sound
        // if (positiveNotification) {
        positiveNotification!.play();
        console.log("I called play", positiveNotification);
        // }
      } catch (error) {
        console.error("Error playing notification sound:", error);
      }

      setNotifications(notification);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newOrder", handleNewOrder);

    return () => {
      socket.disconnect();
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newOrder", handleNewOrder);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        {session?.user.role && (
          <div className="flex gap-4 justify-center items-center z-20">
            {session.user.role === "admin" && (
              <>
                <Notifications
                  notifications={notifications}
                  setNotificationStatus={setNotificationStatus}
                />
              </>
            )}
            <DropdownMenuItems user={user} />
            {/* <p>{isSocketConnected ? "Connected" : "Disconnected"}</p> */}
            <ModeToggle />
          </div>
        )}
      </div>
    </div>
  );
};
