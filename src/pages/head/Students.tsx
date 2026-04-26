"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X, AlertCircle } from "lucide-react"; // Add X and AlertCircle to existing lucide-react imports
import { Skeleton } from "@/components/ui/skeleton"; // Add this
import { AcademicProgression } from "@/components/Extra/AcademicProgression"; // Add this - adjust path if needed
import { useMemo, useState, useEffect } from "react";
import apiService from "@/components/api/apiService";
import { clearCacheForUrl } from "@/components/api/cacheService";
import endPoints from "@/components/api/endPoints";
import {
  Loader2,
  User,
  Phone,
  GraduationCap,
  Activity,
  Users,
  Mars,
  Venus,
  CheckCircle,
  XCircle,
  Filter,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: number;
  studentId: string;
  userId: number; // ← This is the key field - matches backend's 'userId'
  fullName: string;
  recentBcysName: string;
  studentRecentStatusName: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE";
  originalBatch: string;
}

interface Statistics {
  totalStudentsInDepartment: number;
  totalStudentsInCollege: number;
  percentageOfCollege: number;
  maleCount: number;
  femaleCount: number;
  activeStudentsCount: number;
  inactiveStudentsCount: number;
}

interface DepartmentStudentsResponse {
  students: Student[];
  statistics: Statistics;
}

export default function HeadStudents() {
  const [query, setQuery] = useState("");
  const [selectedBcys, setSelectedBcys] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedOriginalBatch, setSelectedOriginalBatch] =
    useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departmentData, setDepartmentData] =
    useState<DepartmentStudentsResponse | null>(null);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [academicProgress, setAcademicProgress] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);

  const fetchDepartmentStudents = async (showLoadingState = true) => {
    try {
      if (showLoadingState) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);

      const response = await apiService.get<DepartmentStudentsResponse>(
        endPoints.departmentStudents,
      );
      setDepartmentData(response);
    } catch (err: any) {
      console.error("Failed to load students:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to load students. Please try again later.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    clearCacheForUrl(endPoints.departmentStudents);
    fetchDepartmentStudents(false);
  };

  useEffect(() => {
    fetchDepartmentStudents(true);
  }, []);

  // Get distinct BCYS values from students
  const distinctBcysValues = useMemo(() => {
    if (!departmentData?.students) return [];
    const bcysSet = new Set(
      departmentData.students.map((s) => s.recentBcysName),
    );
    return Array.from(bcysSet).sort();
  }, [departmentData]);

  // Get distinct status values from students
  const distinctStatusValues = useMemo(() => {
    if (!departmentData?.students) return [];
    const statusSet = new Set(
      departmentData.students.map((s) => s.studentRecentStatusName),
    );
    return Array.from(statusSet).sort();
  }, [departmentData]);

  // Get distinct gender values from students
  const distinctGenderValues = useMemo(() => {
    if (!departmentData?.students) return [];
    const genderSet = new Set(departmentData.students.map((s) => s.gender));
    return Array.from(genderSet).sort();
  }, [departmentData]);

  // Get distinct original batch values from students
  const distinctOriginalBatchValues = useMemo(() => {
    if (!departmentData?.students) return [];
    const batchSet = new Set(
      departmentData.students.map((s) => s.originalBatch),
    );
    return Array.from(batchSet).sort((a, b) => {
      // Sort numerically if they're numbers, otherwise alphabetically
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return a.localeCompare(b);
    });
  }, [departmentData]);

  const filtered = useMemo(() => {
    if (!departmentData?.students) return [];

    return departmentData.students.filter((s) => {
      const matchesQuery =
        s.fullName.toLowerCase().includes(query.toLowerCase()) ||
        s.studentId.toLowerCase().includes(query.toLowerCase()) ||
        s.phoneNumber.includes(query);

      const matchesBcys =
        selectedBcys === "All" || s.recentBcysName === selectedBcys;
      const matchesStatus =
        selectedStatus === "All" ||
        s.studentRecentStatusName === selectedStatus;
      const matchesGender =
        selectedGender === "All" || s.gender === selectedGender;
      const matchesOriginalBatch =
        selectedOriginalBatch === "All" ||
        s.originalBatch === selectedOriginalBatch;

      return (
        matchesQuery &&
        matchesBcys &&
        matchesStatus &&
        matchesGender &&
        matchesOriginalBatch
      );
    });
  }, [
    query,
    selectedBcys,
    selectedStatus,
    selectedGender,
    selectedOriginalBatch,
    departmentData,
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "graduated":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getGenderIcon = (gender: string) => {
    return gender === "MALE" ? (
      <Mars className="h-4 w-4" />
    ) : (
      <Venus className="h-4 w-4" />
    );
  };

  const fetchAcademicProgress = async (userId: number) => {
    // ← Changed parameter name
    try {
      setLoadingProgress(true);
      setProgressError(null);
      const endpoint = endPoints.studentsAcademicProgress.replace(
        ":userId",
        userId.toString(), // ← Use userId parameter
      );
      const data = await apiService.get(endpoint);
      setAcademicProgress(data);
    } catch (err: any) {
      console.error("Failed to load academic progress:", err);
      setProgressError(
        err.response?.data?.error ||
          err.message ||
          "Failed to load academic progress",
      );
    } finally {
      setLoadingProgress(false);
    }
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setAcademicProgress(null);
    setProgressError(null);
    if (student.userId) {
      fetchAcademicProgress(student.userId);
    } else {
      setProgressError("Student user ID not available");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-lg">Loading department students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
          <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-lg text-red-600 dark:text-red-400 text-center px-4">
          {error}
        </p>
        <Button variant="outline" onClick={handleRefresh}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Department Students
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and view all students in your department
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {refreshing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </>
          )}
        </Button>
      </div>

      {/* Statistics Cards */}
      {departmentData?.statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {departmentData.statistics.totalStudentsInDepartment}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {departmentData.statistics.percentageOfCollege.toFixed(1)}% of
                college total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {departmentData.statistics.activeStudentsCount}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {departmentData.statistics.inactiveStudentsCount} inactive
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Male Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {departmentData.statistics.maleCount}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Mars className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {(
                  (departmentData.statistics.maleCount /
                    departmentData.statistics.totalStudentsInDepartment) *
                  100
                ).toFixed(1)}
                % of department
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Female Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {departmentData.statistics.femaleCount}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
                  <Venus className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {(
                  (departmentData.statistics.femaleCount /
                    departmentData.statistics.totalStudentsInDepartment) *
                  100
                ).toFixed(1)}
                % of department
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Card */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Student Management
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Search, filter, and view student profiles
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Search
              </label>
              <Input
                placeholder="Search by name, ID, or phone"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Batch/Class/Year/Semester
              </label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                value={selectedBcys}
                onChange={(e) => setSelectedBcys(e.target.value)}
              >
                <option value="All">All</option>
                {distinctBcysValues.map((bcys) => (
                  <option key={bcys} value={bcys}>
                    {bcys}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Status
              </label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                {distinctStatusValues.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Gender
              </label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="All">All Genders</option>
                {distinctGenderValues.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender === "MALE" ? "Male" : "Female"}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Original Batch
              </label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                value={selectedOriginalBatch}
                onChange={(e) => setSelectedOriginalBatch(e.target.value)}
              >
                <option value="All">All Batches</option>
                {distinctOriginalBatchValues.map((batch) => (
                  <option key={batch} value={batch}>
                    Batch {batch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="text-left">
                  <th className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Student ID
                  </th>
                  <th className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </th>
                  <th className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Gender
                  </th>
                  <th className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Original Batch
                  </th>
                  <th className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Current Batch/ClassYear/Semester
                  </th>
                  {/* <th className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </th> */}
                  <th className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      No students found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filtered.map((student) => (
                    <tr
                      key={student.id}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm text-gray-800 dark:text-gray-100 font-mono">
                          {student.studentId}
                        </code>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                        {student.fullName}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          {getGenderIcon(student.gender)}
                          <span>
                            {student.gender === "MALE" ? "Male" : "Female"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                        >
                          Batch {student.originalBatch}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                        {student.recentBcysName}
                      </td>
                      {/* <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        {student.phoneNumber}
                      </td> */}
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(student.studentRecentStatusName)}`}
                        >
                          {student.studentRecentStatusName}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(student)}
                          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400 gap-4">
            <div className="text-center sm:text-left">
              Showing{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {departmentData?.students.length || 0}
              </span>{" "}
              students
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {selectedBcys !== "All" && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                  <Filter className="h-3 w-3" />
                  BCYS: {selectedBcys}
                </div>
              )}
              {selectedStatus !== "All" && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs">
                  <Filter className="h-3 w-3" />
                  Status: {selectedStatus}
                </div>
              )}
              {selectedGender !== "All" && (
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                  <Filter className="h-3 w-3" />
                  Gender: {selectedGender === "MALE" ? "Male" : "Female"}
                </div>
              )}
              {selectedOriginalBatch !== "All" && (
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-xs">
                  <Filter className="h-3 w-3" />
                  Batch: {selectedOriginalBatch}
                </div>
              )}
              <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
              <span>
                {departmentData?.statistics.activeStudentsCount || 0} Active
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span>
                {departmentData?.statistics.totalStudentsInDepartment || 0}{" "}
                Total
              </span>
            </div>
          </div>
        </CardContent>
        {/* Student Detail Modal with Academic Progression */}
        <Sheet
          open={!!selectedStudent}
          onOpenChange={(open) => !open && setSelectedStudent(null)}
        >
          <SheetContent
            side="right"
            className="w-[85vw] sm:max-w-3xl lg:max-w-4xl overflow-y-auto p-0"
          >
            {selectedStudent && (
              <div className="h-full">
                <SheetHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-blue-600 dark:text-blue-400 text-xl">
                      {selectedStudent.fullName} • {selectedStudent.studentId}
                    </SheetTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setSelectedStudent(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </SheetHeader>

                <div className="p-6 pt-4">
                  {loadingProgress ? (
                    <div className="flex flex-col items-center justify-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                      <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Loading academic progress...
                      </p>
                    </div>
                  ) : progressError ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                      <AlertCircle className="h-12 w-12 text-red-500" />
                      <p className="text-red-600 dark:text-red-400 text-center">
                        {progressError}
                      </p>
                      {selectedStudent &&
                        selectedStudent.userId && ( // ← Changed to userId
                          <Button
                            variant="outline"
                            onClick={() =>
                              fetchAcademicProgress(selectedStudent.userId)
                            } // ← Changed to userId
                          >
                            Retry
                          </Button>
                        )}
                    </div>
                  ) : academicProgress ? (
                    <AcademicProgression
                      studentId={academicProgress.studentId}
                      username={academicProgress.username}
                      fullName={academicProgress.fullName}
                      department={academicProgress.department}
                      currentStatus={academicProgress.currentStatus}
                      currentBatchClassYearSemester={
                        academicProgress.currentBatchClassYearSemester
                      }
                      takenCourses={
                        academicProgress.takenCourses?.map((course: any) => ({
                          courseId: course.courseId,
                          courseCode: course.courseCode,
                          courseTitle: course.courseTitle,
                          creditHours: course.creditHours,
                          courseSource: course.courseSource,
                          takenIn: course.takenIn,
                          isReleased: course.released,
                        })) || []
                      }
                      totalTakenCourses={academicProgress.totalTakenCourses}
                      totalTakenCreditHours={
                        academicProgress.totalTakenCreditHours
                      }
                      remainingCourses={
                        academicProgress.remainingCourses?.map(
                          (course: any) => ({
                            courseId: course.courseId,
                            courseCode: course.courseCode,
                            courseTitle: course.courseTitle,
                            creditHours: course.creditHours,
                            expectedIn: course.expectedIn,
                          }),
                        ) || []
                      }
                      totalRemainingCourses={
                        academicProgress.totalRemainingCourses
                      }
                      totalRemainingCreditHours={
                        academicProgress.totalRemainingCreditHours
                      }
                      isLoading={false}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                      <AlertCircle className="h-12 w-12 text-yellow-500" />
                      <p className="mt-4 text-gray-600 dark:text-gray-400">
                        No academic data available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </Card>
    </div>
  );
}
