import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeanDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dean Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Academic Leadership</CardTitle>
          <CardDescription>Oversee college academic operations</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Dean dashboard content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
