export interface Grade {
  courseId: string
  courseName: string
  courseCode: string
  credits: number
  grade: string
  points: number
  semester: string
  instructor: string
  date: string
}

export interface GradesSummary {
  currentSemester: {
    name: string
    gpa: number
    credits: number
    courses: Grade[]
  }
  previousSemesters: Array<{
    name: string
    gpa: number
    credits: number
    courses: Grade[]
  }>
  overallStats: {
    totalCredits: number
    overallGPA: number
    completionRate: number
  }
}

export const mockGrades: GradesSummary = {
  currentSemester: {
    name: "Spring 2024",
    gpa: 1.4,
    credits: 18,
    courses: [
      {
        courseId: "MED101",
        courseName: "Human Anatomy",
        courseCode: "MED101",
        credits: 4,
        grade: "A-",
        points: 1.3,
        semester: "Spring 2024",
        instructor: "Dr. Mueller",
        date: "2024-01-15",
      },
      {
        courseId: "MED102",
        courseName: "Physiology",
        courseCode: "MED102",
        credits: 3,
        grade: "B+",
        points: 1.7,
        semester: "Spring 2024",
        instructor: "Dr. Schmidt",
        date: "2024-01-12",
      },
      {
        courseId: "MED104",
        courseName: "Medical Ethics",
        courseCode: "MED104",
        credits: 2,
        grade: "A",
        points: 1.0,
        semester: "Spring 2024",
        instructor: "Dr. Fischer",
        date: "2024-01-18",
      },
      {
        courseId: "MED105",
        courseName: "German Medical Terminology",
        courseCode: "MED105",
        credits: 2,
        grade: "B",
        points: 2.0,
        semester: "Spring 2024",
        instructor: "Dr. Hoffmann",
        date: "2024-01-20",
      },
      {
        courseId: "MED106",
        courseName: "Research Methods",
        courseCode: "MED106",
        credits: 4,
        grade: "A-",
        points: 1.3,
        semester: "Spring 2024",
        instructor: "Dr. Wagner",
        date: "2024-01-22",
      },
    ],
  },
  previousSemesters: [
    {
      name: "Fall 2023",
      gpa: 1.3,
      credits: 15,
      courses: [
        {
          courseId: "CHEM101",
          courseName: "General Chemistry",
          courseCode: "CHEM101",
          credits: 4,
          grade: "A",
          points: 1.0,
          semester: "Fall 2023",
          instructor: "Dr. Weber",
          date: "2023-12-15",
        },
        {
          courseId: "BIO101",
          courseName: "Biology Fundamentals",
          courseCode: "BIO101",
          credits: 3,
          grade: "A-",
          points: 1.3,
          semester: "Fall 2023",
          instructor: "Dr. Klein",
          date: "2023-12-12",
        },
        {
          courseId: "PHYS101",
          courseName: "Physics for Medicine",
          courseCode: "PHYS101",
          credits: 3,
          grade: "B+",
          points: 1.7,
          semester: "Fall 2023",
          instructor: "Dr. Braun",
          date: "2023-12-18",
        },
        {
          courseId: "MATH101",
          courseName: "Mathematics",
          courseCode: "MATH101",
          credits: 3,
          grade: "A",
          points: 1.0,
          semester: "Fall 2023",
          instructor: "Dr. Schwarz",
          date: "2023-12-20",
        },
        {
          courseId: "MED100",
          courseName: "Introduction to Medicine",
          courseCode: "MED100",
          credits: 2,
          grade: "A",
          points: 1.0,
          semester: "Fall 2023",
          instructor: "Dr. Mueller",
          date: "2023-12-22",
        },
      ],
    },
  ],
  overallStats: {
    totalCredits: 33,
    overallGPA: 1.35,
    completionRate: 18.3,
  },
}
