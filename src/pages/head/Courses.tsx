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
  BookOpen,
  Search,
  Clock,
  CalendarDays,
  Users,
  Hash,
  ChevronDown,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import endPoints from "@/components/api/endPoints";
import apiService from "@/components/api/apiService";

interface Course {
  id: number;
  code: string;
  title: string;
  totalCrHrs: number;
  classYearName: string;
  semesterName: string;
}

interface GroupedCourses {
  [key: string]: Course[];
}

export default function Courses() {
  const { t } = useTranslation(["departmentHead", "common"]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  // Define the order for class years
  const yearOrder: { [key: string]: number } = {
    "Pre-Medicine": 1,
    "Pre Medicine": 1,
    "Pre-medicine": 1,
    "Pre clinical year 1": 2,
    "PC1": 2,
    "Pre clinical year 2": 3,
    "PC2": 3,
    "Clinical year 1": 4,
    "C1": 4,
    "Clinical year 2": 5,
    "C2": 5,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
  };

  // Map classYearName to display name
  const getDisplayName = (year: string): string => {
    const yearLower = year.toLowerCase();
    if (yearLower === "pre-medicine" || yearLower === "pre medicine" || yearLower === "1") {
      return "Year 1 (Pre-Medicine)";
    }
    if (yearLower === "pc1" || yearLower === "pre clinical year 1" || yearLower === "2") {
      return "Year 2 (PC1)";
    }
    if (yearLower === "pc2" || yearLower === "pre clinical year 2" || yearLower === "3") {
      return "Year 3 (PC2)";
    }
    if (yearLower === "c1" || yearLower === "clinical year 1" || yearLower === "4") {
      return "Year 4 (C1)";
    }
    if (yearLower === "c2" || yearLower === "clinical year 2" || yearLower === "5") {
      return "Year 5 (C2)";
    }
    return year;
  };

  // Get sort order for a year
  const getYearOrder = (year: string): number => {
    const yearLower = year.toLowerCase();
    if (yearOrder[year]) return yearOrder[year];
    if (yearOrder[yearLower]) return yearOrder[yearLower];
    return 999; // Put unknown years at the end
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await apiService.get<Course[]>(
          endPoints.myDepartmentCourses
        );
        setCourses(response);
        setFilteredCourses(response);
        
        // Initially expand all sections
        const years = [...new Set(response.map(c => c.classYearName || "Uncategorized"))];
        setExpandedYears(new Set(years));
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
        (course.classYearName && course.classYearName.toLowerCase().includes(lowerSearch)) ||
        course.semesterName.toLowerCase().includes(lowerSearch)
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  // Group courses by classYearName
  const groupedCourses = filteredCourses.reduce((groups, course) => {
    const year = course.classYearName || "Uncategorized";
    if (!groups[year]) groups[year] = [];
    groups[year].push(course);
    return groups;
  }, {} as GroupedCourses);

  // Sort years based on custom order
  const sortedYears = Object.keys(groupedCourses).sort((a, b) => {
    // Handle Uncategorized
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    
    const orderA = getYearOrder(a);
    const orderB = getYearOrder(b);
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b);
  });

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const expandAll = () => {
    setExpandedYears(new Set(sortedYears));
  };

  const collapseAll = () => {
    setExpandedYears(new Set());
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
              placeholder="Search by code, title, year, or semester..."
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

      {/* Grouped Course Sections with Collapsible */}
      <div className="space-y-4">
        {sortedYears.map((year) => {
          const yearCourses = groupedCourses[year];
          const isExpanded = expandedYears.has(year);
          const displayName = getDisplayName(year);
          const totalCredits = yearCourses.reduce((sum, c) => sum + c.totalCrHrs, 0);

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
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </Button>
                      <div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-xl">
                            {displayName}
                          </CardTitle>
                          {year === "Uncategorized" && (
                            <Badge variant="outline" className="ml-2">
                              Unclassified
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="mt-1">
                          {yearCourses.length} course
                          {yearCourses.length !== 1 ? "s" : ""} • Total {totalCredits} Credit Hours
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm">
                        {yearCourses.length}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </div>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {yearCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-lg">
                                  {course.code}
                                </CardTitle>
                              </div>
                              <CardDescription className="text-base font-medium">
                                {course.title}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Clock className="h-3.5 w-3.5" />
                              {course.totalCrHrs} CrHrs
                            </Badge>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <CalendarDays className="h-3.5 w-3.5" />
                              {course.semesterName}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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