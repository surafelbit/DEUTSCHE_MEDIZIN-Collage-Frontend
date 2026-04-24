"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  Search,
  Clock,
  CalendarDays,
  Hash,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  User,
  Users as UsersIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import endPoints from "@/components/api/endPoints";
import apiService from "@/components/api/apiService";

interface Teacher {
  name: string;
  bcysName: string;
}

interface Course {
  id: number;
  code: string;
  title: string;
  totalCrHrs: number;
  classYearName: string;
  semesterName: string;
  teachers: Teacher[];
}

interface GroupedByYearAndSemester {
  [year: string]: {
    [semester: string]: Course[];
  };
}

export default function Courses() {
  const { t } = useTranslation(["departmentHead", "common"]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedSemesters, setExpandedSemesters] = useState<Set<string>>(
    new Set(),
  );

  // Define semester order
  const semesterOrder: { [key: string]: number } = {
    "First Semester": 1,
    "Semester 1": 1,
    Fall: 1,
    "Fall Semester": 1,
    "1": 1,
    "Second Semester": 2,
    "Semester 2": 2,
    Spring: 2,
    "Spring Semester": 2,
    "2": 2,
    "Third Semester": 3,
    "Semester 3": 3,
    Summer: 3,
    "Summer Semester": 3,
    "3": 3,
  };

  // Get sort order for a semester
  const getSemesterOrder = (semester: string): number => {
    const semesterLower = semester.toLowerCase();
    if (semesterOrder[semester]) return semesterOrder[semester];
    if (semesterOrder[semesterLower]) return semesterOrder[semesterLower];
    return 999;
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await apiService.get<Course[]>(
          endPoints.myDepartmentCourses,
        );
        setCourses(response);
        setFilteredCourses(response);

        // Initially expand all years but not semesters
        const years = [
          ...new Set(response.map((c) => c.classYearName || "Uncategorized")),
        ];
        setExpandedYears(new Set(years));
        setExpandedSemesters(new Set());
      } catch (error) {
        console.error("Error loading department courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        course.code.toLowerCase().includes(lowerSearch) ||
        course.title.toLowerCase().includes(lowerSearch) ||
        (course.classYearName &&
          course.classYearName.toLowerCase().includes(lowerSearch)) ||
        course.semesterName.toLowerCase().includes(lowerSearch) ||
        course.teachers.some(
          (teacher) =>
            teacher.name.toLowerCase().includes(lowerSearch) ||
            teacher.bcysName.toLowerCase().includes(lowerSearch),
        ),
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  // Group courses by classYearName and then by semesterName
  const groupedCourses = filteredCourses.reduce((groups, course) => {
    const year = course.classYearName || "Uncategorized";
    const semester = course.semesterName || "Uncategorized";

    if (!groups[year]) groups[year] = {};
    if (!groups[year][semester]) groups[year][semester] = [];

    groups[year][semester].push(course);
    return groups;
  }, {} as GroupedByYearAndSemester);

  // Sort years (display as is from backend)
  const sortedYears = Object.keys(groupedCourses).sort((a, b) => {
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;

    // Try to sort numerically if they're numbers
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.localeCompare(b);
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
    // Optionally expand all semesters too
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">{t("common:loading") || "Loading..."}</div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <BookOpen className="h-16 w-16 text-muted-foreground" />
        <div className="text-lg text-muted-foreground">
          No courses found in your department
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <BookOpen className="h-8 w-8" />
          My Department Courses
        </h1>
        <p className="text-blue-100">
          All {courses.length} courses offered by your department
        </p>
      </div>

      {/* Search and Controls */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by code, title, year, semester, or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <CardDescription>
              {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""} shown
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

      {/* Grouped Course Sections with Nested Dropdowns */}
      <div className="space-y-4">
        {sortedYears.map((year) => {
          const semesters = getSortedSemesters(year);
          const isYearExpanded = expandedYears.has(year);
          const totalYearCredits = semesters.reduce((sum, semester) => {
            const semesterCourses = groupedCourses[year][semester];
            return sum + semesterCourses.reduce((s, c) => s + c.totalCrHrs, 0);
          }, 0);
          const totalYearCourses = semesters.reduce((sum, semester) => {
            return sum + groupedCourses[year][semester].length;
          }, 0);

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
                          <CardTitle className="text-xl">Year {year}</CardTitle>
                          {year === "Uncategorized" && (
                            <Badge variant="outline" className="ml-2">
                              Unclassified
                            </Badge>
                          )}
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
                      const semesterCourses = groupedCourses[year][semester];
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
                                  <Badge variant="outline" className="text-xs">
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
                                        Credit Hours
                                      </TableHead>
                                      <TableHead>Teachers</TableHead>
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
                                        <TableCell>{course.title}</TableCell>
                                        <TableCell className="text-center">
                                          <Badge
                                            variant="secondary"
                                            className="flex items-center gap-1 w-fit mx-auto"
                                          >
                                            <Clock className="h-3.5 w-3.5" />
                                            {course.totalCrHrs}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          {course.teachers &&
                                          course.teachers.length > 0 ? (
                                            <div className="space-y-2">
                                              {course.teachers.map(
                                                (teacher, idx) => (
                                                  <div
                                                    key={idx}
                                                    className="flex flex-col gap-1"
                                                  >
                                                    <div className="flex items-center gap-2">
                                                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                                                      <span className="text-sm font-medium">
                                                        {teacher.name}
                                                      </span>
                                                    </div>
                                                    <Badge
                                                      variant="outline"
                                                      className="text-xs w-fit"
                                                    >
                                                      <UsersIcon className="h-3 w-3 mr-1" />
                                                      {teacher.bcysName}
                                                    </Badge>
                                                  </div>
                                                ),
                                              )}
                                            </div>
                                          ) : (
                                            <span className="text-sm text-muted-foreground">
                                              No teacher assigned
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

      {filteredCourses.length === 0 && searchTerm && (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            No courses match your search criteria
          </CardContent>
        </Card>
      )}
    </div>
  );
}
