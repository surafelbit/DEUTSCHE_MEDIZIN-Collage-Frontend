import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeanGrades() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Academic Performance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Grade Analytics</CardTitle>
          <CardDescription>Monitor college-wide academic performance</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Grade analytics interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
