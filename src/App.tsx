import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ForgotPasswordPage from "./pages/public/ForgotPasswordPage";
import MultiStepRegistrationForm from "./../src/registeration/MultiStepRegistrationForm";
import SigningUp from "./../src/registeration/SigningUp";
// Student Pages
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentGrades from "./pages/student/Grades";
import StudentPayments from "./pages/student/Payments";

// Teacher Pages
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherCourses from "./pages/teacher/Courses";
import TeacherStudents from "./pages/teacher/Students";
import TeacherAssessments from "./pages/teacher/Assessments";

// Department Head Pages
import HeadLayout from "./layouts/HeadLayout";
import HeadDashboard from "./pages/head/Dashboard";
import HeadStudents from "./pages/head/Students";
import HeadTeachers from "./pages/head/Teachers";
import HeadCourses from "./pages/head/Courses";
import HeadReports from "./pages/head/Reports";

// Registrar Pages
import RegistrarLayout from "./layouts/RegistrarLayout";
import RegistrarDashboard from "./pages/registrar/Dashboard";
import RegistrarApplications from "./pages/registrar/Applications";
import RegistrarDepartments from "./pages/registrar/Departments";
import RegistrarStudents from "./pages/registrar/Students";
import RegistrarCourses from "./pages/registrar/Courses";
import RegistrarAssessments from "./pages/registrar/Assessments";
import RegistrarBatches from "./pages/registrar/Batches";
import DepartmentDetail from "./pages/registrar/DepartmentDetail";
import StudentDetail from "./pages/registrar/StudentDetail";
import CustomStudentTable from "./pages/registrar/CustomStudentTable";
// Finance Pages
import FinanceLayout from "./layouts/FinanceLayout";
import FinanceDashboard from "./pages/finance/Dashboard";
import FinancePayments from "./pages/finance/Payments";
import FinanceHistory from "./pages/finance/History";
import FinanceReports from "./pages/finance/Reports";

// Dean Pages
import DeanLayout from "./layouts/DeanLayout";
import DeanDashboard from "./pages/dean/Dashboard";
import DeanStudents from "./pages/dean/Students";
import DeanGrades from "./pages/dean/Grades";
import DeanReports from "./pages/dean/Reports";

// Manager Pages
import ManagerLayout from "./layouts/ManagerLayout";
import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerReports from "./pages/manager/Reports";
import ManagerSettings from "./pages/manager/Settings";
import BatchUpdateTable from "./pages/registrar/BatchUpdateTable";
import TenColumnEditableTablePage from "./TenColumnEditableTablePage";
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="college-ui-theme">
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/login" element={<SigningUp />} />
          <Route path="/some" element={<TenColumnEditableTablePage />} />
          <Route path="/register" element={<MultiStepRegistrationForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="payments" element={<StudentPayments />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="students/:courseId" element={<TeacherStudents />} />
            <Route
              path="assessments/:courseId"
              element={<TeacherAssessments />}
            />
          </Route>

          {/* Department Head Routes */}
          <Route path="/head" element={<HeadLayout />}>
            <Route path="dashboard" element={<HeadDashboard />} />
            <Route path="students" element={<HeadStudents />} />
            <Route path="teachers" element={<HeadTeachers />} />
            <Route path="courses" element={<HeadCourses />} />
            <Route path="reports" element={<HeadReports />} />
          </Route>

          {/* Registrar Routes */}
          <Route path="/registrar" element={<RegistrarLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="departments" element={<RegistrarDepartments />} />
            <Route path="departments/:id" element={<DepartmentDetail />} />
            <Route path="applications/:id" element={<StudentDetail />} />
            <Route path="dashboard" element={<RegistrarDashboard />} />
            <Route path="applications" element={<RegistrarApplications />} />
            <Route path="students" element={<RegistrarStudents />} />
            <Route path="assessments" element={<RegistrarAssessments />} />
            <Route path="scores" element={<BatchUpdateTable />} />

            <Route path="batches" element={<RegistrarBatches />} />
            <Route path="tables" element={<CustomStudentTable />} />
          </Route>

          {/* Finance Routes */}
          <Route path="/finance" element={<FinanceLayout />}>
            <Route path="dashboard" element={<FinanceDashboard />} />
            <Route path="payments" element={<FinancePayments />} />
            <Route path="history" element={<FinanceHistory />} />
            <Route path="reports" element={<FinanceReports />} />
          </Route>

          {/* Dean Routes */}
          <Route path="/dean" element={<DeanLayout />}>
            <Route path="dashboard" element={<DeanDashboard />} />
            <Route path="students" element={<DeanStudents />} />
            <Route path="grades" element={<DeanGrades />} />
            <Route path="reports" element={<DeanReports />} />
          </Route>

          {/* Manager Routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="reports" element={<ManagerReports />} />
            <Route path="settings" element={<ManagerSettings />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
