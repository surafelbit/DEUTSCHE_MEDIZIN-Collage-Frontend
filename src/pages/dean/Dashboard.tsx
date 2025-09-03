"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Charts removed per request

const totals = {
  students: 1260,
  courses: 142,
  departments: 8,
  faculty: 215,
};

// Replacements: KPI lists
const deptKpis = [
  { dept: "Medicine", avgGpa: 3.21, attendance: 90 },
  { dept: "Pharmacy", avgGpa: 3.05, attendance: 88 },
  { dept: "Radiology", avgGpa: 3.46, attendance: 92 },
  { dept: "Nursing", avgGpa: 3.12, attendance: 89 },
  { dept: "Dentistry", avgGpa: 2.98, attendance: 87 },
];

const upcomingEvents = [
  { id: 1, title: "Midterm Exams", date: "Oct 12", note: "All departments" },
  { id: 2, title: "Grade Submission Deadline", date: "Oct 25", note: "Semester 1" },
  { id: 3, title: "Results Announcement", date: "Nov 02", note: "Portal + Notice" },
];

const alerts = [
  { id: 1, type: "warning", text: "12 students at academic risk (GPA < 2.0)" },
  { id: 2, type: "danger", text: "3 disciplinary cases pending review" },
  { id: 3, type: "info", text: "7 course change requests awaiting approval" },
];

const topBottom = {
  top: [
    { id: 1, name: "Alice Johnson", gpa: 3.98, dept: "Radiology" },
    { id: 2, name: "Michael Lee", gpa: 3.92, dept: "Medicine" },
    { id: 3, name: "Sophia Brown", gpa: 3.90, dept: "Pharmacy" },
  ],
  bottom: [
    { id: 11, name: "Chris Green", gpa: 1.92, dept: "Dentistry" },
    { id: 12, name: "Dana Brooks", gpa: 1.88, dept: "Nursing" },
    { id: 13, name: "Eric Young", gpa: 1.84, dept: "Medicine" },
  ],
};

export default function DeanDashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Dean Dashboard</h1>

        {/* Totals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{label:"Students", value: totals.students}, {label:"Courses", value: totals.courses}, {label:"Departments", value: totals.departments}, {label:"Faculty", value: totals.faculty}].map((m) => (
            <Card key={m.label} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{m.label}</h3>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{m.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg lg:col-span-2">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Quick Alerts</h2>
              <ul className="space-y-2">
                {alerts.map((a) => (
                  <li key={a.id} className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{a.text}</span>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400">View</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Upcoming</h2>
              <ul className="space-y-3">
                {upcomingEvents.map((e) => (
                  <li key={e.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                    <p className="font-medium text-blue-600 dark:text-blue-400">{e.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{e.date} • {e.note}</p>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Add Event</Button>
            </CardContent>
          </Card>
        </div>

        {/* Analytics (Replaced with tabular summaries) */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Department KPIs</h2>
          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-4 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600 dark:text-gray-400">
                    <th className="p-2">Department</th>
                    <th className="p-2">Average GPA</th>
                    <th className="p-2">Attendance Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {deptKpis.map((k) => (
                    <tr key={k.dept} className="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700">
                      <td className="p-2">{k.dept}</td>
                      <td className="p-2 text-blue-600 dark:text-blue-400 font-semibold">{k.avgGpa.toFixed(2)}</td>
                      <td className="p-2">{k.attendance}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Top/Bottom performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Top Performing Students</h3>
              <div className="space-y-2">
                {topBottom.top.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{s.name} • {s.dept}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">GPA {s.gpa.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Underperforming Students</h3>
              <div className="space-y-2">
                {topBottom.bottom.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{s.name} • {s.dept}</span>
                    <span className="text-red-600 dark:text-red-400 font-semibold">GPA {s.gpa.toFixed(2)}</span>
                  </div>
                ))}
              </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
}
