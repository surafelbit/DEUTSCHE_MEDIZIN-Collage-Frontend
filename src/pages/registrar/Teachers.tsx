import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
const columnss = [
  { name: "Username", field: "username" },
  { name: "First Name", field: "firstName" },
  { name: "Last Name", field: "lastName" },
  { name: "Email", field: "email" },
  { name: "Gender", field: "gender" },
  { name: "IP Address", field: "ipAddress" },
  { name: "Last Visited", field: "lastVisited" },
];
import { ReusableTable } from "../../components/Extra/ReusableTable";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import SalesTable from "@/components/Extra/SalesTable";
// import EditableTable, { DataTypes } from "@/components/Extra/EditableTable";
import EditableTableApplicant, {
  DataTypes,
} from "@/components/Extra/EditableTableApplicant";

const initialData: DataTypes[] = [
  {
    key: "1",
    name: "Surafel",
    batch: "1",
    amharicName: "ሱራፌል",
    year: 23,
    id: "Addis Park no. 1",
    status: "Active",
    department: "Pharmacy",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "2",
    name: "Mekdes",
    batch: "2",
    amharicName: "መቅደስ",
    year: 21,
    id: "Addis Park no. 2",
    status: "Active",
    department: "Medicine",
    photo: "https://i.pravatar.cc/150?img=2",
  },
  {
    key: "3",
    name: "Nahom",
    batch: "3",
    amharicName: "ናሆም",
    year: 25,
    id: "Addis Park no. 3",
    status: "Graduated",
    department: "Nurse",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  {
    key: "4",
    name: "Selam",
    amharicName: "ሰላም",
    batch: "4",
    year: 22,
    id: "Addis Park no. 4",
    status: "Active",
    department: "Pharmacy",
    photo: "https://i.pravatar.cc/150?img=4",
  },
  {
    key: "5",
    name: "Bereket",
    batch: "1",
    amharicName: "በረከት",
    year: 24,
    id: "Addis Park no. 5",
    status: "Suspended",
    department: "Medicine",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    key: "6",
    name: "Hana",
    amharicName: "ሐና",
    batch: "2",
    year: 20,
    id: "Addis Park no. 6",
    status: "Active",
    department: "Nurse",
    photo: "https://i.pravatar.cc/150?img=6",
  },
  {
    key: "7",
    name: "Samuel",
    amharicName: "ሳሙኤል",
    year: 27,
    batch: "3",
    id: "Addis Park no. 7",
    status: "Inactive",
    department: "Pharmacy",
    photo: "https://i.pravatar.cc/150?img=7",
  },
  {
    key: "8",
    name: "Mahi",
    amharicName: "ማሂ",
    batch: "4",
    year: 23,
    id: "Addis Park no. 8",
    status: "Active",
    department: "Medicine",
    photo: "https://i.pravatar.cc/150?img=8",
  },
  {
    key: "9",
    name: "Bethel",
    amharicName: "ቤተል",
    year: 22,
    batch: "1",
    id: "Addis Park no. 9",
    status: "Active",
    department: "Nurse",
    photo: "https://i.pravatar.cc/150?img=9",
  },
  {
    key: "10",
    name: "Yonatan",
    amharicName: "ዮናታን",
    batch: "2",
    year: 24,
    id: "Addis Park no. 10",
    status: "Active",
    department: "Pharmacy",
    photo: "https://i.pravatar.cc/150?img=10",
  },
  {
    key: "11",
    name: "Marta",
    amharicName: "ማርታ",
    batch: "3",
    year: 21,
    id: "Addis Park no. 11",
    status: "Inactive",
    department: "Medicine",
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    key: "12",
    name: "Eyob",
    amharicName: "ኢዮብ",
    batch: "4",
    year: 25,
    id: "Addis Park no. 12",
    status: "Active",
    department: "Nurse",
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    key: "13",
    name: "Mikiyas",
    amharicName: "ሚኪያስ",
    batch: "1",
    year: 23,
    id: "Addis Park no. 13",
    status: "Suspended",
    department: "Pharmacy",
    photo: "https://i.pravatar.cc/150?img=13",
  },
  {
    key: "14",
    name: "Rahel",
    amharicName: "ራሔል",
    batch: "2",
    year: 20,
    id: "Addis Park no. 14",
    status: "Active",
    department: "Medicine",
    photo: "https://i.pravatar.cc/150?img=14",
  },
  {
    key: "15",
    name: "Dawit",
    amharicName: "ዳዊት",
    batch: "3",
    year: 26,
    id: "Addis Park no. 15",
    status: "Graduated",
    department: "Nurse",
    photo: "https://i.pravatar.cc/150?img=15",
  },
  {
    key: "16",
    name: "Ruth",
    amharicName: "ሩት",
    batch: "4",
    year: 22,
    id: "Addis Park no. 16",
    status: "Active",
    department: "Pharmacy",
    photo: "https://i.pravatar.cc/150?img=16",
  },
  {
    key: "17",
    name: "Kidus",
    batch: "1",
    amharicName: "ቅዱስ",
    year: 24,
    id: "Addis Park no. 17",
    status: "Active",
    department: "Medicine",
    photo: "https://i.pravatar.cc/150?img=17",
  },
];

interface DataType {
  key: number;
  team: string;
  name: string;
  age: number;
  address: string;
  description?: string;
}
const columns: TableColumnsType<DataType> = [
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
    onCell: (__, index = 0) =>
      index % 2 === 0 ? { rowSpan: 2 } : { rowSpan: 0 },
    width: 100,
  },
  Table.EXPAND_COLUMN,
  { title: "Name", dataIndex: "name", key: "name", width: 150 },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Address", dataIndex: "address", key: "address" },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];
const datas: DataType[] = [
  {
    key: 1,
    team: "Team A",
    name: "John Brown",
    age: 32,
    address: "New York",
    description: "John is 32.",
  },
  {
    key: 2,
    team: "Team A",
    name: "Jim Green",
    age: 42,
    address: "London",
    description: "Jim is 42.",
  },
  {
    key: 3,
    team: "Team B",
    name: "Joe Black",
    age: 32,
    address: "Sydney",
    description: "Joe is 32.",
  },
];
const data = [
  {
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    gender: "Male",
    ipAddress: "192.168.1.1",
    lastVisited: "2025-08-18",
  },
  // Add more rows as needed
];
const allStudents = [
  {
    id: 1,
    name: "John Doe",
    batch: "Batch A",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    batch: "Batch B",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Mike Johnson",
    batch: "Batch C",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Emily Davis",
    batch: "Batch A",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Chris Brown",
    batch: "Batch B",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Sarah Lee",
    batch: "Batch D",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
];
export default function RegistrarTeachers() {
  const [filters, setFilters] = useState({
    department: "",
    batch: "",
    status: "",
  });
  const [searchText, setSearchText] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const filteredData = initialData.filter((item) => {
    const search = searchText.toLowerCase();
    const matchedStatus = filters.status ? filters.status == item.status : true;
    const matchedBatch = filters.batch ? filters.batch === item.batch : true;
    const matchedDeparment = filters.department
      ? filters.department == item.department
      : true;
    return (
      (item.name?.toString().toLowerCase().includes(search) ||
        item.amharicName?.toString().toLowerCase().includes(search) ||
        item.id?.toString().toLowerCase().includes(search) ||
        item.department?.toString().toLowerCase().includes(search)) &&
      matchedStatus &&
      matchedBatch &&
      matchedDeparment
    );
  });
  console.log(filters.status);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Blue Header */}
      <div className="w-full  bg-blue-500 h-90 px-8 flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold text-white">Student Records</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Registration
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              350,897
            </h2>
            <p className="text-green-500 text-sm mt-1">
              ↑ 3.48% Since last month
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              NEW Students
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              2,356
            </h2>
            <p className="text-red-500 text-sm mt-1">↓ 3.48% Since last week</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Graduation
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              924
            </h2>
            <p className="text-orange-500 text-sm mt-1">
              ↓ 1.10% Since yesterday
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Eduaction
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              49,65%
            </h2>
            <p className="text-green-500 text-sm mt-1">
              ↑ 12% Since last month
            </p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 px-8 py-10 -mt-24">
        <div className="rounded-3xl bg-gray-50 dark:bg-gray-900 p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {["department", "status", "batch"].map((filter) => (
              <select
                key={filter}
                onChange={(e) => {
                  console.log(e.target.value);
                  setFilters((prev) => ({ ...prev, [filter]: e.target.value }));
                }}
                className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200"
              >
                {filter === "department" && (
                  <>
                    <option value="">All Departments</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Nurse">Nurse</option>
                  </>
                )}
                {filter === "status" && (
                  <>
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Inactive">Inactive</option>
                  </>
                )}
                {filter === "batch" && (
                  <>
                    <option value="">All Years</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </>
                )}
              </select>
            ))}

            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="🔍 Search students..."
              className="w-full sm:w-72 md:w-96 mb-6 
               px-3 sm:px-4 md:px-5 
               py-2 sm:py-2.5 md:py-3
               text-sm sm:text-base md:text-lg
               rounded-2xl border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
               placeholder-gray-400 dark:placeholder-gray-500
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition-all duration-200 shadow-sm"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl  ">
            <EditableTableApplicant
              initialData={filteredData}
              className="min-w-full divide-y divide-gray-200 dark:divide-gray-700
                           transition-all duration-300"
            />
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
        .EditableTableApplicant tr:hover {
          background-color: rgba(59, 130, 246, 0.1);
          transition: background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
}
