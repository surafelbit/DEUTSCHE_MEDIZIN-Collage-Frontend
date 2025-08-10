import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrarCourses() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Course Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Academic Courses</CardTitle>
          <CardDescription>Manage course offerings and schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Course management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
