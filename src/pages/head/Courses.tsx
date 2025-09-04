import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"

type Course = { code: string; name: string; teacher: string; semester: string; avg: number }

const MOCK_COURSES: Course[] = [
  { code: "BIO101", name: "Intro to Biology", teacher: "Dr. Alemu", semester: "I", avg: 78 },
  { code: "CHE201", name: "Organic Chemistry", teacher: "Dr. Sara", semester: "II", avg: 72 },
  { code: "PHY110", name: "Mechanics", teacher: "Mr. Bekele", semester: "I", avg: 81 },
]

export default function HeadCourses() {
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    return MOCK_COURSES.filter((c) =>
      [c.code, c.name, c.teacher, c.semester].some((v) => v.toLowerCase().includes(query.toLowerCase()))
    )
  }, [query])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Department Courses</h1>
      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>Assign teachers and track performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Search courses" value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="md:col-span-2 flex gap-2">
              <Button className="w-full">Add Course</Button>
              <Button variant="outline" className="w-full">Assign Teacher</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Code</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Assigned Teacher</th>
                  <th className="py-2 pr-4">Semester</th>
                  <th className="py-2 pr-4">Avg Score</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.code} className="border-b">
                    <td className="py-2 pr-4">{c.code}</td>
                    <td className="py-2 pr-4">{c.name}</td>
                    <td className="py-2 pr-4">{c.teacher}</td>
                    <td className="py-2 pr-4">{c.semester}</td>
                    <td className="py-2 pr-4">{c.avg}%</td>
                    <td className="py-2 pr-4">
                      <div className="flex gap-2">
                        <Button size="sm">Edit</Button>
                        <Button size="sm" variant="outline">Performance</Button>
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
