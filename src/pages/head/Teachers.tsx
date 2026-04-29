"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, AlertCircle, Power, PowerOff } from "lucide-react";
import apiClient from "@/components/api/apiClient";
import apiService from "@/components/api/apiService";
import endPoints from "@/components/api/endPoints";
import { useToast } from "@/hooks/use-toast";

type Teacher = {
  teacherId: number;
  teacherUserId: number;
  fullName: string;
  title: string;
  email: string;
  phoneNumber: string;
  yearsOfExperience: number;
  numberOfCourses: number;
  accountStatus: "Active" | "Inactive" | "ENABLED" | "DISABLED";
  firstNameAmharic?: string;
  lastNameAmharic?: string;
  photographBase64?: string;
};

export default function HeadTeachers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingUserId, setTogglingUserId] = useState<number | null>(null);

  const fetchTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get(endPoints.departmentTeachers);
      if (res.data && Array.isArray(res.data)) {
        setTeachers(res.data);
      } else {
        setTeachers([]);
        setError("No teachers found.");
      }
    } catch (err: any) {
      console.error("Failed to fetch teachers:", err);
      setError(err.response?.data?.error || "Failed to load teachers.");
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const toggleAccountStatus = async (
    teacher: Teacher,
    newStatus: "ENABLED" | "DISABLED",
  ) => {
    setTogglingUserId(teacher.teacherUserId);

    try {
      const response = await apiService.patch(endPoints.teacherAccount, [
        {
          userId: teacher.teacherUserId,
          status: newStatus,
        },
      ]);

      // Handle bulk response format
      if (response.results && response.results[0]) {
        const result = response.results[0];

        if (result.success) {
          setTeachers((prev) =>
            prev.map((t) =>
              t.teacherUserId === teacher.teacherUserId
                ? {
                    ...t,
                    accountStatus:
                      newStatus === "ENABLED" ? "Active" : "Inactive",
                  }
                : t,
            ),
          );

          toast({
            title:
              result.message ||
              `Teacher ${newStatus === "ENABLED" ? "enabled" : "disabled"} successfully`,
            description: `${teacher.fullName}'s account has been ${newStatus === "ENABLED" ? "activated" : "deactivated"}.`,
            variant: "default",
          });
        } else {
          toast({
            title: "Action failed",
            description: result.error || "Failed to update account status",
            variant: "destructive",
          });
        }
      } else if (response.processed !== undefined) {
        const successCount = response.success;
        const failedCount = response.failed;

        if (successCount > 0 && failedCount === 0) {
          setTeachers((prev) =>
            prev.map((t) =>
              t.teacherUserId === teacher.teacherUserId
                ? {
                    ...t,
                    accountStatus:
                      newStatus === "ENABLED" ? "Active" : "Inactive",
                  }
                : t,
            ),
          );

          toast({
            title: "Success",
            description: `Teacher ${newStatus === "ENABLED" ? "enabled" : "disabled"} successfully.`,
            variant: "default",
          });
        } else if (successCount > 0 && failedCount > 0) {
          toast({
            title: "Partial Success",
            description: `${successCount} succeeded, ${failedCount} failed. Please try again.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Action failed",
            description: "Failed to update account status. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: any) {
      console.error("Failed to toggle account status:", err);
      toast({
        title: "Error",
        description:
          err.response?.data?.error ||
          "Failed to update account status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTogglingUserId(null);
    }
  };

  const handleToggleClick = (teacher: Teacher) => {
    const currentStatus = teacher.accountStatus;
    const isActive = currentStatus === "Active" || currentStatus === "ENABLED";
    const newStatus = isActive ? "DISABLED" : "ENABLED";

    if (!isActive) {
      // Enabling - no warning needed
      toggleAccountStatus(teacher, newStatus);
    } else {
      // Disabling - show confirmation
      const confirmed = window.confirm(
        `⚠️ WARNING: Disable ${teacher.fullName}'s account?\n\n` +
          `Once disabled:\n` +
          `• The teacher will NOT be able to login\n` +
          `• They cannot access their account\n` +
          `• They won't be able to manage courses or grades\n` +
          `• You can enable them anytime to restore access\n\n` +
          `Are you sure you want to disable this account?`,
      );

      if (confirmed) {
        toggleAccountStatus(teacher, newStatus);
      }
    }
  };

  const filtered = useMemo(() => {
    if (!query) return teachers;
    const lowerQuery = query.toLowerCase();
    return teachers.filter(
      (t) =>
        t.teacherId.toString().includes(query) ||
        t.fullName.toLowerCase().includes(lowerQuery) ||
        t.email.toLowerCase().includes(lowerQuery) ||
        t.phoneNumber.includes(query) ||
        t.title.toLowerCase().includes(lowerQuery),
    );
  }, [teachers, query]);

  const isTeacherActive = (status: string) =>
    status === "Active" || status === "ENABLED";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Department Teachers</h1>
        <Link to="/head/create-teacher">
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Create Teacher
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Management</CardTitle>
          <CardDescription>
            View and manage all teachers in your department
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Input
            placeholder="Search by ID, name, email, phone, or title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-md"
            disabled={loading}
          />

          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Loading teachers...
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-12">
              <div className="inline-flex flex-col items-center gap-3 text-muted-foreground">
                <AlertCircle className="h-8 w-8 text-amber-500" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 pr-6">Photo</th>
                    <th className="py-3 pr-6">Teacher ID</th>
                    <th className="py-3 pr-6">Name</th>
                    <th className="py-3 pr-6">Department</th>
                    <th className="py-3 pr-6">Title</th>
                    <th className="py-3 pr-6">Courses</th>
                    <th className="py-3 pr-6">Account Status</th>
                    <th className="py-3 pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No teachers found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((teacher) => {
                      const isActive = isTeacherActive(teacher.accountStatus);
                      return (
                        <tr
                          key={teacher.teacherId}
                          className={`border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                            !isActive ? "opacity-60 bg-muted/20" : ""
                          }`}
                          onClick={() =>
                            navigate(`/head/teachers/${teacher.teacherId}`)
                          }
                        >
                          <td className="py-4 pr-6">
                            <Avatar>
                              <AvatarImage
                                src={teacher.photographBase64 || undefined}
                              />
                              <AvatarFallback className="bg-primary/10">
                                {teacher.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </td>
                          <td className="py-4 pr-6 font-mono text-muted-foreground">
                            {teacher.teacherId}
                          </td>
                          <td className="py-4 pr-6">
                            <div className="font-medium">
                              {teacher.fullName}
                            </div>
                          </td>
                          <td className="py-4 pr-6">
                            <Badge variant="secondary">Your Department</Badge>
                          </td>
                          <td className="py-4 pr-6">{teacher.title}</td>
                          <td className="py-4 pr-6 text-center">
                            <Badge variant="outline">
                              {teacher.numberOfCourses}
                            </Badge>
                          </td>
                          <td className="py-4 pr-6">
                            <Badge
                              variant={isActive ? "default" : "secondary"}
                              className={isActive ? "bg-green-500" : ""}
                            >
                              {isActive ? "Active" : "Disabled"}
                            </Badge>
                          </td>
                          <td className="py-4 pr-6">
                            <div
                              className="flex gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  navigate(
                                    `/head/teachers/${teacher.teacherId}`,
                                  )
                                }
                              >
                                View Profile
                              </Button>
                              <Button
                                size="sm"
                                variant={isActive ? "destructive" : "default"}
                                onClick={() => handleToggleClick(teacher)}
                                disabled={
                                  togglingUserId === teacher.teacherUserId
                                }
                                className="flex items-center gap-1"
                              >
                                {togglingUserId === teacher.teacherUserId ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                ) : isActive ? (
                                  <PowerOff className="h-3 w-3" />
                                ) : (
                                  <Power className="h-3 w-3" />
                                )}
                                {isActive ? "Disable" : "Enable"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
