import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building,
  GraduationCap,
  Loader2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Search,
  Clock,
  CalendarDays,
  Hash,
  Layers,
  BookMarked,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import apiService from "@/components/api/apiService";
import endPoints from "@/components/api/endPoints";

interface Department {
  dptID: number;
  deptName: string;
  totalCrHr: number | null;
  departmentCode: string;
  programModality: {
    modalityCode: string;
    modality: string;
    programLevel: {
      code: string;
      name: string;
      active: boolean;
    };
  };
  programLevel: {
    code: string;
    name: string;
    active: boolean;
  };
}

interface Prerequisite {
  id: number;
  name: string;
  ccode: string;
}

interface CourseCategory {
  id: number;
  name: string;
}

interface RawCourse {
  id: number;
  ccode: string;
  ctitle: string;
  theoryHrs: number;
  labHrs: number;
  isPassFail: boolean;
  courseCategory: CourseCategory;
  department: {
    id: number;
    name: string;
  };
  classYear: {
    id: number;
    name: string;
  };
  semester: {
    code: string;
    name: string;
  };
  prerequisites: Prerequisite[];
}

interface DisplayCourse {
  id: number;
  code: string;
  name: string;
  theoryHrs: number;
  labHrs: number;
  totalCrHrs: number;
  courseCategory: string;
  classYear: string;
  semester: string;
  prerequisites: Prerequisite[];
}

interface GroupedByYearAndSemester {
  [year: string]: {
    [semester: string]: DisplayCourse[];
  };
}

export default function DeanDepartmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<DisplayCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedSemesters, setExpandedSemesters] = useState<Set<string>>(
    new Set(),
  );

  // Define semester order
  const getSemesterOrder = (semester: string): number => {
    const semesterLower = semester.toLowerCase();
    if (semesterLower.includes("first") || semesterLower === "semester 1")
      return 1;
    if (semesterLower.includes("second") || semesterLower === "semester 2")
      return 2;
    if (semesterLower.includes("third") || semesterLower === "semester 3")
      return 3;
    if (semesterLower.includes("summer")) return 4;
    return 999;
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      setCourses([]);

      try {
        const params = { departmentId: id ? Number(id) : undefined };
        const res = await apiService.get(endPoints.allCourses, params);

        console.log("Raw response data:", res);
        let courseArray;
        if (Array.isArray(res)) {
          courseArray = res;
        } else if (res && Array.isArray(res.data)) {
          courseArray = res.data;
        } else if (res?.courses && Array.isArray(res.courses)) {
          courseArray = res.courses;
        } else {
          throw new Error("Response is not in expected array format");
        }

        const mappedCourses: DisplayCourse[] = courseArray.map(
          (raw: RawCourse) => ({
            id: raw.id,
            code: raw.ccode || "—",
            name: raw.ctitle || "Unnamed",
            theoryHrs: raw.theoryHrs || 0,
            labHrs: raw.labHrs || 0,
            totalCrHrs: (raw.theoryHrs || 0) + (raw.labHrs || 0),
            courseCategory: raw.courseCategory?.name || "Uncategorized",
            classYear: raw.classYear?.name || "N/A",
            semester: raw.semester?.name || "N/A",
            prerequisites: raw.prerequisites || [],
          }),
        );

        setCourses(mappedCourses);

        // Initially expand all years but not semesters
        const years = [
          ...new Set(mappedCourses.map((c) => `Year ${c.classYear}`)),
        ];
        setExpandedYears(new Set(years));
        setExpandedSemesters(new Set());
      } catch (err: any) {
        console.error("Courses fetch failed:", err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDepartmentDetails();
    }
  }, [id]);

  const fetchDepartmentDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const deptResponse = await apiService.get(
        endPoints.getDepartmentById(id!),
      );
      setDepartment(deptResponse);
    } catch (err: any) {
      console.error("Error fetching department details:", err);
      setError(err.response?.data?.error || "Department not found");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchDepartmentDetails();
  };

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleSemester = (semesterKey: string) => {
    const newExpanded = new Set(expandedSemesters);
    if (newExpanded.has(semesterKey)) {
      newExpanded.delete(semesterKey);
    } else {
      newExpanded.add(semesterKey);
    }
    setExpandedSemesters(newExpanded);
  };

  const expandAll = () => {
    setExpandedYears(new Set(sortedYears));
    // Expand all semesters
    const allSemesterKeys: string[] = [];
    sortedYears.forEach((year) => {
      const semesters = getSortedSemesters(year);
      semesters.forEach((semester) => {
        allSemesterKeys.push(`${year}-${semester}`);
      });
    });
    setExpandedSemesters(new Set(allSemesterKeys));
  };

  const collapseAll = () => {
    setExpandedYears(new Set());
    setExpandedSemesters(new Set());
  };

  // Filter courses based on search
  const getFilteredCourses = (courseList: DisplayCourse[]) => {
    return courseList.filter((course) => {
      const matchesSearch =
        searchTerm === "" ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.classYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseCategory
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        course.prerequisites.some(
          (pre) =>
            pre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pre.ccode.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      return matchesSearch;
    });
  };

  // Group courses by classYear and then by semester
  const groupedCourses = courses.reduce((groups, course) => {
    const year = `Year ${course.classYear}`;
    const semester = course.semester;

    if (!groups[year]) groups[year] = {};
    if (!groups[year][semester]) groups[year][semester] = [];

    groups[year][semester].push(course);
    return groups;
  }, {} as GroupedByYearAndSemester);

  // Sort years
  const sortedYears = Object.keys(groupedCourses).sort((a, b) => {
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;

    // Extract year number
    const yearNumA = parseInt(a.replace("Year ", "")) || 999;
    const yearNumB = parseInt(b.replace("Year ", "")) || 999;
    return yearNumA - yearNumB;
  });

  // Sort semesters within each year
  const getSortedSemesters = (year: string): string[] => {
    const semesters = Object.keys(groupedCourses[year]);
    return semesters.sort((a, b) => {
      if (a === "Uncategorized") return 1;
      if (b === "Uncategorized") return -1;

      const orderA = getSemesterOrder(a);
      const orderB = getSemesterOrder(b);
      if (orderA !== orderB) return orderA - orderB;
      return a.localeCompare(b);
    });
  };

  // Calculate total filtered courses count
  const getFilteredGroupedCourses = () => {
    const filtered: GroupedByYearAndSemester = {};
    let totalCount = 0;

    sortedYears.forEach((year) => {
      const semesters = getSortedSemesters(year);
      semesters.forEach((semester) => {
        const semesterCourses = groupedCourses[year][semester];
        const filteredCourses = getFilteredCourses(semesterCourses);
        if (filteredCourses.length > 0) {
          if (!filtered[year]) filtered[year] = {};
          filtered[year][semester] = filteredCourses;
          totalCount += filteredCourses.length;
        }
      });
    });

    return { filteredGroups: filtered, totalCount };
  };

  const { filteredGroups, totalCount } = getFilteredGroupedCourses();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-6 p-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 rounded-full shadow-inner"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </motion.div>
          </div>
          <div className="text-center space-y-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Deutsche Medizin College
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-blue-600 rounded-full mx-auto"
            />
            <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse tracking-wide uppercase text-xs mt-4">
              Loading Department Details...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !department) {
    return (
      <div className="p-10 space-y-10">
        <div>
          <Button
            className="bg-blue-600 text-white"
            onClick={() => navigate(-1)}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Button>
        </div>
        <div className="bg-red-500 p-8 rounded-2xl shadow-lg text-white">
          <h1 className="text-4xl font-bold">Error</h1>
          <p className="mt-2 text-lg">{error || "Department not found"}</p>
          <Button
            className="mt-4 bg-white text-red-600 hover:bg-gray-100"
            onClick={handleRetry}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-10">
      {/* Go Back Button */}
      <div>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => navigate(-1)}
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Departments
        </Button>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Building className="h-8 w-8" />
          <h1 className="text-3xl font-bold">{department.deptName}</h1>
        </div>
        <p className="text-blue-100">
          Department Code: {department.departmentCode}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm opacity-80">Program Level</p>
            <p className="text-lg font-semibold">
              {department.programLevel?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-80">Modality</p>
            <p className="text-lg font-semibold">
              {department.programModality?.modality || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-80">Total Credits</p>
            <p className="text-lg font-semibold">
              {department.totalCrHr !== null ? department.totalCrHr : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by code, title, year, semester, category, or prerequisites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <CardDescription>
              {totalCount} course{totalCount !== 1 ? "s" : ""} shown
            </CardDescription>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={expandAll}
                className="text-sm"
              >
                <ChevronDown className="h-4 w-4 mr-1" />
                Expand All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={collapseAll}
                className="text-sm"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                Collapse All
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Courses Section with Nested Structure */}
      {loadingCourses ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-500 animate-pulse">
            Fetching courses...
          </p>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            No Course Data Available
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Course information for this department is not available.
          </p>
        </div>
      ) : totalCount === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            No courses match your search criteria
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedYears.map((year) => {
            if (
              !filteredGroups[year] ||
              Object.keys(filteredGroups[year]).length === 0
            )
              return null;

            const semesters = getSortedSemesters(year);
            const isYearExpanded = expandedYears.has(year);

            // Calculate totals for this year from filtered courses
            let totalYearCourses = 0;
            let totalYearCredits = 0;
            semesters.forEach((semester) => {
              const semesterCourses = filteredGroups[year]?.[semester] || [];
              totalYearCourses += semesterCourses.length;
              totalYearCredits += semesterCourses.reduce(
                (sum, c) => sum + c.totalCrHrs,
                0,
              );
            });

            return (
              <Card key={year} className="overflow-hidden">
                <div
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleYear(year)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleYear(year);
                          }}
                        >
                          {isYearExpanded ? (
                            <ChevronDown className="h-5 w-5" />
                          ) : (
                            <ChevronRight className="h-5 w-5" />
                          )}
                        </Button>
                        <div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-xl">{year}</CardTitle>
                          </div>
                          <CardDescription className="mt-1">
                            {totalYearCourses} course
                            {totalYearCourses !== 1 ? "s" : ""} • Total{" "}
                            {totalYearCredits} Credit Hours
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-sm">
                          {totalYearCourses}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </div>

                {isYearExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-3 ml-6">
                      {semesters.map((semester) => {
                        const semesterCourses =
                          filteredGroups[year]?.[semester];
                        if (!semesterCourses || semesterCourses.length === 0)
                          return null;

                        const semesterKey = `${year}-${semester}`;
                        const isSemesterExpanded =
                          expandedSemesters.has(semesterKey);
                        const totalSemesterCredits = semesterCourses.reduce(
                          (sum, c) => sum + c.totalCrHrs,
                          0,
                        );

                        return (
                          <div
                            key={semester}
                            className="border rounded-lg overflow-hidden"
                          >
                            <div
                              className="cursor-pointer hover:bg-muted/30 transition-colors bg-muted/10"
                              onClick={() => toggleSemester(semesterKey)}
                            >
                              <div className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSemester(semesterKey);
                                    }}
                                  >
                                    {isSemesterExpanded ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-green-600" />
                                    <span className="font-semibold">
                                      {semester}
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs ml-2"
                                    >
                                      {semesterCourses.length} courses
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {totalSemesterCredits} credits
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {isSemesterExpanded && (
                              <div className="p-3 pt-0">
                                <div className="rounded-md border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-[120px]">
                                          Course Code
                                        </TableHead>
                                        <TableHead>Course Title</TableHead>
                                        <TableHead className="w-[100px] text-center">
                                          Theory Hrs
                                        </TableHead>
                                        <TableHead className="w-[100px] text-center">
                                          Lab Hrs
                                        </TableHead>
                                        <TableHead className="w-[100px] text-center">
                                          Total Credits
                                        </TableHead>
                                        <TableHead className="w-[150px]">
                                          Course Category
                                        </TableHead>
                                        <TableHead>Prerequisites</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {semesterCourses.map((course) => (
                                        <TableRow key={course.id}>
                                          <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                              <Hash className="h-4 w-4 text-muted-foreground" />
                                              {course.code}
                                            </div>
                                          </TableCell>
                                          <TableCell>{course.name}</TableCell>
                                          <TableCell className="text-center">
                                            <Badge
                                              variant="secondary"
                                              className="w-fit mx-auto"
                                            >
                                              <BookOpen className="h-3.5 w-3.5 mr-1" />
                                              {course.theoryHrs}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-center">
                                            <Badge
                                              variant="secondary"
                                              className="w-fit mx-auto"
                                            >
                                              <Layers className="h-3.5 w-3.5 mr-1" />
                                              {course.labHrs}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-center">
                                            <Badge
                                              variant="default"
                                              className="w-fit mx-auto bg-blue-600"
                                            >
                                              <Clock className="h-3.5 w-3.5 mr-1" />
                                              {course.totalCrHrs}
                                            </Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge
                                              variant="outline"
                                              className="w-fit"
                                            >
                                              <BookMarked className="h-3.5 w-3.5 mr-1" />
                                              {course.courseCategory}
                                            </Badge>
                                          </TableCell>
                                          <TableCell>
                                            {course.prerequisites.length > 0 ? (
                                              <div className="flex flex-wrap gap-1">
                                                {course.prerequisites.map(
                                                  (pre) => (
                                                    <Badge
                                                      key={pre.id}
                                                      variant="outline"
                                                      className="text-xs"
                                                    >
                                                      {pre.ccode} - {pre.name}
                                                    </Badge>
                                                  ),
                                                )}
                                              </div>
                                            ) : (
                                              <span className="text-sm text-muted-foreground">
                                                None
                                              </span>
                                            )}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Department Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            Department Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Department ID:
              </span>
              <span className="font-medium">{department.dptID}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Department Code:
              </span>
              <span className="font-medium">{department.departmentCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Program Level:
              </span>
              <span className="font-medium">
                {department.programLevel?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Program Level Code:
              </span>
              <span className="font-medium">
                {department.programLevel?.code}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            Program Modality
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Modality:
              </span>
              <span className="font-medium">
                {department.programModality?.modality}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Modality Code:
              </span>
              <span className="font-medium">
                {department.programModality?.modalityCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Total Credit Hours:
              </span>
              <span className="font-medium">
                {department.totalCrHr !== null
                  ? department.totalCrHr
                  : "Not Specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Program Active:
              </span>
              <span
                className={`font-medium ${
                  department.programLevel?.active
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {department.programLevel?.active ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
