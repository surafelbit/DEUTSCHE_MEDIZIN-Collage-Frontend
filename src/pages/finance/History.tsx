import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinanceHistory() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Payment history interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
