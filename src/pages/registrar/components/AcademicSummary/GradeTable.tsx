import React, { useMemo } from 'react';
import type { StudentSummary, CourseScore } from './types';

interface GradeTableProps {
  students: StudentSummary[];
}

const GradeTable: React.FC<GradeTableProps> = ({ students }) => {
  // Extract unique courses across all students in this report
  const uniqueCourses = useMemo(() => {
    const courseMap = new Map<string, string>();
    students.forEach((student) => {
      student.courses.forEach((course) => {
        if (!courseMap.has(course.courseCode)) {
          courseMap.set(course.courseCode, course.courseName);
        }
      });
    });

    return Array.from(courseMap.entries()).map(([code, name]) => ({
      code,
      name,
    }));
  }, [students]);

  return (
    <div className="overflow-x-auto rounded-md shadow-md border border-purple-500 dark:border-purple-700 bg-white dark:bg-gray-800">
      <table className="w-full border-collapse text-[11px] text-center dark:text-gray-100">
        <thead>
          {/* Main Subject Header Row */}
          <tr>
            <th rowSpan={2} className="border border-purple-500 px-2 py-1 bg-amber-600 text-white font-bold whitespace-nowrap min-w-[120px]">
              Student ID
            </th>
            {uniqueCourses.map((course) => (
              <th
                key={course.code}
                colSpan={2}
                className="border border-purple-500 px-1 py-1 bg-amber-600 dark:bg-amber-700 text-white font-bold min-w-[100px]"
                title={course.name}
              >
                {course.name}
              </th>
            ))}
            <th rowSpan={2} className="border border-purple-500 px-1 py-1 bg-amber-600 dark:bg-amber-700 text-white font-bold whitespace-nowrap">
              SGPA
            </th>
            <th rowSpan={2} className="border border-purple-500 px-1 py-1 bg-amber-600 dark:bg-amber-700 text-white font-bold whitespace-nowrap">
              SGPA Ltr
            </th>
            <th rowSpan={2} className="border border-purple-500 px-1 py-1 bg-amber-600 dark:bg-amber-700 text-white font-bold whitespace-nowrap">
              SCGPA
            </th>
            <th rowSpan={2} className="border border-purple-500 px-1 py-1 bg-amber-600 dark:bg-amber-700 text-white font-bold whitespace-nowrap">
              SCGPA Ltr
            </th>
            <th rowSpan={2} className="border border-purple-500 px-1 py-1 bg-amber-600 dark:bg-amber-700 text-white font-bold whitespace-nowrap">
              Prev CGPA
            </th>
            <th rowSpan={2} className="border border-purple-500 px-1 py-1 bg-amber-600 dark:bg-amber-700 text-white font-bold whitespace-nowrap">
              Prev Ltr
            </th>
            <th rowSpan={2} className="border border-purple-500 px-1 py-1 bg-amber-600 dark:bg-amber-700 text-white font-bold whitespace-nowrap">
              Status
            </th>
          </tr>

          {/* Sub Header Row for Score/Grade */}
          <tr>
            {uniqueCourses.map((course) => (
              <React.Fragment key={`${course.code}-sub`}>
                <th className="border border-purple-500 px-1 py-1 bg-slate-500 dark:bg-slate-600 text-white">Score</th>
                <th className="border border-purple-500 px-1 py-1 bg-slate-500 dark:bg-slate-600 text-white">Grade</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.studentId} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"}>
              <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium text-left">
                {student.studentId}
                {student.firstName && ` - ${student.firstName} ${student.lastName || ''}`}
              </td>

              {uniqueCourses.map((course) => {
                const studentCourse = student.courses.find(c => c.courseCode === course.code);
                return (
                  <React.Fragment key={`${student.studentId}-${course.code}`}>
                    <td className="border border-gray-300 dark:border-gray-600 px-1 py-1">
                      {studentCourse?.score !== undefined ? studentCourse.score : '-'}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 font-semibold">
                      {studentCourse?.letterGrade || '-'}
                    </td>
                  </React.Fragment>
                );
              })}

              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 font-semibold">{student.semesterGPA?.toFixed(2) || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 font-bold">{student.semesterGPALetter || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 font-semibold">{student.semesterCGPA?.toFixed(2) || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 font-bold">{student.semesterCGPALetter || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 text-gray-600 dark:text-gray-400">{student.previousCGPA?.toFixed(2) || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 text-gray-600 dark:text-gray-400">{student.previousCGPALetter || '-'}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 font-bold whitespace-nowrap">
                <span className={student.status?.toUpperCase() === 'PASSED' ? 'text-green-600 dark:text-green-400' : student.status?.toUpperCase() === 'FAILED' ? 'text-red-600 dark:text-red-400' : ''}>
                  {student.status || '-'}
                </span>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={uniqueCourses.length * 2 + 8} className="py-4 text-center text-gray-500">
                No student records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;
