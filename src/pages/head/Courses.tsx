import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeadCourses() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Department Courses</h1>
      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>Oversee courses in your department</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Course management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
