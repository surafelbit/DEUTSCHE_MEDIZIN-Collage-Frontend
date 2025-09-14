import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New student registered",
      read: false,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      text: "Fee payment confirmed",
      read: true,
      timestamp: "Yesterday",
    },
    {
      id: 3,
      text: "Grade report submitted",
      read: false,
      timestamp: "3 hours ago",
    },
    {
      id: 4,
      text: "New message from Admin",
      read: false,
      timestamp: "1 hour ago",
    },
    {
      id: 5,
      text: "System maintenance tonight",
      read: true,
      timestamp: "2 days ago",
    },
    {
      id: 6,
      text: "Reminder: Submit documents",
      read: false,
      timestamp: "Today",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 dark:from-blue-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-x-4 border-b border-blue-200 bg-white/90 backdrop-blur-lg px-4 shadow-sm dark:border-blue-700 dark:bg-gray-800/90 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100 flex items-center gap-x-3">
          <Bell className="w-6 h-6 text-blue-500" />
          Notifications
        </h1>
        <button
          onClick={markAllAsRead}
          className="ml-auto text-sm px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Mark All as Read
        </button>
      </header>

      {/* Notifications List */}
      <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No notifications to show
              </p>
            </div>
          ) : (
            notifications.map((note, index) => (
              <div
                key={note.id}
                className={`flex items-center justify-between px-6 py-4 border-b border-blue-200 dark:border-blue-700 last:border-none transition-all duration-300 transform hover:scale-[1.01] ${
                  note.read
                    ? "bg-gray-50 dark:bg-gray-900"
                    : "bg-blue-100/50 dark:bg-blue-900/30"
                } ${index === 0 ? "rounded-t-xl" : ""} ${
                  index === notifications.length - 1 ? "rounded-b-xl" : ""
                }`}
              >
                <div className="flex-1">
                  <p
                    className={`text-base font-medium ${
                      note.read
                        ? "text-gray-600 dark:text-gray-300"
                        : "text-blue-900 dark:text-blue-100"
                    }`}
                  >
                    {note.text}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {note.timestamp}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  {!note.read && (
                    <button
                      onClick={() => markAsRead(note.id)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                  {!note.read && (
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-600 animate-pulse"></span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
