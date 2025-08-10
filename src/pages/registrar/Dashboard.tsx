import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrarDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Registrar Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Academic Records Management</CardTitle>
          <CardDescription>Manage student records and academic processes</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Registrar dashboard content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
