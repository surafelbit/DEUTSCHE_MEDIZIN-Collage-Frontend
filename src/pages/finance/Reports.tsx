import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinanceReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Financial Analytics</CardTitle>
          <CardDescription>Generate financial reports and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Financial reports interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
