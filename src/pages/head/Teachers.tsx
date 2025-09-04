import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"

type Teacher = { id: string; name: string; qualification: string; courses: number }

const MOCK_TEACHERS: Teacher[] = [
  { id: "T-100", name: "Dr. Alemu", qualification: "PhD Biology", courses: 3 },
  { id: "T-101", name: "Dr. Sara", qualification: "PhD Chemistry", courses: 4 },
  { id: "T-102", name: "Mr. Bekele", qualification: "MSc Physics", courses: 2 },
]

export default function HeadTeachers() {
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    return MOCK_TEACHERS.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()) || t.id.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Department Teachers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Teacher Management</CardTitle>
          <CardDescription>Assign courses and track workload</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Search by name or ID" value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="md:col-span-2 flex gap-2">
              <Button className="w-full">Assign Course</Button>
              <Button variant="outline" className="w-full">Export</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Qualification</th>
                  <th className="py-2 pr-4">Courses</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b">
                    <td className="py-2 pr-4">{t.id}</td>
                    <td className="py-2 pr-4">{t.name}</td>
                    <td className="py-2 pr-4">{t.qualification}</td>
                    <td className="py-2 pr-4">{t.courses}</td>
                    <td className="py-2 pr-4">
                      <div className="flex gap-2">
                        <Button size="sm">Assign</Button>
                        <Button size="sm" variant="outline">Profile</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
