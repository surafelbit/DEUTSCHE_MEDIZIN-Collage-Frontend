"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  User,
  RefreshCw,
  Loader2,
  Award,
  BookMarked
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import endPoints from "@/components/api/endPoints";
import apiService from "@/components/api/apiService";
import { clearCacheForUrl } from "@/components/api/cacheService";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TakenCourse {
  courseId: number;
  courseCode: string;
  courseTitle: string;
  creditHours: number;
  courseSource: string;
  takenIn: string;
  released: boolean;
}

interface RemainingCourse {
  courseId: number;
  courseCode: string;
  courseTitle: string;
  creditHours: number;
  expectedIn: string;
}

interface DashboardResponse {
  profileSummary: {
    studentId: number;
    fullName: string;
    department: string;
    programModality: string;
    currentClassYear: string;
    currentSemester: string;
    academicStatus: string;
    profilePhoto: string | null;
  };
  academicProgress: {
    totalCompletedCreditHours: number;
    currentCGPA: number | null;
    lastSemesterGPA: number | null;
  };
  courseProgress: {
    takenCourses: TakenCourse[];
    totalTakenCourses: number;
    totalTakenCreditHours: number;
    remainingCourses: RemainingCourse[];
    totalRemainingCourses: number;
    totalRemainingCreditHours: number;
  };
  documentStatus: {
    registrationDocumentStatus: string;
    studentPhotoUploadStatus: string;
  };
  exitExamAndGraduation: {
    exitExamUserID: string;
    exitExamScore: number | null;
    isStudentPassExitExam: string;
    grade12Result: number | null;
    yearOfExamG12: string;
    nationalexamIdG12: string;
    dateClassEndGC: string | null;
    dateGraduated: string | null;
    entryYearGC: string;
    entryYearEC: string;
  };
}

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation(["student", "common"]);
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get<DashboardResponse>(
        endPoints.studentDashboard,
      );
      setData(response);
      setLastUpdated(new Date());
    } catch (error: any) {
      console.error("Error loading dashboard data:", error);
      setError(error.response?.data?.error || "Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await clearCacheForUrl(endPoints.studentDashboard);
    await loadDashboard();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <div className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {t("common:loading") || "Loading your dashboard..."}
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <AlertTriangle className="h-16 w-16 text-red-600" />
        <div className="text-xl font-semibold text-red-600">{error}</div>
        <Button onClick={handleRefresh} variant="outline" className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Retry
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl font-semibold text-red-600">
          Failed to load dashboard data
        </div>
      </div>
    );
  }

  const {
    profileSummary,
    academicProgress,
    courseProgress,
    documentStatus,
    exitExamAndGraduation,
  } = data;

  const firstName = profileSummary.fullName.split(" ")[0];

  const hasDocumentIssues =
    documentStatus.registrationDocumentStatus !== "COMPLETE" ||
    documentStatus.studentPhotoUploadStatus === "NOT_UPLOADED";

  // Chart Data: Credit Hours
  const totalCredits =
    courseProgress.totalTakenCreditHours + courseProgress.totalRemainingCreditHours;
  const creditChartData = {
    labels: ["Completed Credits", "Remaining Credits"],
    datasets: [
      {
        data: [
          courseProgress.totalTakenCreditHours,
          courseProgress.totalRemainingCreditHours,
        ],
        backgroundColor: ["#4CAF50", "#E0E0E0"],
        hoverBackgroundColor: ["#45a049", "#D6D6D6"],
        borderWidth: 0,
      },
    ],
  };

  // Chart Data: Courses
  const totalCourses =
    courseProgress.totalTakenCourses + courseProgress.totalRemainingCourses;
  const courseChartData = {
    labels: ["Completed Courses", "Remaining Courses"],
    datasets: [
      {
        data: [
          courseProgress.totalTakenCourses,
          courseProgress.totalRemainingCourses,
        ],
        backgroundColor: ["#2196F3", "#E0E0E0"],
        hoverBackgroundColor: ["#1976D2", "#D6D6D6"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <GraduationCap className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40 shadow-inner backdrop-blur-sm overflow-hidden">
              {profileSummary.profilePhoto ? (
                <img src={profileSummary.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-1">
                Welcome back, {firstName}!
              </h1>
              <p className="text-blue-100 font-medium text-lg flex items-center gap-2">
                <BookMarked className="w-4 h-4" /> {profileSummary.department} • {profileSummary.programModality}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                  Status: {profileSummary.academicStatus.replace("_", " ")}
                </Badge>
                {lastUpdated && (
                  <span className="text-xs text-blue-200">
                    Updated {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            onClick={handleRefresh}
            variant="secondary"
            disabled={refreshing}
            className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 shadow-md transition-all self-start md:self-center"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>
      </motion.div>

      {/* Document Status Warning */}
      {hasDocumentIssues && (
        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full mt-0.5">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-semibold text-yellow-900 dark:text-yellow-200 text-lg">
                    Action Required
                  </p>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-300 mt-1 space-y-1 list-disc list-inside">
                    {documentStatus.registrationDocumentStatus !== "COMPLETE" && (
                      <li>Your registration documents are currently marked as <span className="font-bold">{documentStatus.registrationDocumentStatus}</span>.</li>
                    )}
                    {documentStatus.studentPhotoUploadStatus === "NOT_UPLOADED" && (
                      <li>Please upload your profile photo to complete your profile.</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Current CGPA</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {academicProgress.currentCGPA !== null ? academicProgress.currentCGPA.toFixed(2) : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Last Sem: {academicProgress.lastSemesterGPA !== null ? academicProgress.lastSemesterGPA.toFixed(2) : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Credits Earned</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {courseProgress.totalTakenCreditHours}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Out of {totalCredits} required
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Courses Taken</CardTitle>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {courseProgress.totalTakenCourses}
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {courseProgress.totalRemainingCourses} remaining
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Exit Exam</CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold capitalize text-gray-900 dark:text-gray-100 mb-1">
              {exitExamAndGraduation.isStudentPassExitExam.replace("_", " ")}
            </div>
            {exitExamAndGraduation.exitExamScore !== null && (
              <p className="text-xs text-muted-foreground font-medium">
                Score: <span className="text-purple-600 font-bold">{exitExamAndGraduation.exitExamScore}</span>
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Charts (Left Column) */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Overall Progress</CardTitle>
              <CardDescription>Visual summary of your degree completion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Credits Doughnut */}
              <div className="flex flex-col items-center">
                <div className="relative w-36 h-36">
                  <Doughnut data={creditChartData} options={chartOptions} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">{courseProgress.totalTakenCreditHours}</span>
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Credits</span>
                  </div>
                </div>
                <div className="mt-4 w-full flex justify-between text-sm font-medium px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Taken</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <span className="text-muted-foreground">Remaining</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border w-full"></div>

              {/* Courses Doughnut */}
              <div className="flex flex-col items-center">
                <div className="relative w-36 h-36">
                  <Doughnut data={courseChartData} options={chartOptions} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">{courseProgress.totalTakenCourses}</span>
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Courses</span>
                  </div>
                </div>
                <div className="mt-4 w-full flex justify-between text-sm font-medium px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Taken</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <span className="text-muted-foreground">Remaining</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exit Exam & Graduation Card */}
          <Card className="shadow-md bg-slate-50 dark:bg-slate-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
                Graduation Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Entry Year (G.C)</span>
                  <span className="text-sm font-semibold">{exitExamAndGraduation.entryYearGC}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Grade 12 Result</span>
                  <span className="text-sm font-semibold">{exitExamAndGraduation.grade12Result || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">National Exam ID</span>
                  <span className="text-sm font-semibold">{exitExamAndGraduation.nationalexamIdG12 || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Class End Date</span>
                  <span className="text-sm font-semibold">{exitExamAndGraduation.dateClassEndGC || "Pending"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Courses Lists (Right Column) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Taken Courses */}
          <Card className="shadow-md h-[400px] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Taken Courses
                  </CardTitle>
                  <CardDescription>Recently completed or currently taking</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200">
                  {courseProgress.totalTakenCourses} Courses
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden flex-1">
              <div className="overflow-y-auto h-full p-4 space-y-3 custom-scrollbar">
                {courseProgress.takenCourses.length > 0 ? (
                  courseProgress.takenCourses.map((course) => (
                    <div
                      key={course.courseId}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1 mb-2 sm:mb-0 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-blue-600 dark:text-blue-400">{course.courseCode}</span>
                          <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{course.creditHours} Cr</Badge>
                          {course.released && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px] h-5 px-1.5 border-0">Released</Badge>}
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1" title={course.courseTitle}>
                          {course.courseTitle}
                        </p>
                      </div>
                      <div className="text-left sm:text-right text-xs text-muted-foreground flex flex-row sm:flex-col items-center sm:items-end justify-between">
                        <span>{course.takenIn}</span>
                        <span className="truncate max-w-[150px]" title={course.courseSource}>{course.courseSource}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <BookOpen className="h-10 w-10 mb-2 opacity-20" />
                    <p>No taken courses found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Remaining Courses */}
          <Card className="shadow-md h-[350px] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    Remaining Courses
                  </CardTitle>
                  <CardDescription>Courses needed to complete your degree</CardDescription>
                </div>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200">
                  {courseProgress.totalRemainingCourses} Courses
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden flex-1">
              <div className="overflow-y-auto h-full p-4 space-y-3 custom-scrollbar">
                {courseProgress.remainingCourses.length > 0 ? (
                  courseProgress.remainingCourses.map((course) => (
                    <div
                      key={course.courseId}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                          {course.courseCode} <span className="text-muted-foreground font-normal ml-1">- {course.courseTitle}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{course.creditHours} Cr</span>
                        <span className="text-xs text-muted-foreground w-16 text-right">{course.expectedIn}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Award className="h-10 w-10 mb-2 opacity-20 text-green-500" />
                    <p>Congratulations! No remaining courses.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.8);
        }
      `}</style>
    </motion.div>
  );
}
