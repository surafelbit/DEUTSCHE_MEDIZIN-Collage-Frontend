import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeadStudents() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Department Students</h1>
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Oversee students in your department</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Student management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
