import React, {
  useState,
  useEffect,
  MouseEvent,
  useCallback,
  useRef,
} from "react";
import { Bell } from "lucide-react";
import NotificationsList from "./NotificationsList";
import { Notification } from "@/types/types";
import { Button } from "../ui/button";

interface NotificationComponentProps {
  notifications: Notification[];
  setNotificationStatus: any;
  hasMore?: any;
  fetchNotifications?: any;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notifications,
  setNotificationStatus,
  hasMore,
  fetchNotifications,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
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
  const unReadNotification: Notification[] = notifications?.filter(
    (notification) => notification.status === "UNREAD"
  );
  return (
    <div className="relative" ref={notificationRef}>
      <Button
        variant="outline"
        className="relative"
        onClick={handleNotificationClick}
      >
        <span className="bg-white  border p-0.5 border-black-100 rounded-full  absolute right-1 bottom-5">
          {unReadNotification?.length}
        </span>
        <Bell />
      </Button>

      {showNotifications && (
        <div className="absolute right-0">
          <NotificationsList
            notifications={notifications}
            setNotificationStatus={setNotificationStatus}
            hasMore={hasMore}
            fetchNotifications={fetchNotifications}
          />
          {!notifications?.length && <div>No notifications</div>}
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
