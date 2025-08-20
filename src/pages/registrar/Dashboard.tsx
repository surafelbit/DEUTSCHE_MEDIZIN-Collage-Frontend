"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import Carousel from "@/components/Extra/Carousel";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

  return (
    <div>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Registrar Dashboard</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900"
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
            <h2 className="text-2xl font-bold tracking-tight">
              👋 Welcome, Registrar
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
              You can manage and see students’ data, applications, and much more
              here.
            </p>
          </div>
        </motion.div>
        {/* Horizontal Scroll Students */}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        //className="flex items-center rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <Carousel slides={slideInfo} />
      </motion.div>
      {/* <Carousel slides={["F", "G", "H", "I", "J"]} />
      <Carousel slides={["K", "L", "M", "N", "O"]} /> */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">New Applicants</h2>
        <Link
          to="/registrar/applications"
          className="text-lg font-medium text-blue-600 hover:text-purple-600 underline underline-offset-4 transition-colors"
        >
          Click to see more →
        </Link>
        <div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {randomStudents.map((student) => (
              <Card
                key={student.id}
                className="min-w-[33%] flex-shrink-0 rounded-2xl shadow-md"
              >
                <CardContent className="flex flex-col items-center p-4">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-24 h-24 rounded-full mb-2 object-cover"
                  />

                  <h3 className="font-semibold text-center">{student.name}</h3>
                  <p className="text-gray-500 text-sm text-center">
                    {student.batch}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ID: <span className="font-medium">{student.id}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Department:{" "}
                    <span className="font-medium">{student.department}</span>
                  </p>

                  {/* Highlighted Grade Points */}
                  <p className="mt-2 text-lg font-bold text-black dark:text-white">
                    Grade Points: {student.gradePoints}
                  </p>

                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* See More Card */}
            <div className="min-w-[33%] flex-shrink-0 flex items-center justify-center">
              <Link to="/registrar/students">
                <Button variant="ghost" className="w-full h-32">
                  See More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">View Students Data</h2>
        <Link
          to="/registrar/students"
          className="text-lg font-medium text-blue-600 hover:text-purple-600 underline underline-offset-4 transition-colors"
        >
          Click to see more →
        </Link>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {randomStudents.map((student) => (
            <Card
              key={student.id}
              className="min-w-[33%] flex-shrink-0 rounded-2xl shadow-md"
            >
              <CardContent className="flex flex-col items-center p-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                <h3 className="font-semibold text-center">{student.name}</h3>
                <p className="text-gray-500 text-sm text-center">
                  {student.batch}
                </p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* See More Card */}
          <div className="min-w-[33%] flex-shrink-0 flex items-center justify-center">
            <Link to="/registrar/students">
              <Button variant="ghost" className="w-full h-32">
                See More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-8">
        <h2 className="text-3xl font-bold mb-4">Registrar Dashboard</h2>

        {/* Sample New Applicants */}

        {/* Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart: Applicants per Program */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">
              Applicants by Program
            </h3>
            <Pie data={programData} />
          </div>

          {/* Bar Chart: Weekly Applicants */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">
              New Applicants This Week
            </h3>
            <Bar
              data={weeklyData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
