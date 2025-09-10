import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Stethoscope,
  HeartPulse,
  Pill,
} from "lucide-react";
import apiService from "@/components/api/apiService";
import endPoints from "@/components/api/endPoints";

interface Department {
  dptID: number;
  deptName: string;
  totalCrHr: number | null;
  departmentCode: string;
  icon: React.ReactNode;
  color: string;
}

// ✅ Fake data (mocked departments)
const fakeDepartments: Department[] = [
  {
    dptID: 1,
    deptName: "Nursing",
    totalCrHr: 120,
    departmentCode: "NUR",
    icon: <HeartPulse className="w-10 h-10" />,
    color: "from-green-500 to-emerald-600",
  },
  {
    dptID: 2,
    deptName: "Medicine",
    totalCrHr: 180,
    departmentCode: "MED",
    icon: <Stethoscope className="w-10 h-10" />,
    color: "from-red-500 to-pink-600",
  },
  {
    dptID: 3,
    deptName: "Computer Science",
    totalCrHr: 140,
    departmentCode: "CS",
    icon: <BookOpen className="w-10 h-10" />,
    color: "from-indigo-500 to-purple-600",
  },
];

export default function RegistrarDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // For now: load fake data
    setDepartments(fakeDepartments);

    //Later: replace with API
    const getter = async () => {
      try {
        const response = await apiService.get(endPoints.departments);
        setDepartments(response);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    getter();
  }, []);

  return (
    <div className="space-y-12 px-8 py-8">
      {/* Hero Section */}
      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 p-10 shadow-xl">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Department Management
        </h1>
        <p className="text-white mt-2 text-lg drop-shadow-md">
          Manage all academic departments and their courses
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
        {departments.map((dept) => (
          <div
            key={dept.dptID}
            onClick={() =>
              navigate(`/registrar/departments/${dept.departmentCode}`)
            }
            className={`cursor-pointer h-62 rounded-3xl p-6 shadow-xl bg-gradient-to-r from-blue-500 to-blue-800 text-white flex flex-col justify-between transform hover:-translate-y-2 hover:shadow-2xl transition`}
          >
            <div className="flex items-center  gap-4">
              {dept.icon}
              <h2 className="text-2xl font-extrabold">{dept.deptName}</h2>
            </div>
            <div className="space-y-1">
              <p className="text-lg">📌 ID: {dept.dptID}</p>
              <p className="text-lg">🏷 Code: {dept.departmentCode}</p>
              <p className="text-lg">
                🎓 Total Credits:{" "}
                {dept.totalCrHr !== null ? dept.totalCrHr : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import React from "react";

// const RegistrarDepartments = () => {
//   return (
//     <div className="font-sans">
//       {/* Header Top */}
//       <div className="bg-white py-2 text-sm text-gray-600 flex justify-end px-6 items-center space-x-6 border-b">
//         <span>Help Desk</span>
//         <span>Emergency Services</span>
//         <span>Appointment</span>
//         <span className="flex items-center space-x-1">
//           <svg
//             className="w-4 h-4 text-green-600"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M2 5.5a3 3 0 013-3h10a3 3 0 013 3v9a3 3 0 01-3 3H5a3 3 0 01-3-3v-9z" />
//           </svg>
//           <span>+34 586 778 8892</span>
//         </span>
//       </div>

//       {/* Navbar */}
//       <nav className="bg-green-500 text-white px-6 py-4 flex items-center justify-between">
//         <div className="font-bold text-xl">HEALTH+</div>
//         <ul className="hidden md:flex space-x-6">
//           <li className="hover:text-gray-200 cursor-pointer">HOME</li>
//           <li className="hover:text-gray-200 cursor-pointer">ABOUT US</li>
//           <li className="hover:text-gray-200 cursor-pointer">SERVICES</li>
//           <li className="hover:text-gray-200 cursor-pointer">NEWS</li>
//           <li className="hover:text-gray-200 cursor-pointer">CONTACT</li>
//         </ul>
//         <div className="hidden md:block">
//           <input
//             type="text"
//             placeholder="Search"
//             className="px-2 py-1 rounded text-black"
//           />
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative bg-gray-100">
//         <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
//           {/* Text */}
//           <div className="md:w-1/2 text-center md:text-left">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//               Medical Services that you can trust
//             </h1>
//             <p className="mt-4 text-gray-700">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//               malesuada lorem maximus mauris scelerisque, at rutrum nulla
//               dictum. Ut ac ligula sapien.
//             </p>
//             <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
//               READ MORE
//             </button>
//           </div>

//           {/* Image */}
//           <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
//             <img
//               src="/path-to-doctor-image.jpg" // replace with your own image
//               alt="Doctor"
//               className="w-full max-w-md rounded shadow-lg"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Example Services Section */}
//       <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
//         <div className="bg-white rounded shadow p-6 text-center">
//           <h3 className="font-bold text-xl mb-2">Service 1</h3>
//           <p className="text-gray-600">Description of Service 1</p>
//         </div>
//         <div className="bg-white rounded shadow p-6 text-center">
//           <h3 className="font-bold text-xl mb-2">Service 2</h3>
//           <p className="text-gray-600">Description of Service 2</p>
//         </div>
//         <div className="bg-white rounded shadow p-6 text-center">
//           <h3 className="font-bold text-xl mb-2">Service 3</h3>
//           <p className="text-gray-600">Description of Service 3</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default RegistrarDepartments;
