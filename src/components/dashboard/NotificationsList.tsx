"use client";
import React, { useState } from "react";
import { TbLetterO, TbLetterQ, TbLetterS } from "react-icons/tb";
import { Notification } from "@/types/types";
import { Button } from "../ui/button";
import ReactTimeago from "react-timeago";
import InfiniteScroll from "react-infinite-scroll-component";

const NotificationsList = ({
  notifications,
  setNotificationStatus,
  hasMore,
  fetchNotifications,
}: {
  notifications: Notification[];
  setNotificationStatus: any;
  hasMore: any;
  fetchNotifications: any;
}) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const isTabActive = (tab: string) => {
    return activeTab === tab;
  };
  console.log(notifications);
  return (
    <>
      <section className="bg-white border-2 shadow-2xl">
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
          <button
            className={`p-1  ${
              isTabActive("all") &&
              "border-b-2 border-green-600 text-green-700 bg-green-50"
            }`}
            onClick={() => (handleTabChange("all"), setNotificationStatus(""))}
          >
            All
          </button>
          <button
            className={`p-1  ${
              isTabActive("read") &&
              "border-b-2 border-green-600 text-green-700 bg-green-50"
            }`}
            onClick={() => (
              handleTabChange("read"), setNotificationStatus("READ")
            )}
          >
            Read
          </button>
          <button
            className={`p-1  ${
              isTabActive("unread") &&
              "border-b-2 border-green-600 text-green-700 bg-green-50"
            }`}
            onClick={() => (
              handleTabChange("unread"), setNotificationStatus("UNREAD")
            )}
          >
            Unread
          </button>
        </div>
        <div className="p-4 max-h-[80vh] space-y-3 overflow-y-auto scrollbar-hide">
          <InfiniteScroll
            dataLength={notifications.length}
            next={fetchNotifications}
            hasMore={hasMore}
            loader={<h4 className="text-2xl">Loading...</h4>}
          >
            {notifications.map((notification) => (
              <div
                className="flex items-center space-x-2"
                key={notification.id}
              >
                <div>
                  <button
                    className={`p-2 text-white rounded-full ${
                      (notification.type === "READ" && "bg-purple-700") ||
                      (notification.type === "UNREAD" && "bg-green-700") ||
                      (notification.type === "READ" && "bg-orange-700")
                    } `}
                  >
                    {notification.type === "READ" && <TbLetterS size={28} />}
                    {notification.type === "UNREAD" && <TbLetterQ size={28} />}
                    {notification.type === "READ" && <TbLetterO size={28} />}
                  </button>
                </div>

                <div
                  className={`flex flex-col flex-1 p-1 rounded-md cursor-pointer
                ${
                  notification.status
                    ? ""
                    : "bg-slate-100 text-green-800 hover:bg-green-100"
                }`}
                >
                  <h3 className={notification.status ? "" : "font-semibold"}>
                    {notification.type}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="truncate">{notification.message}</p>
                    <p className="text-xs">
                      <ReactTimeago date={notification.createdAt} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
};

export default NotificationsList;
