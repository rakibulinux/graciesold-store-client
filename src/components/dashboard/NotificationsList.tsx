"use client";
import React, { useState } from "react";

import { Notification } from "@/types/types";
import ReactTimeago from "react-timeago";
import { Button } from "../ui/button";
import { io } from "socket.io-client";

const NotificationsList = ({
  notifications,
  setNotificationStatus,
}: {
  notifications: Notification[];
  setNotificationStatus: any;
}) => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET!);
  const [activeTab, setActiveTab] = useState("all");
  const readNotification = (id: string) => {
    console.log(id, socket.id);
    socket.emit("updateNotification", { id, clientSocketId: socket.id });
  };
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const isTabActive = (tab: string) => {
    return activeTab === tab;
  };
  return (
    <>
      <section className="bg-white dark:bg-gray-800 border-2 shadow-2xl">
        {/* <div className="grid grid-cols-1 px-10 py-4 items-center">
          <h1 className="text-lg text-center md:text-3xl">Notifications</h1>
          <div className="flex justify-center">
            <Button
              variant="success"
              className="text-white hover:text-green-700 p-2 rounded-md hover:bg-green-200"
            >
              Mark all as read
            </Button>
          </div>
        </div> */}
        <div className="flex justify-center space-x-3 border-b p-2">
          <Button
            variant="ghost"
            className={`p-1  ${
              isTabActive("all") &&
              "border-b-2 border-green-600 text-green-700 bg-green-50"
            }`}
            onClick={() => (handleTabChange("all"), setNotificationStatus(""))}
          >
            All
          </Button>
          <Button
            variant="ghost"
            className={`p-1  ${
              isTabActive("read") &&
              "border-b-2 border-green-600 text-green-700 bg-green-50"
            }`}
            onClick={() => (
              handleTabChange("read"), setNotificationStatus("READ")
            )}
          >
            Read
          </Button>
          <Button
            variant="ghost"
            className={`p-1  ${
              isTabActive("unread") &&
              "border-b-2 border-green-600 text-green-700 bg-green-50"
            }`}
            onClick={() => (
              handleTabChange("unread"), setNotificationStatus("UNREAD")
            )}
          >
            Unread
          </Button>
        </div>
        <div className="p-4 max-h-[80vh] space-y-3 overflow-y-auto scrollbar-hide">
          {notifications?.map((notification) => (
            <Button
              onClick={() => readNotification(notification.id)}
              variant="default"
              key={notification.id}
              className={`flex flex-col flex-1 p-2 rounded-md cursor-pointer  bg-transparent items-start  dark:text-white text-black w-full
              hover:bg-sky-600 hover:text-white
              ${notification.status === "READ" ? "" : "bg-gray-500"}`}
            >
              <h3 className={notification.status ? "" : "font-semibold"}>
                {notification.type}
              </h3>
              <div className="flex justify-between items-center gap-3">
                <p className="truncate">{notification.message}</p>
                <p className="text-xs">
                  <ReactTimeago date={notification.createdAt} />
                </p>
              </div>
            </Button>
          ))}
          {!notifications?.length && (
            <div className="truncate">No notifications found</div>
          )}
        </div>
      </section>
    </>
  );
};

export default NotificationsList;
