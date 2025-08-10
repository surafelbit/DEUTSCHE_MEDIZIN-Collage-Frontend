import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinanceDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Finance Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Monitor college financial operations</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Finance dashboard content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
