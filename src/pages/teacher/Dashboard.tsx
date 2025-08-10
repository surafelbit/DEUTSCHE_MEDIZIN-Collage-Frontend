import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, FileText, Calendar, Clock, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export default function TeacherDashboard() {
  const todayClasses = [
    { course: "Human Anatomy", time: "09:00 AM", room: "Room 101", students: 45 },
    { course: "Physiology", time: "11:00 AM", room: "Room 205", students: 38 },
    { course: "Medical Ethics", time: "02:00 PM", room: "Room 301", students: 52 },
  ]

  const recentAssignments = [
    { course: "Human Anatomy", title: "Skeletal System Quiz", dueDate: "2024-01-20", submitted: 42, total: 45 },
    { course: "Physiology", title: "Cardiovascular Lab Report", dueDate: "2024-01-18", submitted: 35, total: 38 },
    { course: "Medical Ethics", title: "Case Study Analysis", dueDate: "2024-01-22", submitted: 48, total: 52 },
  ]

  const pendingTasks = [
    { task: "Grade Anatomy Midterm Exams", priority: "high", count: 45 },
    { task: "Review Lab Reports", priority: "medium", count: 23 },
    { task: "Prepare Next Week's Lectures", priority: "low", count: 3 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. Mueller!</h1>
        <p className="text-blue-100">Ready to inspire the next generation of medical professionals?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Spring 2024 semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">Student evaluations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>Your teaching schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((class_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{class_.course}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {class_.room} • {class_.students} students
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    {class_.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Recent Assignments
            </CardTitle>
            <CardDescription>Assignment submission status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {assignment.course} • Due: {assignment.dueDate}
                      </div>
                    </div>
                    <Badge variant={assignment.submitted === assignment.total ? "default" : "secondary"}>
                      {assignment.submitted}/{assignment.total}
                    </Badge>
                  </div>
                  <Progress value={(assignment.submitted / assignment.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>Items requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {task.priority === "high" && <AlertCircle className="h-5 w-5 text-red-500" />}
                  {task.priority === "medium" && <Clock className="h-5 w-5 text-yellow-500" />}
                  {task.priority === "low" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  <div>
                    <div className="font-medium">{task.task}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{task.count} items</div>
                  </div>
                </div>
                <Badge
                  variant={
                    task.priority === "high" ? "destructive" : task.priority === "medium" ? "secondary" : "outline"
                  }
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <FileText className="h-6 w-6 mb-2" />
              Create Assignment
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              View Students
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <BookOpen className="h-6 w-6 mb-2" />
              Course Materials
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Class
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
