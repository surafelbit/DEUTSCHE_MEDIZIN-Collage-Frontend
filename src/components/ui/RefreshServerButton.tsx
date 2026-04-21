"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearAllApiCache } from "@/components/api/cacheService";

const LOCK_DURATION_MS = 5 * 60 * 1000;
const STORAGE_KEY = "refresh_server_lock_until";

const formatCountdown = (msRemaining: number) => {
  const totalSeconds = Math.max(0, Math.ceil(msRemaining / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function RefreshServerButton() {
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Load lock from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const lockTime = parseInt(stored, 10);
      if (lockTime > Date.now()) {
        setLockUntil(lockTime);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const remainingMs = useMemo(() => {
    if (!lockUntil) return 0;
    return Math.max(0, lockUntil - now);
  }, [lockUntil, now]);

  const isLocked = remainingMs > 0;

  // Update countdown timer
  useEffect(() => {
    if (!isLocked) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLocked]);

  // Auto-unlock when countdown reaches zero
  useEffect(() => {
    if (lockUntil && remainingMs === 0) {
      setLockUntil(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [lockUntil, remainingMs]);

  const handleRefresh = useCallback(async () => {
    if (isLocked || isRefreshing) return;

    setIsRefreshing(true);

    try {
      await clearAllApiCache();
      toast.success("Server cache cleared successfully.");

      const newLockUntil = Date.now() + LOCK_DURATION_MS;
      setLockUntil(newLockUntil);
      localStorage.setItem(STORAGE_KEY, newLockUntil.toString());
      setNow(Date.now());
    } catch (error) {
      toast.error("Failed to refresh server cache.");
      console.error("Failed to refresh server cache:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isLocked, isRefreshing]);

  // Get button text based on state
  const buttonText = useMemo(() => {
    if (isRefreshing) return "Refreshing...";
    if (isLocked) return formatCountdown(remainingMs);
    return "Refresh Server";
  }, [isRefreshing, isLocked, remainingMs]);

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        onClick={handleRefresh}
        disabled={isLocked || isRefreshing}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-600"
      >
        <RefreshCw
          className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
        />
        <span>{buttonText}</span>
      </Button>
    </div>
  );
}
