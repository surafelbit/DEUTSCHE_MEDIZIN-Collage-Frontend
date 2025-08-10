import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrarStudents() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Records</h1>
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Manage student academic records</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Student records interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
