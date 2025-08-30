import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Table, Button, Input } from "antd";
import useApi from "../../hooks/useApi";
import endPoints from "../../components/api/endPoints";
import { useState } from "react";
// import EditableTableApplicant, {
//   DataTypes,
// } from "@/components/Extra/EditableTableApplicant";
// import EditableTable, { DataTypes } from "@/components/Extra/EditableTable";
import EditableTableRejected, {
  DataTypes,
} from "@/components/Extra/EditableTableRejected";
import { init } from "node_modules/i18next";
const something = [
  {
    key: "1",
    name: "Surafel",
    amharicName: "ሱራፌል",
    department: "Medicine",

    year: 23,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=1",
  },
];
const initialData: DataTypes[] = [
  {
    key: "1",
    name: "Surafel",
    amharicName: "ሱራፌል",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "2",
    name: "Mekdes",
    amharicName: "መቅደስ",
    age: 1,
    registeredYear: 24,
    department: "Medicine",

    gender: "F",
    photo: "https://i.pravatar.cc/150?img=2",
  },
  {
    key: "3",
    name: "Nahom",
    amharicName: "ናሆም",
    age: 1,
    registeredYear: 24,
    department: "Medicine",

    gender: "M",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  {
    key: "4",
    name: "Selam",
    amharicName: "ሰላም",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "F",
    photo: "https://i.pravatar.cc/150?img=4",
  },
  {
    key: "5",
    name: "Bereket",
    amharicName: "በረከት",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    key: "6",
    name: "Hana",
    amharicName: "ሐና",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "F",
    photo: "https://i.pravatar.cc/150?img=6",
  },
  {
    key: "7",
    name: "Samuel",
    amharicName: "ሳሙኤል",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=7",
  },
  {
    key: "8",
    name: "Mahi",
    amharicName: "ማሂ",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "F",
    photo: "https://i.pravatar.cc/150?img=8",
  },
  {
    key: "9",
    name: "Bethel",
    amharicName: "ቤተል",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=9",
  },
  {
    key: "10",
    name: "Yonatan",
    amharicName: "ዮናታን",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=10",
  },
  {
    key: "11",
    name: "Marta",
    amharicName: "ማርታ",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "F",
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    key: "12",
    name: "Eyob",
    amharicName: "ኢዮብ",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    key: "13",
    name: "Mikiyas",
    amharicName: "ሚኪያስ",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=13",
  },
  {
    key: "14",
    name: "Rahel",
    amharicName: "ራሔል",
    department: "Medicine",

    age: 1,
    registeredYear: 24,
    gender: "F",
    photo: "https://i.pravatar.cc/150?img=14",
  },
  {
    key: "15",
    name: "Dawit",
    amharicName: "ዳዊት",
    age: 1,
    registeredYear: 24,
    department: "Medicine",

    gender: "M",
    photo: "https://i.pravatar.cc/150?img=15",
  },
  {
    key: "16",
    name: "Ruth",
    amharicName: "ሩት",
    age: 1,
    registeredYear: 24,
    department: "Medicine",

    gender: "F",
    photo: "https://i.pravatar.cc/150?img=16",
  },
  {
    key: "17",
    name: "Kidus",
    amharicName: "ቅዱስ",
    department: "Medicine",
    age: 1,
    registeredYear: 24,
    gender: "M",
    photo: "https://i.pravatar.cc/150?img=17",
  },
];
export default function RejectedApplications() {
  const [searchText, setSearchText] = useState("");
  const [filteredDepartment, setFilteredDepartment] = useState("");
  const filteredData = initialData.filter((item) => {
    const matchedDeparment = filteredDepartment
      ? item.department == filteredDepartment
      : true;
    const search = searchText.toLowerCase();
    return (
      item.name?.toString().toLowerCase().includes(search) && matchedDeparment
    );
  });

  return (
    <div className="min-h-screen space-y-4 sm:space-y-6">
      <div className="bg-white dark:bg-gray-900">
        {/* Blue Header */}
        <div className="w-full  bg-blue-500 px-4 h-40 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 w-full rounded-lg">
          <h1 className="text-2xl  sm:text-3xl md:text-4xl font-extrabold text-white">
            Rejected Applicants
          </h1>
        </div>
        {/* Content */}
        <div className="flex-1 px-4  sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 -mt-12 sm:-mt-16 md:-mt-20">
          <div className="rounded-3xl bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 p-4">
              <input
                type="text"
                placeholder="🔍 Search students..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full sm:w-64 md:w-72 lg:w-80 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base
                  rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
                  text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              />
              <select
                onChange={(e) => setFilteredDepartment(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm sm:text-base
                  focus:ring-2 focus:ring-blue-500 focus:border(border-blue-500 transition-all duration-200"
              >
                <option value="">All Departments</option>
                <option value="Medicine">Medicine</option>
                <option value="Nurse">Nurse</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>
            <div className="overflow-x-auto rounded-lg">
              {/* <EditableTable
                initialData={filteredData}
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 transition-all duration-300"
              /> */}
              <EditableTableRejected
                initialData={filteredData}
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-in-out forwards;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
