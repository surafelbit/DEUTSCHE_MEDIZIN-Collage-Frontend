import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FlaskConical,
  Stethoscope,
  HeartPulse,
  Pill,
  Calculator,
} from "lucide-react";

interface Department {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const departments: Department[] = [
  {
    id: "cs",
    name: "Computer Science",
    description: "All CS related courses",
    icon: <BookOpen className="w-10 h-10" />,
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "math",
    name: "Mathematics",
    description: "All Math courses",
    icon: <Calculator className="w-10 h-10" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "phy",
    name: "Physics",
    description: "All Physics courses",
    icon: <FlaskConical className="w-10 h-10" />,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "med",
    name: "Medicine",
    description: "All Medicine courses",
    icon: <Stethoscope className="w-10 h-10" />,
    color: "from-red-500 to-pink-600",
  },
  {
    id: "nrs",
    name: "Nursing",
    description: "All Nursing courses",
    icon: <HeartPulse className="w-10 h-10" />,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "phr",
    name: "Pharmacist",
    description: "All Pharmacist courses",
    icon: <Pill className="w-10 h-10" />,
    color: "from-purple-500 to-fuchsia-600",
  },
];

export default function RegistrarDepartments() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

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
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-6 bg-white hover:bg-gray-100 text-blue-700 px-6 py-3 rounded-xl shadow-lg transition text-lg font-semibold"
        >
          {showForm ? "✖ Cancel" : "+ Create Department"}
        </button>
      </div>

      {/* Collapsible Create Form */}
      {showForm && (
        <div className="p-8 rounded-2xl shadow-lg border bg-white dark:bg-gray-800 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Create New Department
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Department Name
              </label>
              <input
                type="text"
                placeholder="e.g. Engineering"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Description
              </label>
              <textarea
                placeholder="Short description..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Save Department
            </button>
          </form>
        </div>
      )}

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {departments.map((dept) => (
          <div
            key={dept.id}
            // onClick={() => navigate(`/registrar/departments/${dept.id}`)}
            onClick={() => navigate(`/registrar/departments/math`)}
            className={`cursor-pointer h-48 rounded-3xl p-6 shadow-xl bg-gradient-to-r ${dept.color} text-white flex flex-col justify-between transform hover:-translate-y-2 hover:shadow-2xl transition`}
          >
            <div className="flex items-center gap-4">
              {dept.icon}
              <h2 className="text-3xl font-extrabold">{dept.name}</h2>
            </div>
            <p className="text-lg">{dept.description}</p>
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
