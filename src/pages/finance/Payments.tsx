import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinancePayments() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Student Payments</CardTitle>
          <CardDescription>Process and track student payments</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Payment management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
