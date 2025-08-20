import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Table, Button, Input } from "antd";
import { useState } from "react";
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
export default function RegistrarApplications() {
  const [searchText, setSearchText] = useState("");

  const filteredData = initialData.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.name?.toString().toLowerCase().includes(search) ||
      item.AdmissionType?.toString().toLowerCase().includes(search)
    );
  });
  return (
    <div className="space-y-6">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          <img
            src={
              "https://th.bing.com/th/id/R.54dfef73baa05b4e0fc8acc1ca5c3332?rik=9xnHF%2fxjlzTxfw&pid=ImgRaw&r=0"
            }
            className="absolute inset-0 w-full h-full object-fit"
          />
          <div className="relative z-10 p-6 space-y-6 text-white">
            <h1 className="text-3xl font-bold">Student Applications</h1>
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
                <CardDescription>
                  Review and process student applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Student applications interface will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
      <input
        type="text"
        placeholder="🔍 Search students..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-72 mb-4 rounded-lg border border-gray-300 p-2"
      />
      <EditableTableApplicant initialData={filteredData} />
    </div>
  );
}
