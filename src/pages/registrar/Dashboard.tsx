// "use client";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { Bar, Pie } from "react-chartjs-2";
// import Carousel from "@/components/Extra/Carousel";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// // Graph Data: New Applicants Per Program (Pie Chart)
// const programData = {
//   labels: ["Computer Science", "Business Management", "Engineering", "Law"],
//   datasets: [
//     {
//       label: "Applicants per Program",
//       data: [10, 5, 7, 3],
//       backgroundColor: ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"],
//     },
//   ],
// };

// // Graph Data: Applicants Over Last 7 Days (Bar Chart)
// const weeklyData = {
//   labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//   datasets: [
//     {
//       label: "New Applicants",
//       data: [2, 1, 3, 2, 4, 1, 3],
//       backgroundColor: "#3B82F6",
//     },
//   ],
// };

// // Example student data
// const allStudents = [
//   {
//     id: 1,
//     name: "John Doe",
//     batch: "Batch A",
//     avatar: "https://i.pravatar.cc/150?img=1",
//     gradePoints: 4.0,
//   },

//   {
//     id: 2,
//     name: "Jane Smith",
//     batch: "Batch B",
//     avatar: "https://i.pravatar.cc/150?img=2",
//     gradePoints: 3.5,
//   },
//   {
//     id: 3,
//     name: "Mike Johnson",
//     batch: "Batch C",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     gradePoints: 3.0,
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     batch: "Batch A",
//     avatar: "https://i.pravatar.cc/150?img=4",
//     gradePoints: 2.5,
//   },
//   {
//     id: 5,
//     name: "Chris Brown",
//     batch: "Batch B",
//     avatar: "https://i.pravatar.cc/150?img=5",
//     gradePoints: 2.0,
//   },
//   {
//     id: 6,
//     name: "Sarah Lee",
//     batch: "Batch D",
//     avatar: "https://i.pravatar.cc/150?img=6",
//     gradePoints: 1.5,
//   },
// ];

// const sampleApplicants = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     program: "Computer Science",
//     date: "Aug 15, 2025",
//   },
//   {
//     id: 2,
//     name: "Michael Lee",
//     program: "Business Management",
//     date: "Aug 14, 2025",
//   },
//   { id: 3, name: "Sophia Brown", program: "Engineering", date: "Aug 13, 2025" },
// ];
// const slideInfo = [
//   {
//     text: "This Is A",
//     name: "jack",
//     class: "Radiology",
//     image:
//       "https://tse4.mm.bing.net/th/id/OIP.vgUIJG3A2sRAxggrM8QAhwHaFl?rs=1&pid=ImgDetMain&o=7&rm=3",
//     grade: 4.0,
//   },
//   {
//     text: "This Is B",
//     name: "john",
//     class: "Pharmacist",
//     image:
//       "https://www.shutterstock.com/image-photo/dedicated-smiling-black-male-student-600w-2473972979.jpg",
//     grade: 3.99,
//   },
//   {
//     text: "This Is C",
//     name: "steve",
//     class: "Medicin",
//     image:
//       "https://tse2.mm.bing.net/th/id/OIP.yWEcKrKsF_TCDDzpA-8-PgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
//     grade: 3.98,
//   },
//   {
//     text: "This Is D",
//     name: "david",
//     class: "Medicin",
//     image:
//       "https://th.bing.com/th/id/OIP.qco33ZchxiNBJY4JEZz9nwHaE7?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
//     grade: 4.0,
//   },
// ];
// export default function RegistrarDashboard() {
//   const [randomStudents, setRandomStudents] = useState<typeof allStudents>([]);

//   useEffect(() => {
//     const shuffled = [...allStudents].sort(() => 0.5 - Math.random());
//     setRandomStudents(shuffled.slice(0, 5));
//   }, []);

//   return (
//     <div>
//       <div className="p-6 space-y-8">
//         <h1 className="text-2xl font-bold">Registrar Dashboard</h1>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="flex items-center gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900"
//         >
//           <motion.div
//             whileHover={{ scale: 1.15, rotate: 5 }}
//             className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
//           >
//             <svg
//               viewBox="0 0 24 24"
//               className="h-8 w-8"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M3 7l9-4 9 4-9 4-9-4z" />
//               <path d="M21 10l-9 4-9-4" />
//               <path d="M12 14v6" />
//             </svg>
//           </motion.div>

//           <div className="space-y-2">
//             <h2 className="text-2xl font-bold tracking-tight">
//               👋 Welcome, Registrar
//             </h2>
//             <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
//               You can manage and see students’ data, applications, and much more
//               here.
//             </p>
//           </div>
//         </motion.div>
//         {/* Horizontal Scroll Students */}
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         //className="flex items-center rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900"
//       >
//         <Carousel slides={slideInfo} />
//       </motion.div>
//       {/* <Carousel slides={["F", "G", "H", "I", "J"]} />
//       <Carousel slides={["K", "L", "M", "N", "O"]} /> */}
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">New Applicants</h2>
//         <Link
//           to="/registrar/applications"
//           className="text-lg font-medium text-blue-600 hover:text-purple-600 underline underline-offset-4 transition-colors"
//         >
//           Click to see more →
//         </Link>
//         <div>
//           <div className="flex space-x-4 overflow-x-auto pb-2">
//             {randomStudents.map((student) => (
//               <Card
//                 key={student.id}
//                 className="min-w-[33%] flex-shrink-0 rounded-2xl shadow-md"
//               >
//                 <CardContent className="flex flex-col items-center p-4">
//                   <img
//                     src={student.avatar}
//                     alt={student.name}
//                     className="w-24 h-24 rounded-full mb-2 object-cover"
//                   />

//                   <h3 className="font-semibold text-center">{student.name}</h3>
//                   <p className="text-gray-500 text-sm text-center">
//                     {student.batch}
//                   </p>

//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     ID: <span className="font-medium">{student.id}</span>
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Department:{" "}
//                     <span className="font-medium">{student.department}</span>
//                   </p>

//                   {/* Highlighted Grade Points */}
//                   <p className="mt-2 text-lg font-bold text-black dark:text-white">
//                     Grade Points: {student.gradePoints}
//                   </p>

//                   <Button variant="outline" size="sm" className="mt-2 w-full">
//                     View
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}

//             {/* See More Card */}
//             <div className="min-w-[33%] flex-shrink-0 flex items-center justify-center">
//               <Link to="/registrar/students">
//                 <Button variant="ghost" className="w-full h-32">
//                   See More
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h2 className="text-lg font-semibold mb-2">View Students Data</h2>
//         <Link
//           to="/registrar/students"
//           className="text-lg font-medium text-blue-600 hover:text-purple-600 underline underline-offset-4 transition-colors"
//         >
//           Click to see more →
//         </Link>
//         <div className="flex space-x-4 overflow-x-auto pb-2">
//           {randomStudents.map((student) => (
//             <Card
//               key={student.id}
//               className="min-w-[33%] flex-shrink-0 rounded-2xl shadow-md"
//             >
//               <CardContent className="flex flex-col items-center p-4">
//                 <img
//                   src={student.avatar}
//                   alt={student.name}
//                   className="w-24 h-24 rounded-full mb-2 object-cover"
//                 />
//                 <h3 className="font-semibold text-center">{student.name}</h3>
//                 <p className="text-gray-500 text-sm text-center">
//                   {student.batch}
//                 </p>
//                 <Button variant="outline" size="sm" className="mt-2 w-full">
//                   View
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}

//           {/* See More Card */}
//           <div className="min-w-[33%] flex-shrink-0 flex items-center justify-center">
//             <Link to="/registrar/students">
//               <Button variant="ghost" className="w-full h-32">
//                 See More
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="p-6 space-y-8">
//         <h2 className="text-3xl font-bold mb-4">Registrar Dashboard</h2>

//         {/* Sample New Applicants */}

//         {/* Graphs */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Pie Chart: Applicants per Program */}
//           <div className="bg-white rounded-xl shadow-md p-4">
//             <h3 className="text-xl font-semibold mb-2">
//               Applicants by Program
//             </h3>
//             <Pie data={programData} />
//           </div>

//           {/* Bar Chart: Weekly Applicants */}
//           <div className="bg-white rounded-xl shadow-md p-4">
//             <h3 className="text-xl font-semibold mb-2">
//               New Applicants This Week
//             </h3>
//             <Bar
//               data={weeklyData}
//               options={{
//                 responsive: true,
//                 plugins: { legend: { display: false } },
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bar, Pie, Line } from "react-chartjs-2";
import Carousel from "@/components/Extra/Carousel";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Graph Data: New Applicants Per Program (Pie Chart)
const programData = {
  labels: ["Computer Science", "Business Management", "Engineering", "Law"],
  datasets: [
    {
      label: "Applicants per Program",
      data: [10, 5, 7, 3],
      backgroundColor: ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"],
    },
  ],
};

// Graph Data: Applicants Over Last 7 Days (Bar Chart)
const weeklyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "New Applicants",
      data: [2, 1, 3, 2, 4, 1, 3],
      backgroundColor: "#3B82F6",
    },
  ],
};

// Graph Data: Enrollment Trends Over Months (Line Chart)
const enrollmentData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "Enrolled Students",
      data: [120, 130, 125, 140, 150, 145, 160, 170],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

// Example student data
const allStudents = [
  {
    id: 1,
    name: "John Doe",
    batch: "Batch A",
    avatar: "https://i.pravatar.cc/150?img=1",
    gradePoints: 4.0,
  },
  {
    id: 2,
    name: "Jane Smith",
    batch: "Batch B",
    avatar: "https://i.pravatar.cc/150?img=2",
    gradePoints: 3.5,
  },
  {
    id: 3,
    name: "Mike Johnson",
    batch: "Batch C",
    avatar: "https://i.pravatar.cc/150?img=3",
    gradePoints: 3.0,
  },
  {
    id: 4,
    name: "Emily Davis",
    batch: "Batch A",
    avatar: "https://i.pravatar.cc/150?img=4",
    gradePoints: 2.5,
  },
  {
    id: 5,
    name: "Chris Brown",
    batch: "Batch B",
    avatar: "https://i.pravatar.cc/150?img=5",
    gradePoints: 2.0,
  },
  {
    id: 6,
    name: "Sarah Lee",
    batch: "Batch D",
    avatar: "https://i.pravatar.cc/150?img=6",
    gradePoints: 1.5,
  },
];

const sampleApplicants = [
  {
    id: 1,
    name: "Alice Johnson",
    program: "Computer Science",
    date: "Aug 15, 2025",
  },
  {
    id: 2,
    name: "Michael Lee",
    program: "Business Management",
    date: "Aug 14, 2025",
  },
  { id: 3, name: "Sophia Brown", program: "Engineering", date: "Aug 13, 2025" },
];

// Recent Activity Data
const recentActivities = [
  {
    id: 1,
    action: "Application Submitted",
    name: "Alice Johnson",
    date: "Aug 15, 2025, 10:30 AM",
  },
  {
    id: 2,
    action: "Application Reviewed",
    name: "Michael Lee",
    date: "Aug 14, 2025, 2:15 PM",
  },
  {
    id: 3,
    action: "Student Enrolled",
    name: "Sophia Brown",
    date: "Aug 13, 2025, 9:00 AM",
  },
];

const slideInfo = [
  {
    text: "This Is A",
    name: "jack",
    class: "Radiology",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.vgUIJG3A2sRAxggrM8QAhwHaFl?rs=1&pid=ImgDetMain&o=7&rm=3",
    grade: 4.0,
  },
  {
    text: "This Is B",
    name: "john",
    class: "Pharmacist",
    image:
      "https://www.shutterstock.com/image-photo/dedicated-smiling-black-male-student-600w-2473972979.jpg",
    grade: 3.99,
  },
  {
    text: "This Is C",
    name: "steve",
    class: "Medicin",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.yWEcKrKsF_TCDDzpA-8-PgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    grade: 3.98,
  },
  {
    text: "This Is D",
    name: "david",
    class: "Medicin",
    image:
      "https://th.bing.com/th/id/OIP.qco33ZchxiNBJY4JEZz9nwHaE7?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    grade: 4.0,
  },
];

export default function RegistrarDashboard() {
  const [randomStudents, setRandomStudents] = useState<typeof allStudents>([]);

  useEffect(() => {
    const shuffled = [...allStudents].sort(() => 0.5 - Math.random());
    setRandomStudents(shuffled.slice(0, 5));
  }, []);

  // Calculate key metrics
  const totalStudents = allStudents.length;
  const totalApplicants = sampleApplicants.length;
  const averageGPA =
    allStudents.reduce((sum, student) => sum + student.gradePoints, 0) /
    totalStudents;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Registrar Dashboard
        </h1>
        <Button
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700"
        >
          Logout
        </Button>
      </header>

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Key Metrics Cards (Full Width) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                Total Students
              </h3>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {totalStudents}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                New Applicants
              </h3>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {totalApplicants}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                Average GPA
              </h3>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {averageGPA.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Section (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center gap-6 w-full"
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 7l9-4 9 4-9 4-9-4z" />
              <path d="M21 10l-9 4-9-4" />
              <path d="M12 14v6" />
            </svg>
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
              👋 Welcome, Registrar
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
              Manage and view students' data, applications, and analytics with
              ease.
            </p>
          </div>
        </motion.div>

        {/* Carousel (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <Carousel slides={slideInfo} />
        </motion.div>

        {/* Quick Actions Card (Half Width) */}
        <div className="w-full lg:w-1/2">
          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Add Student
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Review Applications
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Generate Report
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Update Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Applicants Section (Full Width) */}
        <div className="space-y-4 w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              New Applicants
            </h2>
            <Link
              to="/registrar/applications"
              className="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
            >
              Click to see more →
            </Link>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {sampleApplicants.map((applicant) => (
              <Card
                key={applicant.id}
                className="min-w-[33%] flex-shrink-0 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-center text-blue-600 dark:text-blue-400">
                    {applicant.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    {applicant.program}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Applied: {applicant.date}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700"
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
            <div className="min-w-[33%] flex-shrink-0 flex items-center justify-center">
              <Link to="/registrar/applications">
                <Button
                  variant="ghost"
                  className="w-full h-32 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                  See More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Students Section (Full Width) */}
        <div className="space-y-4 w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              View Students Data
            </h2>
            <Link
              to="/registrar/students"
              className="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
            >
              Click to see more →
            </Link>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {randomStudents.map((student) => (
              <Card
                key={student.id}
                className="min-w-[33%] flex-shrink-0 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <CardContent className="flex flex-col items-center p-4">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-24 h-24 rounded-full mb-2 object-cover"
                  />
                  <h3 className="font-semibold text-center text-blue-600 dark:text-blue-400">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    {student.batch}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ID: <span className="font-medium">{student.id}</span>
                  </p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
                    Grade Points: {student.gradePoints}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700"
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
            <div className="min-w-[33%] flex-shrink-0 flex items-center justify-center">
              <Link to="/registrar/students">
                <Button
                  variant="ghost"
                  className="w-full h-32 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                  See More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Table (Half Width) */}
        <div className="w-full lg:w-1/2">
          <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Recent Activity
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-600 dark:text-gray-400">
                      <th className="p-2">Action</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity) => (
                      <tr
                        key={activity.id}
                        className="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-2 text-blue-600 dark:text-blue-400">
                          {activity.action}
                        </td>
                        <td className="p-2 text-blue-600 dark:text-blue-400">
                          {activity.name}
                        </td>
                        <td className="p-2 text-gray-600 dark:text-gray-400">
                          {activity.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphs Section (Full Width) */}
        <div className="space-y-4 w-full">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pie Chart: Applicants per Program */}
            <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Applicants by Program
                </h3>
                <Pie data={programData} />
              </CardContent>
            </Card>

            {/* Bar Chart: Weekly Applicants */}
            <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  New Applicants This Week
                </h3>
                <Bar
                  data={weeklyData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                  }}
                />
              </CardContent>
            </Card>

            {/* Line Chart: Enrollment Trends */}
            <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Enrollment Trends
                </h3>
                <Line
                  data={enrollmentData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: true } },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
