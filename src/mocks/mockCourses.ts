export interface Course {
  id: string
  name: string
  code: string
  credits: number
  semester: string
  instructor: string
  schedule: string
  room: string
  description: string
  progress?: number
  grade?: string
  status: "active" | "completed" | "upcoming"
}

export const mockCourses: Course[] = [
  {
    id: "MED101",
    name: "Human Anatomy",
    code: "MED101",
    credits: 4,
    semester: "Spring 2024",
    instructor: "Dr. Mueller",
    schedule: "Mon, Wed, Fri 9:00-10:30 AM",
    room: "Room 101",
    description: "Comprehensive study of human body structure and systems",
    progress: 65,
    grade: "A-",
    status: "active",
  },
  {
    id: "MED102",
    name: "Physiology",
    code: "MED102",
    credits: 3,
    semester: "Spring 2024",
    instructor: "Dr. Schmidt",
    schedule: "Tue, Thu 11:00-12:30 PM",
    room: "Room 205",
    description: "Study of body functions and physiological processes",
    progress: 58,
    grade: "B+",
    status: "active",
  },
  {
    id: "MED103",
    name: "Biochemistry",
    code: "MED103",
    credits: 3,
    semester: "Fall 2023",
    instructor: "Dr. Weber",
    schedule: "Completed",
    room: "Lab 3",
    description: "Chemical processes within living organisms",
    progress: 100,
    grade: "A",
    status: "completed",
  },
  {
    id: "MED104",
    name: "Medical Ethics",
    code: "MED104",
    credits: 2,
    semester: "Spring 2024",
    instructor: "Dr. Fischer",
    schedule: "Wed 2:00-4:00 PM",
    room: "Room 301",
    description: "Ethical principles and decision-making in medical practice",
    progress: 72,
    grade: "A",
    status: "active",
  },
  {
    id: "MED105",
    name: "German Medical Terminology",
    code: "MED105",
    credits: 2,
    semester: "Spring 2024",
    instructor: "Dr. Hoffmann",
    schedule: "Fri 10:00-12:00 PM",
    room: "Room 102",
    description: "Medical terminology in German language",
    progress: 45,
    grade: "B",
    status: "active",
  },
  {
    id: "MED106",
    name: "Research Methods",
    code: "MED106",
    credits: 4,
    semester: "Spring 2024",
    instructor: "Dr. Wagner",
    schedule: "Mon, Wed 3:00-4:30 PM",
    room: "Lab 1",
    description: "Introduction to medical research methodologies",
    progress: 38,
    grade: "A-",
    status: "active",
  },
]
