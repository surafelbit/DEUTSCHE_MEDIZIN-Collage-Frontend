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
    name: "captain 189",
    year: 32,
    id: "South Park no. 1",
    status: "M",
    AdmissionType: "Regular",

    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "2",
    name: "stu 2",
    year: 42,
    status: "F",
    AdmissionType: "Regular",

    id: "London Park no. 2",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "3",
    name: "Edward 3",
    year: 28,
    status: "M",
    AdmissionType: "Regular",

    id: "London Park no. 3",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "4",
    name: "Edward 1",
    year: 32,
    id: "London Park no. 1",
    status: "M",
    AdmissionType: "Regular",

    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "5",
    name: "Edward 2",
    year: 42,
    status: "F",
    AdmissionType: "Regular",

    id: "London Park no. 2",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "6",
    name: "Edward 3",
    year: 28,
    status: "M",
    AdmissionType: "Regular",

    id: "London Park no. 3",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "7",
    name: "Edward 2",
    year: 42,
    status: "F",
    id: "London Park no. 2",
    AdmissionType: "Regular",

    photo: "https://i.pravatar.cc/150?img=1",
  },

  {
    key: "8",
    name: "Edward 1",
    year: 32,
    id: "London Park no. 1",
    status: "M",
    AdmissionType: "Regular",

    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "9",
    name: "Edward 2",
    year: 42,
    status: "F",
    AdmissionType: "Regular",

    id: "London Park no. 2",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "10",
    name: "Edward 3",
    year: 28,
    status: "M",
    AdmissionType: "Regular",

    id: "London Park no. 3",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "11",
    name: "Edward 1",
    year: 32,
    id: "London Park no. 1",
    status: "M",
    AdmissionType: "Regular",

    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "12",
    name: "Edward 2",
    year: 42,
    status: "F",
    AdmissionType: "Regular",

    id: "London Park no. 2",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "13",
    name: "Edward 3",
    year: 28,
    status: "M",
    AdmissionType: "Regular",

    id: "London Park no. 3",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "14",
    name: "Edward 1",
    year: 32,
    id: "London Park no. 1",
    status: "M",
    AdmissionType: "Regular",

    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "15",
    name: "Edward 2",
    year: 42,
    status: "F",
    AdmissionType: "Regular",

    id: "London Park no. 2",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  {
    key: "16",
    name: "Edward 3",
    year: 28,
    status: "M",
    AdmissionType: "Regular",

    id: "London Park no. 3",
    photo: "https://i.pravatar.cc/150?img=1",
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

export default function RegistrarStudents() {
  const [filters, setFilters] = useState({
    department: "",
    batch: "",
    year: "",
  });
  const [searchText, setSearchText] = useState("");

  const filteredData = initialData.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.name?.toString().toLowerCase().includes(search) ||
      item.AdmissionType?.toString().toLowerCase().includes(search)
    );
  });
  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Student Records</h1>
        <Card>
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>Manage student academic records</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Student records interface will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
      {/* <div>
        <ul>
          {allStudents.length > 0 &&
            allStudents.map((e) => {
              return (
                <li key={e.id}>
                  <div className="flex align-item">
                    <div>
                      <img src={e.avatar} />
                    </div>
                    <div>
                      <p>{e.batch}</p>
                    </div>
                    <div>
                      <p>{e.name}</p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div> */}
      <div style={{ padding: 20 }}>
        <h2>My Team Table</h2>
        {/* <ReusableTable columns={columns} data={datas} /> */}
        <div className="flex flex-wrap my-3 gap-4 items-center">
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            value={filters.department}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
          >
            <option value="">All Departments</option>
            <option value="CS">Computer Science</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ME">Mechanical Engineering</option>
          </select>

          <select
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            value={filters.batch}
            onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
          >
            <option value="">All Batches</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>

          <select
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">All Years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="🔍 Search students..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-72 mb-4 rounded-lg border border-gray-300 p-2"
        />
        <EditableTableApplicant initialData={filteredData} />
        {/* <SalesTable /> */}
      </div>
    </div>
  );
}
