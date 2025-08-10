import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeanReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Academic Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Institutional Analytics</CardTitle>
          <CardDescription>Comprehensive academic reporting</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Academic reports interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
