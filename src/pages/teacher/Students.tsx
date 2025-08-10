"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Mail, Phone, Download, Filter, MoreHorizontal } from "lucide-react"
import { useParams } from "react-router-dom"

export default function TeacherStudents() {
  const { courseId } = useParams()

  const students = [
    {
      id: "2024001",
      name: "John Smith",
      email: "john.smith@dhfm-college.de",
      phone: "+49 123 456 7890",
      avatar: "/placeholder.svg?height=40&width=40",
      currentGrade: "A-",
      gpa: 1.3,
      attendance: 95,
      assignments: { completed: 8, total: 8 },
      lastActive: "2024-01-16",
      status: "active",
    },
    {
      id: "2024002",
      name: "Emma Mueller",
      email: "emma.mueller@dhfm-college.de",
      phone: "+49 123 456 7891",
      avatar: "/placeholder.svg?height=40&width=40",
      currentGrade: "B+",
      gpa: 1.7,
      attendance: 92,
      assignments: { completed: 7, total: 8 },
      lastActive: "2024-01-16",
      status: "active",
    },
    {
      id: "2024003",
      name: "Michael Weber",
      email: "michael.weber@dhfm-college.de",
      phone: "+49 123 456 7892",
      avatar: "/placeholder.svg?height=40&width=40",
      currentGrade: "A",
      gpa: 1.0,
      attendance: 98,
      assignments: { completed: 8, total: 8 },
      lastActive: "2024-01-15",
      status: "active",
    },
    {
      id: "2024004",
      name: "Sarah Fischer",
      email: "sarah.fischer@dhfm-college.de",
      phone: "+49 123 456 7893",
      avatar: "/placeholder.svg?height=40&width=40",
      currentGrade: "B",
      gpa: 2.0,
      attendance: 88,
      assignments: { completed: 6, total: 8 },
      lastActive: "2024-01-14",
      status: "at-risk",
    },
    {
      id: "2024005",
      name: "David Hoffmann",
      email: "david.hoffmann@dhfm-college.de",
      phone: "+49 123 456 7894",
      avatar: "/placeholder.svg?height=40&width=40",
      currentGrade: "A-",
      gpa: 1.3,
      attendance: 94,
      assignments: { completed: 8, total: 8 },
      lastActive: "2024-01-16",
      status: "active",
    },
  ]

  const courseInfo = {
    name: courseId === "all" ? "All Courses" : "Human Anatomy",
    code: courseId === "all" ? "" : "MED101",
    totalStudents: courseId === "all" ? 247 : 45,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "at-risk":
        return "destructive"
      case "inactive":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {courseInfo.name} {courseInfo.code && `(${courseInfo.code})`} • {courseInfo.totalStudents} students
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Student Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Enrolled in course</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">Class average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {students.filter((s) => s.status === "at-risk").length}
            </div>
            <p className="text-xs text-muted-foreground">Students need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>Manage and view student information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-8" />
            </div>
          </div>

          {/* Student Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Student</th>
                  <th className="text-left py-3 px-2">Contact</th>
                  <th className="text-center py-3 px-2">Current Grade</th>
                  <th className="text-center py-3 px-2">GPA</th>
                  <th className="text-center py-3 px-2">Attendance</th>
                  <th className="text-center py-3 px-2">Assignments</th>
                  <th className="text-center py-3 px-2">Status</th>
                  <th className="text-center py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">ID: {student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3" />
                          <a href={`mailto:${student.email}`} className="text-blue-600 hover:underline">
                            {student.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="mr-1 h-3 w-3" />
                          {student.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className={`font-bold ${getGradeColor(student.currentGrade)}`}>{student.currentGrade}</span>
                    </td>
                    <td className="py-4 px-2 text-center font-mono">{student.gpa}</td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex flex-col items-center">
                        <span className={student.attendance >= 90 ? "text-green-600" : "text-red-600"}>
                          {student.attendance}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex flex-col items-center">
                        <span>
                          {student.assignments.completed}/{student.assignments.total}
                        </span>
                        <div className="w-12 bg-gray-200 rounded-full h-1 mt-1 dark:bg-gray-700">
                          <div
                            className="bg-blue-600 h-1 rounded-full"
                            style={{
                              width: `${(student.assignments.completed / student.assignments.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Badge variant={getStatusColor(student.status)}>{student.status}</Badge>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
