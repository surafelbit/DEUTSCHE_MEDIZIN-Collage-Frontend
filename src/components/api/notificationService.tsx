import apiClient from "./apiClient";
import endPoints from "./endPoints";

export interface Notification {
  id: number;
  senderRole: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

// New response structure from v2 endpoint
export interface NotificationsV2Response {
  info: {
    totalNotifications: number;
    unreadCount: number;
    readCount: number;
  };
  notifications: Array<{
    id: number;
    senderRole: string;
    message: string;
    createdAt: string;
    read: boolean;
  }>;
}

class NotificationService {
  // Normalize varying backend shapes to our Notification interface
  private normalizeNotification(item: any): Notification {
    return {
      id: item.id,
      senderRole: item.senderRole,
      message: item.message,
      createdAt: item.createdAt,
      isRead:
        typeof item.isRead === "boolean" ? item.isRead : Boolean(item.read),
    } as Notification;
  }

  // NEW: Get notifications with unread count in one request
  async getNotificationsWithCount(): Promise<{
    notifications: Notification[];
    unreadCount: number;
    totalCount: number;
  }> {
    try {
      const response = await apiClient.get(endPoints.notificationsV2Latest);
      const data = response.data as NotificationsV2Response;

      return {
        notifications: data.notifications.map((n) =>
          this.normalizeNotification(n),
        ),
        unreadCount: data.info.unreadCount,
        totalCount: data.info.totalNotifications,
      };
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  // Keep old methods for backward compatibility
  async getAllNotifications(): Promise<Notification[]> {
    try {
      const response = await apiClient.get(endPoints.notifications);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.notifications || [];
      return (data as any[]).map((n) => this.normalizeNotification(n));
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  async getLatestNotifications(): Promise<Notification[]> {
    try {
      const response = await apiClient.get(endPoints.notificationsLatest);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.notifications || [];
      return (data as any[]).map((n) => this.normalizeNotification(n));
    } catch (error) {
      console.error("Error fetching latest notifications:", error);
      throw error;
    }
  }

  async markNotificationAsRead(notificationId: number): Promise<void> {
    try {
      const endpoint = endPoints.markNotificationRead.replace(
        ":id",
        notificationId.toString(),
      );
      await apiClient.patch(endpoint);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  }

  async markAllNotificationsAsRead(): Promise<void> {
    try {
      await apiClient.patch(endPoints.markAllNotificationsRead);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  }

  getUnreadCount(notifications: Notification[]): number {
    return notifications.filter((notification) => !notification.isRead).length;
  }

  sortNotificationsByPriority(notifications: Notification[]): Notification[] {
    return [...notifications].sort((a, b) => {
      if (a.isRead !== b.isRead) {
        return a.isRead ? 1 : -1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  formatTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
}

export default new NotificationService();
