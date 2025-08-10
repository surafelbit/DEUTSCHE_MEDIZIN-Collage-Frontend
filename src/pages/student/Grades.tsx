import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Download, TrendingUp, Calendar, Award, BarChart3 } from "lucide-react"

export default function StudentGrades() {
  const currentSemester = {
    name: "Spring 2024",
    gpa: 1.4,
    credits: 18,
    courses: [
      { name: "Human Anatomy", code: "MED101", credits: 4, grade: "A-", points: 1.3, professor: "Dr. Mueller" },
      { name: "Physiology", code: "MED102", credits: 3, grade: "B+", points: 1.7, professor: "Dr. Schmidt" },
      { name: "Biochemistry", code: "MED103", credits: 3, grade: "A", points: 1.0, professor: "Dr. Weber" },
      { name: "Medical Ethics", code: "MED104", credits: 2, grade: "A", points: 1.0, professor: "Dr. Fischer" },
      {
        name: "German Medical Terminology",
        code: "MED105",
        credits: 2,
        grade: "B",
        points: 2.0,
        professor: "Dr. Hoffmann",
      },
      { name: "Research Methods", code: "MED106", credits: 4, grade: "A-", points: 1.3, professor: "Dr. Wagner" },
    ],
  }

  const previousSemesters = [
    {
      name: "Fall 2023",
      gpa: 1.3,
      credits: 15,
      courses: [
        { name: "General Chemistry", code: "CHEM101", credits: 4, grade: "A", points: 1.0 },
        { name: "Biology Fundamentals", code: "BIO101", credits: 3, grade: "A-", points: 1.3 },
        { name: "Physics for Medicine", code: "PHYS101", credits: 3, grade: "B+", points: 1.7 },
        { name: "Mathematics", code: "MATH101", credits: 3, grade: "A", points: 1.0 },
        { name: "Introduction to Medicine", code: "MED100", credits: 2, grade: "A", points: 1.0 },
      ],
    },
  ]

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "default"
    if (grade.startsWith("B")) return "secondary"
    if (grade.startsWith("C")) return "outline"
    return "destructive"
  }

  const overallStats = {
    totalCredits: 33,
    overallGPA: 1.35,
    completionRate: 18.3, // out of 180 total credits
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Academic Grades</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Transcript
        </Button>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.overallGPA}</div>
            <p className="text-xs text-muted-foreground">German grading system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalCredits}</div>
            <p className="text-xs text-muted-foreground">Out of 180 required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.completionRate}%</div>
            <Progress value={overallStats.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Standing</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Excellent</div>
            <p className="text-xs text-muted-foreground">Dean's List eligible</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Semester */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            {currentSemester.name} - Current Semester
          </CardTitle>
          <CardDescription>
            GPA: {currentSemester.gpa} | Credits: {currentSemester.credits}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Course</th>
                  <th className="text-left py-2">Code</th>
                  <th className="text-center py-2">Credits</th>
                  <th className="text-center py-2">Grade</th>
                  <th className="text-center py-2">Points</th>
                  <th className="text-left py-2">Professor</th>
                </tr>
              </thead>
              <tbody>
                {currentSemester.courses.map((course, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{course.name}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{course.code}</td>
                    <td className="py-3 text-center">{course.credits}</td>
                    <td className="py-3 text-center">
                      <Badge variant={getGradeColor(course.grade)}>{course.grade}</Badge>
                    </td>
                    <td className="py-3 text-center font-mono">{course.points}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{course.professor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Previous Semesters */}
      {previousSemesters.map((semester, semesterIndex) => (
        <Card key={semesterIndex}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              {semester.name}
            </CardTitle>
            <CardDescription>
              GPA: {semester.gpa} | Credits: {semester.credits}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Course</th>
                    <th className="text-left py-2">Code</th>
                    <th className="text-center py-2">Credits</th>
                    <th className="text-center py-2">Grade</th>
                    <th className="text-center py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.courses.map((course, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 font-medium">{course.name}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">{course.code}</td>
                      <td className="py-3 text-center">{course.credits}</td>
                      <td className="py-3 text-center">
                        <Badge variant={getGradeColor(course.grade)}>{course.grade}</Badge>
                      </td>
                      <td className="py-3 text-center font-mono">{course.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Grade Scale Reference */}
      <Card>
        <CardHeader>
          <CardTitle>German Grading Scale Reference</CardTitle>
          <CardDescription>Understanding your grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Grade Points</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1.0 - 1.3</span>
                  <Badge variant="default">Excellent (A)</Badge>
                </div>
                <div className="flex justify-between">
                  <span>1.7 - 2.3</span>
                  <Badge variant="secondary">Good (B)</Badge>
                </div>
                <div className="flex justify-between">
                  <span>2.7 - 3.3</span>
                  <Badge variant="outline">Satisfactory (C)</Badge>
                </div>
                <div className="flex justify-between">
                  <span>3.7 - 4.0</span>
                  <Badge variant="outline">Sufficient (D)</Badge>
                </div>
                <div className="flex justify-between">
                  <span>5.0</span>
                  <Badge variant="destructive">Fail (F)</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Academic Standing</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Excellent:</strong> GPA 1.0 - 1.5
                </div>
                <div>
                  <strong>Good:</strong> GPA 1.6 - 2.5
                </div>
                <div>
                  <strong>Satisfactory:</strong> GPA 2.6 - 3.5
                </div>
                <div>
                  <strong>Sufficient:</strong> GPA 3.6 - 4.0
                </div>
                <div>
                  <strong>Probation:</strong> GPA below 4.0
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
