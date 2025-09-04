import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"

type Student = {
  id: string
  name: string
  year: string
  gpa: number
  attendance: number
}

const MOCK_STUDENTS: Student[] = [
  { id: "S-0001", name: "Abebe Bekele", year: "Year 1", gpa: 3.6, attendance: 93 },
  { id: "S-0002", name: "Hanna G.", year: "Year 2", gpa: 2.7, attendance: 84 },
  { id: "S-0003", name: "Kebede T.", year: "Year 3", gpa: 3.1, attendance: 91 },
  { id: "S-0004", name: "Sara M.", year: "Year 4", gpa: 3.9, attendance: 96 },
]

export default function HeadStudents() {
  const [query, setQuery] = useState("")
  const [year, setYear] = useState("All")

  const filtered = useMemo(() => {
    return MOCK_STUDENTS.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) || s.id.toLowerCase().includes(query.toLowerCase())
      const matchesYear = year === "All" ? true : s.year === year
      return matchesQuery && matchesYear
    })
  }, [query, year])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Department Students</h1>

      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Search, filter, and view student profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Search by name or ID" value={query} onChange={(e) => setQuery(e.target.value)} />
            <select className="border rounded px-3 py-2 bg-background" value={year} onChange={(e) => setYear(e.target.value)}>
              <option>All</option>
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
            </select>
            <div className="flex gap-2">
              <Button className="w-full">Export</Button>
              <Button variant="outline" className="w-full">Attendance</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Year</th>
                  <th className="py-2 pr-4">GPA</th>
                  <th className="py-2 pr-4">Attendance</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="py-2 pr-4">{s.id}</td>
                    <td className="py-2 pr-4">{s.name}</td>
                    <td className="py-2 pr-4">{s.year}</td>
                    <td className="py-2 pr-4">{s.gpa.toFixed(2)}</td>
                    <td className="py-2 pr-4">{s.attendance}%</td>
                    <td className="py-2 pr-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Profile</Button>
                        <Button size="sm">Approve</Button>
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
