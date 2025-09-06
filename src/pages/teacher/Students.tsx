"use client";

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
import { Search, Mail, Phone, Download, Filter, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export default function TeacherStudents() {
  const { courseId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    {
      id: "2024001",
      name: "John Smith",
      email: "john.smith@dhfm-college.de",
      phone: "+49 123 456 7890",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2024002",
      name: "Emma Mueller",
      email: "emma.mueller@dhfm-college.de",
      phone: "+49 123 456 7891",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2024003",
      name: "Michael Weber",
      email: "michael.weber@dhfm-college.de",
      phone: "+49 123 456 7892",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2024004",
      name: "Sarah Fischer",
      email: "sarah.fischer@dhfm-college.de",
      phone: "+49 123 456 7893",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2024005",
      name: "David Hoffmann",
      email: "david.hoffmann@dhfm-college.de",
      phone: "+49 123 456 7894",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const courseInfo = {
    name: courseId === "all" ? "All Courses" : "Human Anatomy",
    code: courseId === "all" ? "" : "MED101",
    totalStudents: courseId === "all" ? 247 : 45,
  };

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Students
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {courseInfo.name} {courseInfo.code && `(${courseInfo.code})`} •{" "}
              {courseInfo.totalStudents} students
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transform transition-transform hover:scale-105">
              <Download className="mr-2 h-5 w-5" />
              Export List
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:bg-gray-600 hover:text-white dark:hover:bg-gray-400 dark:hover:text-gray-900 transition-colors"
            >
              <Filter className="mr-2 h-5 w-5" />
              Filter
            </Button>
          </div>
        </div>

        {/* Student Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-100 dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border-2 border-gray-300 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Total Students
              </CardTitle>
              <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {students.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enrolled in course
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Student List */}
        <Card className="bg-gray-100 dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden group border-2 border-gray-300 dark:border-gray-700">
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Student List
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Manage and view student information for {courseInfo.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search students by name, ID, or email..."
                  className="pl-10 bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-300 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Student Table */}
            <table className="w-full border-t-2 border-b-2 border-gray-300 dark:border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-semibold">Student</th>
                  <th className="text-left py-4 px-6 font-semibold">Contact</th>
                  <th className="text-center py-4 px-6 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.01]"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={student.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            ID: {student.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <a
                            href={`mailto:${student.email}`}
                            className="text-gray-700 dark:text-gray-300 hover:underline"
                          >
                            {student.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                          {student.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link to={`/teacher/students/${courseId}/${student.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent text-gray-600 dark:text-gray-400 border-gray-600 dark:border-gray-400 hover:bg-gray-600 hover:text-white dark:hover:bg-gray-400 dark:hover:text-gray-900 transition-colors"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStudents.length === 0 && (
              <div className="text-center py-6 text-gray-600 dark:text-gray-400">
                No students found matching your search.
              </div>
            )}
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700 opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </Card>
      </div>
    </div>
  );
}
// import { Link } from "react-router-dom";
// import { FaBook, FaClock, FaArrowRight } from "react-icons/fa";

// // Sample course data (in a real app, this could come from a prop or API)
// const courses = [
//   {
//     id: 1,
//     name: "Introduction to Computer Science",
//     code: "CS101",
//     semester: "Fall 2025",
//   },
//   {
//     id: 2,
//     name: "Data Structures and Algorithms",
//     code: "CS201",
//     semester: "Fall 2025",
//   },
//   {
//     id: 3,
//     name: "Web Development Fundamentals",
//     code: "CS301",
//     semester: "Fall 2025",
//   },
// ];

// // CourseCard component
// const CourseCard = ({ course }) => {
//   return (
//     <Link
//       to={`/students/${course.id}`}
//       className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//       <div className="relative z-10">
//         <h2 className="text-2xl font-bold mb-2 flex items-center">
//           <FaBook className="mr-2" /> {course.name}
//         </h2>
//         <p className="text-sm opacity-90 flex items-center">
//           <FaClock className="mr-2" /> {course.semester}
//         </p>
//         <p className="text-sm opacity-90">Course Code: {course.code}</p>
//         <div className="mt-4 flex justify-end">
//           <span className="inline-flex items-center text-sm font-semibold group-hover:pr-2 transition-all duration-300">
//             View Students{" "}
//             <FaArrowRight className="ml-2 transform group-hover:translate-x-1" />
//           </span>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
//     </Link>
//   );
// };

// // Main TeacherCourses component
// const TeacherStudents = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8 animate-fade-in">
//           My Courses
//         </h1>
//         <p className="text-center text-gray-600 dark:text-gray-300 mb-12 animate-fade-in-up">
//           Explore your current courses and manage student rosters with ease.
//         </p>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {courses.map((course) => (
//             <CourseCard key={course.id} course={course} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherStudents;
