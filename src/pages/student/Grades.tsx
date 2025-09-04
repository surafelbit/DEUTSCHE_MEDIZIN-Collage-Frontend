import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Download,
  TrendingUp,
  Calendar,
  Award,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";
export default function StudentGrades() {
  const currentSemester = {
    name: "Spring 2024",
    gpa: 1.4,
    credits: 18,
    courses: [
      {
        name: "Human Anatomy",
        code: "MED101",
        credits: 4,
        grade: "A-",
        points: 1.3,
        professor: "Dr. Mueller",
      },
      {
        name: "Physiology",
        code: "MED102",
        credits: 3,
        grade: "B+",
        points: 1.7,
        professor: "Dr. Schmidt",
      },
      {
        name: "Biochemistry",
        code: "MED103",
        credits: 3,
        grade: "A",
        points: 1.0,
        professor: "Dr. Weber",
      },
      {
        name: "Medical Ethics",
        code: "MED104",
        credits: 2,
        grade: "A",
        points: 1.0,
        professor: "Dr. Fischer",
      },
      {
        name: "German Medical Terminology",
        code: "MED105",
        credits: 2,
        grade: "B",
        points: 2.0,
        professor: "Dr. Hoffmann",
      },
      {
        name: "Research Methods",
        code: "MED106",
        credits: 4,
        grade: "A-",
        points: 1.3,
        professor: "Dr. Wagner",
      },
    ],
  };

  const previousSemesters = [
    {
      name: "Fall 2023",
      gpa: 1.3,
      credits: 15,
      courses: [
        {
          name: "General Chemistry",
          code: "CHEM101",
          credits: 4,
          grade: "A",
          points: 1.0,
        },
        {
          name: "Biology Fundamentals",
          code: "BIO101",
          credits: 3,
          grade: "A-",
          points: 1.3,
        },
        {
          name: "Physics for Medicine",
          code: "PHYS101",
          credits: 3,
          grade: "B+",
          points: 1.7,
        },
        {
          name: "Mathematics",
          code: "MATH101",
          credits: 3,
          grade: "A",
          points: 1.0,
        },
        {
          name: "Introduction to Medicine",
          code: "MED100",
          credits: 2,
          grade: "A",
          points: 1.0,
        },
      ],
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "default";
    if (grade.startsWith("B")) return "secondary";
    if (grade.startsWith("C")) return "outline";
    return "destructive";
  };

  const overallStats = {
    totalCredits: 33,
    overallGPA: 1.35,
    completionRate: 18.3, // out of 180 total credits
  };
  const [openYears, setOpenYears] = useState({});
  const [openSemesters, setOpenSemesters] = useState({});
  const [selectedGradingSystem, setSelectedGradingSystem] = useState("system1");
  const initialResult = [
    {
      year: 1,
      semseters: [
        {
          id: "1",
          courses: [
            {
              name: "Mathematics",
              result: 95,
              grade: "A",
              credit: 4,
              courseId: "MATH101",
            },
            {
              name: "Physics",
              result: 88,
              grade: "B",
              credit: 3,
              courseId: "PHYS101",
            },
            {
              name: "Chemistry",
              result: 78,
              grade: "C",
              credit: 3,
              courseId: "CHEM101",
            },
            {
              name: "English",
              result: 62,
              grade: "D",
              credit: 2,
              courseId: "ENG101",
            },
          ],
        },
        {
          id: "2",
          courses: [
            {
              name: "Advanced Mathematics",
              result: 92,
              grade: "A",
              credit: 4,
              courseId: "MATH102",
            },
            {
              name: "Mechanics",
              result: 85,
              grade: "B",
              credit: 4,
              courseId: "PHYS102",
            },
            {
              name: "Organic Chemistry",
              result: 70,
              grade: "C",
              credit: 3,
              courseId: "CHEM102",
            },
          ],
        },
        {
          id: "3",
          courses: [
            {
              name: "Statistics",
              result: 99,
              grade: "A",
              credit: 3,
              courseId: "STAT101",
            },
            {
              name: "Electronics",
              result: 82,
              grade: "B",
              credit: 4,
              courseId: "PHYS103",
            },
            {
              name: "Literature",
              result: 55,
              grade: "F",
              credit: 2,
              courseId: "ENG102",
            },
          ],
        },
      ],
    },
    {
      year: 2,
      semseters: [
        {
          id: "1",
          courses: [
            {
              name: "Calculus",
              result: 90,
              grade: "A",
              credit: 4,
              courseId: "MATH201",
            },
            {
              name: "Quantum Physics",
              result: 84,
              grade: "B",
              credit: 4,
              courseId: "PHYS201",
            },
            {
              name: "Inorganic Chemistry",
              result: 75,
              grade: "C",
              credit: 3,
              courseId: "CHEM201",
            },
          ],
        },
        {
          id: "2",
          courses: [
            {
              name: "Linear Algebra",
              result: 87,
              grade: "B",
              credit: 4,
              courseId: "MATH202",
            },
            {
              name: "Thermodynamics",
              result: 80,
              grade: "B",
              credit: 3,
              courseId: "PHYS202",
            },
            {
              name: "Writing Composition",
              result: 68,
              grade: "D",
              credit: 2,
              courseId: "ENG201",
            },
          ],
        },
      ],
    },
    {
      year: 3,
      semseters: [
        {
          id: "1",
          courses: [
            {
              name: "Differential Equations",
              result: 100,
              grade: "A",
              credit: 5,
              courseId: "MATH301",
            },
            {
              name: "Electromagnetism",
              result: 83,
              grade: "B",
              credit: 4,
              courseId: "PHYS301",
            },
            {
              name: "Biochemistry",
              result: 72,
              grade: "C",
              credit: 3,
              courseId: "CHEM301",
            },
            {
              name: "Technical Writing",
              result: 60,
              grade: "D",
              credit: 2,
              courseId: "ENG301",
            },
          ],
        },
        {
          id: "2",
          courses: [
            {
              name: "Probability",
              result: 97,
              grade: "A",
              credit: 4,
              courseId: "MATH302",
            },
            {
              name: "Optics",
              result: 79,
              grade: "C",
              credit: 3,
              courseId: "PHYS302",
            },
            {
              name: "Analytical Chemistry",
              result: 65,
              grade: "D",
              credit: 3,
              courseId: "CHEM302",
            },
          ],
        },
      ],
    },
  ];
  const [displayedResult, setDisplayedResult] = useState(initialResult);

  const gradingSystems = {
    system1: (score) => {
      if (score >= 90) return "A";
      if (score >= 80) return "B";
      if (score >= 70) return "C";
      if (score >= 60) return "D";
      return "F";
    },
    system2: (score) => {
      if (score >= 90) return "A";
      if (score >= 85) return "A-";
      if (score >= 80) return "B+";
      if (score >= 75) return "B";
      if (score >= 70) return "B-";
      if (score >= 65) return "C";
      return "F";
    },
    system3: (score) => {
      if (score >= 85) return "A";
      if (score >= 75) return "B";
      if (score >= 65) return "C";
      if (score >= 60) return "D";
      return "F";
    },
  };

  useEffect(() => {
    const updatedResult = initialResult.map((year) => ({
      ...year,
      semseters: year.semseters.map((semester) => ({
        ...semester,
        courses: semester.courses.map((course) => ({
          ...course,
          grade: gradingSystems[selectedGradingSystem](course.result),
        })),
      })),
    }));
    setDisplayedResult(updatedResult);
  }, [selectedGradingSystem]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Academic Grades</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Transcript
        </Button>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.overallGPA}</div>
            <p className="text-xs text-muted-foreground">
              German grading system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallStats.totalCredits}
            </div>
            <p className="text-xs text-muted-foreground">Out of 180 required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallStats.completionRate}%
            </div>
            <Progress value={overallStats.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Academic Standing
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Excellent</div>
            <p className="text-xs text-muted-foreground">
              Dean's List eligible
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-blue-600 dark:text-gray-100">
            Student's Academic Results
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Academic performance by year and semester
          </CardDescription>
        </CardHeader>
        <div className="flex flex-col sm:flex-row justify-center mb-6 gap-2 sm:gap-4 items-center">
          <label
            htmlFor="gradingSystem"
            className="flex items-center text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium"
          >
            Grading System:
          </label>
          <select
            id="gradingSystem"
            value={selectedGradingSystem}
            onChange={(e) => setSelectedGradingSystem(e.target.value)}
            className="w-full max-w-[180px] sm:max-w-[200px] px-3 py-1.5 border border-blue-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors duration-200 text-xs sm:text-sm"
          >
            <option value="system1">System 1</option>
            <option value="system2">System 2</option>
            <option value="system3">System 3</option>
          </select>
        </div>
        {displayedResult.map((ele, index) => (
          <div key={ele.year} className="mb-4">
            <button
              onClick={() =>
                setOpenYears((prev) => ({ ...prev, [index]: !prev[index] }))
              }
              className={`w-full px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-200 flex items-center justify-between border border-blue-300 dark:border-gray-600 ${
                openYears[index]
                  ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              <span className="flex items-center">
                {openYears[index] ? (
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                Year {ele.year}
              </span>
            </button>
            {openYears[index] && (
              <div className="mt-3 space-y-3 pl-0 sm:pl-4">
                {ele.semseters.map((semester, idx) => (
                  <div key={`${index}-${idx}`} className="mb-3">
                    <button
                      onClick={() =>
                        setOpenSemesters((prev) => ({
                          ...prev,
                          [`${index}-${idx}`]: !prev[`${index}-${idx}`],
                        }))
                      }
                      className={`w-full px-3 py-1.5 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-200 flex items-center border border-blue-300 dark:border-gray-600 ${
                        openSemesters[`${index}-${idx}`]
                          ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      <span className="flex items-center">
                        {openSemesters[`${index}-${idx}`] ? (
                          <svg
                            className="w-3 h-3 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3 h-3 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                        Semester {semester.id}
                      </span>
                    </button>
                    {openSemesters[`${index}-${idx}`] && (
                      <Card className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 mt-2">
                        <CardHeader>
                          <CardTitle className="flex items-center text-sm sm:text-base text-blue-600 dark:text-gray-100">
                            <BookOpen className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                            {semester.name}
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            GPA: {semester.gpa} | Credits: {semester.credit}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-blue-200 dark:border-gray-700">
                                  <th className="text-left py-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Course
                                  </th>
                                  <th className="text-left py-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Code
                                  </th>
                                  <th className="text-center py-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Credits
                                  </th>
                                  <th className="text-center py-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Grade
                                  </th>
                                  <th className="text-center py-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Points
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {semester.courses.map((course, courseIdx) => (
                                  <tr
                                    key={courseIdx}
                                    className="border-b border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700"
                                  >
                                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-normal break-words">
                                      {course.name}
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-normal break-words">
                                      {course.courseId}
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-center text-gray-900 dark:text-gray-100">
                                      {course.credit}
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-center">
                                      <Badge
                                        className={getGradeColor(course.grade)}
                                      >
                                        {course.grade}
                                      </Badge>
                                    </td>
                                    <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm text-center font-mono text-gray-900 dark:text-gray-100">
                                      {course.result.toFixed(1)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
