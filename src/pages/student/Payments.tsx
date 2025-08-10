import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, Calendar, AlertCircle, CheckCircle, Clock, Euro } from "lucide-react"

export default function StudentPayments() {
  const currentBalance = {
    total: 2450,
    dueDate: "2024-03-15",
    breakdown: [
      { item: "Tuition Fee - Spring 2024", amount: 2000, status: "pending" },
      { item: "Student Services Fee", amount: 150, status: "pending" },
      { item: "Library Fee", amount: 50, status: "pending" },
      { item: "Lab Fee - Anatomy", amount: 100, status: "pending" },
      { item: "Health Insurance", amount: 150, status: "pending" },
    ],
  }

  const paymentHistory = [
    {
      date: "2023-09-15",
      description: "Tuition Fee - Fall 2023",
      amount: 2000,
      status: "paid",
      method: "Bank Transfer",
      reference: "TXN-2023-001",
    },
    {
      date: "2023-09-15",
      description: "Student Services Fee",
      amount: 150,
      status: "paid",
      method: "Credit Card",
      reference: "TXN-2023-002",
    },
    {
      date: "2023-09-20",
      description: "Dormitory Fee - Fall 2023",
      amount: 800,
      status: "paid",
      method: "Bank Transfer",
      reference: "TXN-2023-003",
    },
    {
      date: "2024-01-10",
      description: "Late Payment Fee",
      amount: 25,
      status: "paid",
      method: "Credit Card",
      reference: "TXN-2024-001",
    },
  ]

  const paymentPlan = {
    totalAmount: 8000,
    paidAmount: 2975,
    remainingAmount: 5025,
    installments: [
      { dueDate: "2023-09-15", amount: 2975, status: "paid", description: "Fall 2023 Payment" },
      { dueDate: "2024-03-15", amount: 2450, status: "pending", description: "Spring 2024 Payment" },
      { dueDate: "2024-09-15", amount: 2575, status: "upcoming", description: "Fall 2024 Payment" },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "destructive"
      case "upcoming":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payments & Billing</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Make Payment
          </Button>
        </div>
      </div>

      {/* Current Balance Alert */}
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800 dark:text-red-200">
            <AlertCircle className="mr-2 h-5 w-5" />
            Outstanding Balance
          </CardTitle>
          <CardDescription className="text-red-600 dark:text-red-300">
            Payment due by {new Date(currentBalance.dueDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-red-800 dark:text-red-200">
                €{currentBalance.total.toLocaleString()}
              </div>
              <p className="text-red-600 dark:text-red-300">
                Due in{" "}
                {Math.ceil((new Date(currentBalance.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                days
              </p>
            </div>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Pay Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Program Cost</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{paymentPlan.totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">6-year MD program</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{paymentPlan.paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((paymentPlan.paidAmount / paymentPlan.totalAmount) * 100).toFixed(1)}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">€{paymentPlan.remainingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">2 installments remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
          <CardDescription>Your progress through the payment plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Program Completion</span>
                <span>{((paymentPlan.paidAmount / paymentPlan.totalAmount) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(paymentPlan.paidAmount / paymentPlan.totalAmount) * 100} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Semester Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Spring 2024 - Fee Breakdown
          </CardTitle>
          <CardDescription>Detailed breakdown of current semester charges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentBalance.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(item.status)}
                  <span className="font-medium">{item.item}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono">€{item.amount}</span>
                  <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between font-bold text-lg">
                <span>Total Due</span>
                <span>€{currentBalance.total}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Plan</CardTitle>
          <CardDescription>Your scheduled payment installments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentPlan.installments.map((installment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(installment.status)}
                  <div>
                    <div className="font-medium">{installment.description}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Due: {new Date(installment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-lg">€{installment.amount}</span>
                  <Badge variant={getStatusColor(installment.status)}>{installment.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your previous payments and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Description</th>
                  <th className="text-center py-2">Amount</th>
                  <th className="text-center py-2">Method</th>
                  <th className="text-center py-2">Status</th>
                  <th className="text-left py-2">Reference</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="py-3 font-medium">{payment.description}</td>
                    <td className="py-3 text-center font-mono">€{payment.amount}</td>
                    <td className="py-3 text-center">{payment.method}</td>
                    <td className="py-3 text-center">
                      <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400 font-mono text-sm">{payment.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Available payment options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Bank Transfer</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Direct transfer to college account</p>
              <div className="text-xs space-y-1">
                <div>
                  <strong>Bank:</strong> Deutsche Bank
                </div>
                <div>
                  <strong>IBAN:</strong> DE89 3704 0044 0532 0130 00
                </div>
                <div>
                  <strong>BIC:</strong> COBADEFFXXX
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Online Payment</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Credit/Debit card or PayPal</p>
              <div className="flex space-x-2">
                <Badge variant="outline">Visa</Badge>
                <Badge variant="outline">Mastercard</Badge>
                <Badge variant="outline">PayPal</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
