import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import apiService from "@/components/api/apiService";
import endPoints from "@/components/api/endPoints";
interface Batch {
  id: number;
  batchName: string;
}

const fakeBatches: Batch[] = [
  { id: 1, batchName: "Batch 1" },
  { id: 2, batchName: "Batch 2" },
  { id: 3, batchName: "Batch 3" },
  { id: 4, batchName: "Batch 4" },
  { id: 5, batchName: "Batch 5" },
];

export default function RegistrarBatches() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const getter = async () => {
      try {
        const response = await apiService.get(endPoints.batches);
        setBatches(response);
        console.log(response);
        // setBatches(fakeBatches);
      } catch (error) {
        console.error(error);
      }
    };
    getter();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Student Batches
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded-lg font-medium ${
              view === "grid"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded-lg font-medium ${
              view === "list"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Batches Display */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {batches.map((batch) => (
          <Card
            key={batch.id}
            className="hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700 bg-gradient-to-tr from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
          >
            <CardHeader className="flex justify-between items-center">
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #3b82f6)", // gradient blue
                }}
              >
                {batch.batchName.charAt(0)}
              </div>
              <CardTitle className="text-blue-600 dark:text-blue-400">
                {batch.batchName}
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                ID: {batch.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Manage and view all students in this batch.
              </p>
              <button className="px-4 py-1 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition text-sm">
                View Students
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
