import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeadDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Department Head Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Department Head</CardTitle>
          <CardDescription>Manage your department effectively</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Department overview and management tools will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
