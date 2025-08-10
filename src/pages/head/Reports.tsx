import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeadReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Department Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Reports</CardTitle>
          <CardDescription>View department performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Department reports and analytics will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
