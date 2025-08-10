import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrarBatches() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Batches</h1>
      <Card>
        <CardHeader>
          <CardTitle>Batch Management</CardTitle>
          <CardDescription>Manage student cohorts and batches</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Batch management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
