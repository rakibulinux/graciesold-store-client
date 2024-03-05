import React, { useState, useEffect, useCallback, useRef } from "react";
import { Bell } from "lucide-react";
import NotificationsList from "./NotificationsList";
import { Notification } from "@/types/types";
import { Button } from "../ui/button";

interface NotificationComponentProps {
  notifications: Notification[];
  setNotificationStatus: any;
}

const Notifications = ({
  notifications,
  setNotificationStatus,
}: NotificationComponentProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleClickOutside = useCallback(
    (event: globalThis.MouseEvent) => {
      if (
        showNotifications &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    },
    [showNotifications]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const unReadNotification: Notification[] = notifications?.filter(
    (notification) => notification.status === "UNREAD"
  );
  return (
    <div className="relative" ref={notificationRef}>
      <Button
        variant="ghost"
        className="relative"
        onClick={handleNotificationClick}
      >
        <span className="bg-red-500 w-5 h-5   border rounded-full text-white absolute right-2 bottom-6">
          {unReadNotification?.length}
        </span>
        <Bell />
      </Button>

      {showNotifications && (
        <div className="absolute right-0">
          <NotificationsList
            notifications={notifications}
            setNotificationStatus={setNotificationStatus}
          />
        </div>
      )}
    </div>
  );
};

export default Notifications;
