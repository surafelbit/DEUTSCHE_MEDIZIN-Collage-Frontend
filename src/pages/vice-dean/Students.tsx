"use client";
import { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import apiService from "../../components/api/apiService";
import endPoints from "../../components/api/endPoints";
import { AcademicProgression } from "@/components/Extra/AcademicProgression"; // Adjust path as needed

// Cache configuration - adjust this value to change how long data stays cached (in hours)
const CACHE_DURATION_HOURS = 7 * 24; // Change this to your desired cache duration
const CACHE_KEY = "vice_dean_students_data";

type Student = {
  studentId: number;
  studentUserId: number;
  idNumber: string;
  fullName: string;
  department: string;
  batchClassYearSemester: string;
  batchName: string; // Added batchName field
  studentStatus: string;
  cgpa: number;
};

interface CachedStudentsData {
  students: Student[];
  timestamp: number;
}

// Interface for academic progress data
interface AcademicProgressData {
  studentId: number;
  username: string;
  fullName: string;
  department: string;
  currentStatus: string;
  currentBatchClassYearSemester: string;
  takenCourses: any[];
  totalTakenCourses: number;
  totalTakenCreditHours: number;
  remainingCourses: any[];
  totalRemainingCourses: number;
  totalRemainingCreditHours: number;
}

export default function ViceDeanStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [dept, setDept] = useState("All");
  const [batchYearSemester, setBatchYearSemester] = useState("All");
  const [originalBatch, setOriginalBatch] = useState("All");
  const [selected, setSelected] = useState<Student | undefined>(undefined);

  // Academic progress states
  const [academicProgress, setAcademicProgress] =
    useState<AcademicProgressData | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const isCacheValid = (cachedData: CachedStudentsData | null): boolean => {
    if (!cachedData) return false;

    const now = Date.now();
    const cacheAge = now - cachedData.timestamp;
    const cacheDurationMs = CACHE_DURATION_HOURS * 60 * 60 * 1000;

    return cacheAge < cacheDurationMs;
  };

  const saveToCache = (studentsData: Student[]) => {
    try {
      const cacheData: CachedStudentsData = {
        students: studentsData,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to save to session storage:", err);
    }
  };

  const loadFromCache = (): Student[] | null => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const cachedData: CachedStudentsData = JSON.parse(cached);

      if (isCacheValid(cachedData)) {
        setLastUpdated(new Date(cachedData.timestamp));
        return cachedData.students;
      }

      // Cache expired, remove it
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    } catch (err) {
      console.error("Failed to load from session storage:", err);
      return null;
    }
  };

  const fetchStudents = async (forceRefresh: boolean = false) => {
    try {
      if (!forceRefresh) {
        // Try to load from cache first
        const cachedData = loadFromCache();
        if (cachedData) {
          setStudents(cachedData);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      setError(null);
      const data = await apiService.get(endPoints.getAllStudentsCGPA_VD);
      setStudents(data);
      saveToCache(data);
    } catch (err: any) {
      console.error("Error fetching students:", err);
      setError(err.response?.data?.error || "Failed to load students data");

      // If API fails but we have expired cache, use it as fallback
      const expiredCache = loadFromCache();
      if (expiredCache) {
        setStudents(expiredCache);
        setError(null); // Clear error since we have fallback data
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStudents(true);
  };

  // Fetch academic progress when student is selected
  const fetchAcademicProgress = async (studentUserId: number) => {
    try {
      setLoadingProgress(true);
      setProgressError(null);
      const endpoint = endPoints.studentsAcademicProgress.replace(
        ":userId",
        studentUserId.toString(),
      );
      console.log("Fetching from endpoint:", endpoint);
      const data = await apiService.get(endpoint);
      console.log("Academic Progress Response:", data);
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

  // Handle student click
  const handleViewProfile = (student: Student) => {
    setSelected(student);
    setAcademicProgress(null);
    setProgressError(null);
    fetchAcademicProgress(student.studentUserId);
  };

  // Extract unique values for filters
  const departments = useMemo(() => {
    const depts = students.map((s) => s.department);
    return Array.from(new Set(depts)).sort();
  }, [students]);

  const statuses = useMemo(() => {
    const stats = students.map((s) => s.studentStatus);
    return Array.from(new Set(stats)).sort();
  }, [students]);

  const batchYearSemesters = useMemo(() => {
    const bcys = students.map((s) => s.batchClassYearSemester);
    return Array.from(new Set(bcys)).sort();
  }, [students]);

  const originalBatches = useMemo(() => {
    const batches = students.map((s) => s.batchName).filter(Boolean);
    return Array.from(new Set(batches)).sort();
  }, [students]);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        s.fullName.toLowerCase().includes(query.toLowerCase()) ||
        s.idNumber.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || s.studentStatus === status;
      const matchesDept = dept === "All" || s.department === dept;
      const matchesBatchYearSemester =
        batchYearSemester === "All" ||
        s.batchClassYearSemester === batchYearSemester;
      const matchesOriginalBatch =
        originalBatch === "All" || s.batchName === originalBatch;
      return (
        matchesQuery &&
        matchesStatus &&
        matchesDept &&
        matchesBatchYearSemester &&
        matchesOriginalBatch
      );
    });
  }, [query, status, dept, batchYearSemester, originalBatch, students]);

  const handleReset = () => {
    setQuery("");
    setStatus("All");
    setDept("All");
    setBatchYearSemester("All");
    setOriginalBatch("All");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="p-4 space-y-4 max-w-full mx-auto">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error && !students.length) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Error Loading Students
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <Button onClick={() => fetchStudents(true)}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="p-4 space-y-4 max-w-full mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              Student Overview
            </h1>
            {lastUpdated && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Total Students
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {students.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Avg CGPA (All)
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {students.length > 0
                  ? (
                      students.reduce((a, c) => a + c.cgpa, 0) / students.length
                    ).toFixed(2)
                  : "0.00"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Active Students
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {students.filter((s) => s.studentStatus === "Active").length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Graduated
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {students.filter((s) => s.studentStatus === "Graduated").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Students with CGPA ≥ 3.5
              </p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {students.filter((s) => s.cgpa >= 3.5).length}
                <span className="text-xs font-normal ml-2 text-gray-500">
                  (
                  {students.length > 0
                    ? (
                        (students.filter((s) => s.cgpa >= 3.5).length /
                          students.length) *
                        100
                      ).toFixed(1)
                    : "0"}
                  %)
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Students with CGPA &lt; 2.0
              </p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                {students.filter((s) => s.cgpa < 2.0).length}
                <span className="text-xs font-normal ml-2 text-gray-500">
                  (
                  {students.length > 0
                    ? (
                        (students.filter((s) => s.cgpa < 2.0).length /
                          students.length) *
                        100
                      ).toFixed(1)
                    : "0"}
                  %)
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Currently Filtered
              </p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {filtered.length}
                <span className="text-xs font-normal ml-2 text-gray-500">
                  of {students.length}
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
            <input
              placeholder="Search by name or ID"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              {statuses.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <select
              value={batchYearSemester}
              onChange={(e) => setBatchYearSemester(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Batch/Year/Semester</option>
              {batchYearSemesters.map((bcys) => (
                <option key={bcys} value={bcys}>
                  {bcys}
                </option>
              ))}
            </select>
            <select
              value={originalBatch}
              onChange={(e) => setOriginalBatch(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Original Batches</option>
              {originalBatches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 flex-1"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 flex-1"
                onClick={() => {}}
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <CardContent className="p-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-2">ID Number</th>
                  <th className="p-2">Full Name</th>
                  <th className="p-2">Department</th>
                  <th className="p-2">Batch/Year/Semester</th>
                  <th className="p-2">Original Batch</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">CGPA</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      No students found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr
                      key={s.studentId}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => handleViewProfile(s)}
                    >
                      <td className="p-2 font-mono text-xs">{s.idNumber}</td>
                      <td className="p-2 font-medium">{s.fullName}</td>
                      <td className="p-2">{s.department}</td>
                      <td className="p-2 text-xs">
                        {s.batchClassYearSemester}
                      </td>
                      <td className="p-2 text-xs">{s.batchName || "N/A"}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            s.studentStatus === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : s.studentStatus === "Graduated"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {s.studentStatus}
                        </span>
                      </td>
                      <td className="p-2">
                        <span
                          className={`font-semibold ${
                            s.cgpa >= 3.5
                              ? "text-green-600 dark:text-green-400"
                              : s.cgpa >= 2.5
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {s.cgpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProfile(s);
                          }}
                        >
                          View Progress
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Student Detail Modal with Academic Progression */}
        <Sheet
          open={!!selected}
          onOpenChange={(o) => !o && setSelected(undefined)}
        >
          <SheetContent
            side="right"
            className="w-[85vw] sm:max-w-3xl lg:max-w-4xl overflow-y-auto p-0"
          >
            {selected && (
              <div className="h-full">
                <SheetHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-blue-600 dark:text-blue-400 text-xl">
                      {selected.fullName} • {selected.idNumber}
                    </SheetTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setSelected(undefined)}
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
                      {selected && (
                        <Button
                          variant="outline"
                          onClick={() =>
                            fetchAcademicProgress(selected.studentUserId)
                          }
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
                      // ⭐ FIX: Map takenCourses to convert 'released' to 'isReleased'
                      takenCourses={
                        academicProgress.takenCourses?.map((course: any) => ({
                          courseId: course.courseId,
                          courseCode: course.courseCode,
                          courseTitle: course.courseTitle,
                          creditHours: course.creditHours,
                          courseSource: course.courseSource,
                          takenIn: course.takenIn,
                          isReleased: course.released, // ⭐ Map released to isReleased
                        })) || []
                      }
                      totalTakenCourses={academicProgress.totalTakenCourses}
                      totalTakenCreditHours={
                        academicProgress.totalTakenCreditHours
                      }
                      // Map remaining courses
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
      </div>
    </div>
  );
}
