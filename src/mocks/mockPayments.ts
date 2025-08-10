export interface Payment {
  id: string
  date: string
  description: string
  amount: number
  status: "paid" | "pending" | "overdue"
  method?: string
  reference?: string
}

export interface PaymentPlan {
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  installments: Array<{
    dueDate: string
    amount: number
    status: "paid" | "pending" | "upcoming"
    description: string
  }>
}

export interface PaymentsSummary {
  currentBalance: {
    total: number
    dueDate: string
    breakdown: Array<{
      item: string
      amount: number
      status: "paid" | "pending"
    }>
  }
  paymentHistory: Payment[]
  paymentPlan: PaymentPlan
}

export const mockPayments: PaymentsSummary = {
  currentBalance: {
    total: 2450,
    dueDate: "2024-03-15",
    breakdown: [
      { item: "Tuition Fee - Spring 2024", amount: 2000, status: "pending" },
      { item: "Student Services Fee", amount: 150, status: "pending" },
      { item: "Library Fee", amount: 50, status: "pending" },
      { item: "Lab Fee - Anatomy", amount: 100, status: "pending" },
      { item: "Health Insurance", amount: 150, status: "pending" },
    ],
  },
  paymentHistory: [
    {
      id: "TXN-2023-001",
      date: "2023-09-15",
      description: "Tuition Fee - Fall 2023",
      amount: 2000,
      status: "paid",
      method: "Bank Transfer",
      reference: "TXN-2023-001",
    },
    {
      id: "TXN-2023-002",
      date: "2023-09-15",
      description: "Student Services Fee",
      amount: 150,
      status: "paid",
      method: "Credit Card",
      reference: "TXN-2023-002",
    },
    {
      id: "TXN-2023-003",
      date: "2023-09-20",
      description: "Dormitory Fee - Fall 2023",
      amount: 800,
      status: "paid",
      method: "Bank Transfer",
      reference: "TXN-2023-003",
    },
    {
      id: "TXN-2024-001",
      date: "2024-01-10",
      description: "Late Payment Fee",
      amount: 25,
      status: "paid",
      method: "Credit Card",
      reference: "TXN-2024-001",
    },
  ],
  paymentPlan: {
    totalAmount: 8000,
    paidAmount: 2975,
    remainingAmount: 5025,
    installments: [
      {
        dueDate: "2023-09-15",
        amount: 2975,
        status: "paid",
        description: "Fall 2023 Payment",
      },
      {
        dueDate: "2024-03-15",
        amount: 2450,
        status: "pending",
        description: "Spring 2024 Payment",
      },
      {
        dueDate: "2024-09-15",
        amount: 2575,
        status: "upcoming",
        description: "Fall 2024 Payment",
      },
    ],
  },
}
