export interface CourseScore {
  courseCode: string;
  courseName: string;
  score: number | null;
  letterGrade: string | null;
}

export interface StudentSummary {
  studentId: string;
  firstName?: string;
  lastName?: string;
  courses: CourseScore[];
  semesterGPA: number | null;
  semesterCGPA: number | null;
  semesterGPALetter: string | null;
  semesterCGPALetter: string | null;
  previousCGPA: number | null;
  previousCGPALetter: string | null;
  status: string | null;
}

export interface ReportHeaderData {
  departmentBcysDisplay: string;
  batchName: string;
  departmentName: string;
  departmentCode: string;
  classYearName: string;
  semesterName: string;
  academicYear: {
    yearCode: string;
    yearGC: string;
  };
}

export interface ReportSummary {
  header: ReportHeaderData;
  students: StudentSummary[];
}

export interface AcademicSummaryResult {
  request: {
    departmentId: number;
    bcysId: number;
  };
  summary: ReportSummary | null;
  success: boolean;
  error: string | null;
}
