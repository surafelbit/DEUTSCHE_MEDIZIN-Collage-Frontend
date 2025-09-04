// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Progress } from "@/components/ui/progress"
// import { FileText, Plus, Calendar, Users, Download, Search, Filter, MoreHorizontal } from "lucide-react"
// import { useParams } from "react-router-dom"

// export default function TeacherAssessments() {
//   const { courseId } = useParams()

//   const assessments = [
//     {
//       id: "1",
//       title: "Skeletal System Quiz",
//       type: "quiz",
//       course: "Human Anatomy",
//       courseCode: "MED101",
//       dueDate: "2024-01-20",
//       createdDate: "2024-01-10",
//       totalPoints: 50,
//       submissions: { submitted: 42, total: 45 },
//       graded: { graded: 35, total: 42 },
//       averageScore: 42.5,
//       status: "active",
//       description: "Assessment covering bones, joints, and skeletal system anatomy",
//     },
//     {
//       id: "2",
//       title: "Cardiovascular Lab Report",
//       type: "assignment",
//       course: "Physiology",
//       courseCode: "MED102",
//       dueDate: "2024-01-18",
//       createdDate: "2024-01-05",
//       totalPoints: 100,
//       submissions: { submitted: 35, total: 38 },
//       graded: { graded: 30, total: 35 },
//       averageScore: 78.2,
//       status: "grading",
//       description: "Comprehensive lab report on cardiovascular system experiments",
//     },
//     {
//       id: "3",
//       title: "Case Study Analysis",
//       type: "assignment",
//       course: "Medical Ethics",
//       courseCode: "MED104",
//       dueDate: "2024-01-22",
//       createdDate: "2024-01-12",
//       totalPoints: 75,
//       submissions: { submitted: 48, total: 52 },
//       graded: { graded: 20, total: 48 },
//       averageScore: 65.8,
//       status: "active",
//       description: "Ethical analysis of medical case studies and decision-making scenarios",
//     },
//     {
//       id: "4",
//       title: "Midterm Examination",
//       type: "exam",
//       course: "Human Anatomy",
//       courseCode: "MED101",
//       dueDate: "2024-01-25",
//       createdDate: "2024-01-15",
//       totalPoints: 200,
//       submissions: { submitted: 0, total: 45 },
//       graded: { graded: 0, total: 0 },
//       averageScore: 0,
//       status: "upcoming",
//       description: "Comprehensive midterm covering all anatomy topics from first half of semester",
//     },
//     {
//       id: "5",
//       title: "Muscle System Quiz",
//       type: "quiz",
//       course: "Human Anatomy",
//       courseCode: "MED101",
//       dueDate: "2024-01-15",
//       createdDate: "2024-01-08",
//       totalPoints: 40,
//       submissions: { submitted: 45, total: 45 },
//       graded: { graded: 45, total: 45 },
//       averageScore: 35.2,
//       status: "completed",
//       description: "Quiz on muscular system anatomy and physiology",
//     },
//   ]

//   const courseInfo = {
//     name: courseId === "all" ? "All Courses" : "Human Anatomy",
//     code: courseId === "all" ? "" : "MED101",
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "default"
//       case "grading":
//         return "secondary"
//       case "completed":
//         return "outline"
//       case "upcoming":
//         return "destructive"
//       default:
//         return "outline"
//     }
//   }

//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case "quiz":
//         return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
//       case "assignment":
//         return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//       case "exam":
//         return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
//     }
//   }

//   const filteredAssessments = courseId === "all" ? assessments : assessments.filter((a) => a.courseCode === courseId)

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Assessments</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             {courseInfo.name} {courseInfo.code && `(${courseInfo.code})`}
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="outline">
//             <Download className="mr-2 h-4 w-4" />
//             Export Grades
//           </Button>
//           <Button>
//             <Plus className="mr-2 h-4 w-4" />
//             Create Assessment
//           </Button>
//         </div>
//       </div>

//       {/* Assessment Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{filteredAssessments.length}</div>
//             <p className="text-xs text-muted-foreground">This semester</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-orange-600">
//               {filteredAssessments.reduce((sum, a) => sum + (a.submissions.submitted - a.graded.graded), 0)}
//             </div>
//             <p className="text-xs text-muted-foreground">Need grading</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Average Score</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {Math.round(
//                 filteredAssessments
//                   .filter((a) => a.status === "completed")
//                   .reduce((sum, a) => sum + (a.averageScore / a.totalPoints) * 100, 0) /
//                   filteredAssessments.filter((a) => a.status === "completed").length,
//               ) || 0}
//               %
//             </div>
//             <p className="text-xs text-muted-foreground">Class average</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {filteredAssessments.filter((a) => a.status === "upcoming").length}
//             </div>
//             <p className="text-xs text-muted-foreground">Due soon</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search and Filter */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Assessment Management</CardTitle>
//           <CardDescription>Create, manage, and grade assessments</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-2 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input placeholder="Search assessments..." className="pl-8" />
//             </div>
//             <Button variant="outline">
//               <Filter className="mr-2 h-4 w-4" />
//               Filter
//             </Button>
//           </div>

//           {/* Assessment List */}
//           <div className="space-y-4">
//             {filteredAssessments.map((assessment) => (
//               <Card key={assessment.id} className="hover:shadow-md transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <h3 className="text-lg font-semibold">{assessment.title}</h3>
//                         <Badge className={getTypeColor(assessment.type)}>{assessment.type}</Badge>
//                         <Badge variant={getStatusColor(assessment.status)}>{assessment.status}</Badge>
//                       </div>

//                       <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                         {assessment.course} ({assessment.courseCode}) • {assessment.totalPoints} points
//                       </div>

//                       <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{assessment.description}</p>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                           <div className="text-sm font-medium mb-1">Submissions</div>
//                           <div className="flex items-center space-x-2">
//                             <Progress
//                               value={(assessment.submissions.submitted / assessment.submissions.total) * 100}
//                               className="flex-1 h-2"
//                             />
//                             <span className="text-sm text-gray-600 dark:text-gray-400">
//                               {assessment.submissions.submitted}/{assessment.submissions.total}
//                             </span>
//                           </div>
//                         </div>

//                         <div>
//                           <div className="text-sm font-medium mb-1">Grading Progress</div>
//                           <div className="flex items-center space-x-2">
//                             <Progress
//                               value={
//                                 assessment.submissions.submitted > 0
//                                   ? (assessment.graded.graded / assessment.submissions.submitted) * 100
//                                   : 0
//                               }
//                               className="flex-1 h-2"
//                             />
//                             <span className="text-sm text-gray-600 dark:text-gray-400">
//                               {assessment.graded.graded}/{assessment.submissions.submitted}
//                             </span>
//                           </div>
//                         </div>

//                         <div>
//                           <div className="text-sm font-medium mb-1">Average Score</div>
//                           <div className="text-lg font-semibold">
//                             {assessment.status === "completed"
//                               ? `${Math.round((assessment.averageScore / assessment.totalPoints) * 100)}%`
//                               : "N/A"}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between mt-4 pt-4 border-t">
//                         <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
//                           <div className="flex items-center">
//                             <Calendar className="mr-1 h-4 w-4" />
//                             Due: {new Date(assessment.dueDate).toLocaleDateString()}
//                           </div>
//                           <div className="flex items-center">
//                             <Users className="mr-1 h-4 w-4" />
//                             {assessment.submissions.total} students
//                           </div>
//                         </div>

//                         <div className="flex space-x-2">
//                           {assessment.status === "grading" && (
//                             <Button size="sm">
//                               Grade Submissions ({assessment.submissions.submitted - assessment.graded.graded})
//                             </Button>
//                           )}
//                           {assessment.status === "completed" && (
//                             <Button size="sm" variant="outline">
//                               View Results
//                             </Button>
//                           )}
//                           {assessment.status === "upcoming" && (
//                             <Button size="sm" variant="outline">
//                               Edit Assessment
//                             </Button>
//                           )}
//                           <Button size="sm" variant="ghost">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Dummy courses
const courses = [
  {
    id: 1,
    code: "CS101",
    name: "Computer Science 101",
    semester: "Fall 2025",
    students: 5,
  },
  {
    id: 2,
    code: "MATH201",
    name: "Mathematics 201",
    semester: "Fall 2025",
    students: 8,
  },
  {
    id: 3,
    code: "PHYS150",
    name: "Physics 150",
    semester: "Fall 2025",
    students: 6,
  },
  {
    id: 4,
    code: "ENG301",
    name: "Engineering 301",
    semester: "Fall 2025",
    students: 7,
  },
];

const TeacherAssessments = () => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  // Sync with system theme preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Handle course click
  const handleCourseClick = (courseCode) => {
    if (courseCode === "CS101") {
      navigate(`/teacher/assessments/1`);
    } else {
      console.log(`Navigating to assessments for ${courseCode} (placeholder)`);
      // Future: Add routes for other courses
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            My Courses
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Course Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Course Management
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            View and manage your courses
          </p>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCourseClick(course.code)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {course.name}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {course.code}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {course.semester} • {course.students} students
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <svg
                              className="mr-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                            Semester: {course.semester}
                          </div>
                          <div className="flex items-center">
                            <svg
                              className="mr-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                              ></path>
                            </svg>
                            {course.students} students
                          </div>
                        </div>
                        <button
                          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            handleCourseClick(course.code);
                          }}
                        >
                          View Assessments
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssessments;
