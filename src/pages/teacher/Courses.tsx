import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TeacherCourses() {
  const courses = [
    {
      id: "MED101",
      name: "Human Anatomy",
      code: "MED101",
      semester: "Spring 2024",
      students: 45,
      credits: 4,
      schedule: "Mon, Wed, Fri 9:00-10:30 AM",
      room: "Room 101",
      status: "active",
      progress: 65,
      nextClass: "2024-01-17 09:00",
      assignments: 8,
      pendingGrades: 12,
    },
    {
      id: "MED102",
      name: "Physiology",
      code: "MED102",
      semester: "Spring 2024",
      students: 38,
      credits: 3,
      schedule: "Tue, Thu 11:00-12:30 PM",
      room: "Room 205",
      status: "active",
      progress: 58,
      nextClass: "2024-01-18 11:00",
      assignments: 6,
      pendingGrades: 8,
    },
    {
      id: "MED104",
      name: "Medical Ethics",
      code: "MED104",
      semester: "Spring 2024",
      students: 52,
      credits: 2,
      schedule: "Wed 2:00-4:00 PM",
      room: "Room 301",
      status: "active",
      progress: 72,
      nextClass: "2024-01-17 14:00",
      assignments: 4,
      pendingGrades: 5,
    },
    {
      id: "MED201",
      name: "Advanced Anatomy",
      code: "MED201",
      semester: "Spring 2024",
      students: 28,
      credits: 4,
      schedule: "Mon, Wed 3:00-4:30 PM",
      room: "Lab 2",
      status: "active",
      progress: 45,
      nextClass: "2024-01-17 15:00",
      assignments: 5,
      pendingGrades: 15,
    },
    {
      id: "MED301",
      name: "Clinical Anatomy",
      code: "MED301",
      semester: "Spring 2024",
      students: 35,
      credits: 3,
      schedule: "Fri 10:00-1:00 PM",
      room: "Clinical Lab",
      status: "active",
      progress: 80,
      nextClass: "2024-01-19 10:00",
      assignments: 3,
      pendingGrades: 7,
    },
    {
      id: "MED103",
      name: "Biochemistry",
      code: "MED103",
      semester: "Fall 2023",
      students: 42,
      credits: 3,
      schedule: "Completed",
      room: "Lab 3",
      status: "completed",
      progress: 100,
      nextClass: null,
      assignments: 10,
      pendingGrades: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "completed":
        return "secondary";
      case "upcoming":
        return "outline";
      default:
        return "outline";
    }
  };

  const activeCourses = courses.filter((course) => course.status === "active");
  const completedCourses = courses.filter(
    (course) => course.status === "completed"
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Courses</h1>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCourses.length}</div>
            <p className="text-xs text-muted-foreground">Spring 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeCourses.reduce((sum, course) => sum + course.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Grades
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeCourses.reduce(
                (sum, course) => sum + course.pendingGrades,
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Assignments to grade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeCourses.reduce((sum, course) => sum + course.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Teaching load</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {/* <div className="flex items-center justify-between">
                  <Badge variant={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div> */}
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription>
                  {course.code} • {course.semester}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-gray-500" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
                    {course.credits} credits
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Schedule:</strong> {course.schedule}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Room:</strong> {course.room}
                  </div>
                  {course.nextClass && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Next Class:</strong>{" "}
                      {new Date(course.nextClass).toLocaleString()}
                    </div>
                  )}
                </div> */}

                {/* <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div> */}

                {/* <div className="flex justify-between text-sm">
                  <span>Assignments: {course.assignments}</span>
                  <span className="text-orange-600">
                    Pending: {course.pendingGrades}
                  </span>
                </div> */}

                <div className="flex space-x-2">
                  <Link
                    to={`/teacher/students/${course.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Students
                    </Button>
                  </Link>
                  <Link
                    to={`/teacher/assessments/${course.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Assessments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Courses */}
      {/* {completedCourses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Completed Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={getStatusColor(course.status)}>{course.status}</Badge>
                  </div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription>
                    {course.code} • {course.semester}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-500" />
                      {course.students} students
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
                      {course.credits} credits
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Final Grade Distribution:</strong> Available in reports
                  </div>

                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Course Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
