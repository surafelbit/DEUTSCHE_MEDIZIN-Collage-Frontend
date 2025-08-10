import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeadTeachers() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Department Teachers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Teacher Management</CardTitle>
          <CardDescription>Manage faculty in your department</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Teacher management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
