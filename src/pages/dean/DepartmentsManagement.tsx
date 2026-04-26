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
  Building,
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
  department?: {
    dptID: number;
    deptName: string;
    departmentCode: string;
  };
}

interface GroupedByDepartmentAndSemester {
  [department: string]: {
    [semester: string]: Course[];
  };
}

export default function DeanCourses() {
  const { t } = useTranslation(["dean", "common"]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(
    new Set(),
  );
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
          endPoints.allCourses, // You'll need to add this endpoint
        );
        setCourses(response);
        setFilteredCourses(response);

        // Initially expand all departments but not semesters
        const departments = [
          ...new Set(
            response.map((c) => c.department?.deptName || "Uncategorized"),
          ),
        ];
        setExpandedDepartments(new Set(departments));
        setExpandedSemesters(new Set());
      } catch (error) {
        console.error("Error loading university courses:", error);
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
        (course.department?.deptName &&
          course.department.deptName.toLowerCase().includes(lowerSearch)) ||
        course.teachers.some(
          (teacher) =>
            teacher.name.toLowerCase().includes(lowerSearch) ||
            teacher.bcysName.toLowerCase().includes(lowerSearch),
        ),
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  // Group courses by department and then by semester
  const groupedCourses = filteredCourses.reduce((groups, course) => {
    const department = course.department?.deptName || "Uncategorized";
    const semester = course.semesterName || "Uncategorized";

    if (!groups[department]) groups[department] = {};
    if (!groups[department][semester]) groups[department][semester] = [];

    groups[department][semester].push(course);
    return groups;
  }, {} as GroupedByDepartmentAndSemester);

  // Sort departments alphabetically
  const sortedDepartments = Object.keys(groupedCourses).sort((a, b) => {
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });

  // Sort semesters within each department
  const getSortedSemesters = (department: string): string[] => {
    const semesters = Object.keys(groupedCourses[department]);
    return semesters.sort((a, b) => {
      if (a === "Uncategorized") return 1;
      if (b === "Uncategorized") return -1;

      const orderA = getSemesterOrder(a);
      const orderB = getSemesterOrder(b);
      if (orderA !== orderB) return orderA - orderB;
      return a.localeCompare(b);
    });
  };

  const toggleDepartment = (department: string) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(department)) {
      newExpanded.delete(department);
    } else {
      newExpanded.add(department);
    }
    setExpandedDepartments(newExpanded);
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
    setExpandedDepartments(new Set(sortedDepartments));
    // Optionally expand all semesters too
    const allSemesterKeys: string[] = [];
    sortedDepartments.forEach((department) => {
      const semesters = getSortedSemesters(department);
      semesters.forEach((semester) => {
        allSemesterKeys.push(`${department}-${semester}`);
      });
    });
    setExpandedSemesters(new Set(allSemesterKeys));
  };

  const collapseAll = () => {
    setExpandedDepartments(new Set());
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
          No courses found in the university
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <BookOpen className="h-8 w-8" />
          University Courses Overview
        </h1>
        <p className="text-purple-100">
          All {courses.length} courses across all departments
        </p>
      </div>

      {/* Search and Controls */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by code, title, department, year, semester, or teacher..."
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

      {/* Grouped Course Sections by Department with Nested Semesters */}
      <div className="space-y-4">
        {sortedDepartments.map((department) => {
          const semesters = getSortedSemesters(department);
          const isDepartmentExpanded = expandedDepartments.has(department);
          const totalDepartmentCredits = semesters.reduce((sum, semester) => {
            const semesterCourses = groupedCourses[department][semester];
            return sum + semesterCourses.reduce((s, c) => s + c.totalCrHrs, 0);
          }, 0);
          const totalDepartmentCourses = semesters.reduce((sum, semester) => {
            return sum + groupedCourses[department][semester].length;
          }, 0);

          return (
            <Card key={department} className="overflow-hidden">
              <div
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleDepartment(department)}
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
                          toggleDepartment(department);
                        }}
                      >
                        {isDepartmentExpanded ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </Button>
                      <div>
                        <div className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-purple-600" />
                          <CardTitle className="text-xl">
                            {department}
                          </CardTitle>
                          {department === "Uncategorized" && (
                            <Badge variant="outline" className="ml-2">
                              Unclassified
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="mt-1">
                          {totalDepartmentCourses} course
                          {totalDepartmentCourses !== 1 ? "s" : ""} • Total{" "}
                          {totalDepartmentCredits} Credit Hours
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm">
                        {totalDepartmentCourses}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </div>

              {isDepartmentExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-3 ml-6">
                    {semesters.map((semester) => {
                      const semesterCourses =
                        groupedCourses[department][semester];
                      const semesterKey = `${department}-${semester}`;
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
                                      <TableHead className="w-[100px]">
                                        Year
                                      </TableHead>
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
                                        <TableCell>
                                          <Badge variant="outline">
                                            Year {course.classYearName}
                                          </Badge>
                                        </TableCell>
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
