// EditableTable.tsx
import React, { useState } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

export interface DataTypes {
  key: string;
  name: string;
  year: number;
  address: string;
  photo: string;
}

interface EditableTableProps {
  initialData: DataTypes[];
}

const EditableTable: React.FC<EditableTableProps> = ({ initialData }) => {
  const [data] = useState<DataTypes[]>(initialData);
  const navigate = useNavigate();

  const columns = [
    { title: "Name", dataIndex: "name", width: "20%" },
    { title: "Year", dataIndex: "year", width: "15%" },
    { title: "Department", dataIndex: "address", width: "25%" },
    {
      title: "Photo",
      dataIndex: "photo",
      width: "20%",
      render: (text: string) =>
        text ? (
          <img
            src={text}
            alt="student"
            className="w-16 h-16 object-cover rounded-full border border-gray-300 dark:border-gray-600"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 text-sm">
            No Photo
          </div>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: DataTypes) => (
        <Button
          type="primary"
          onClick={() => navigate(`/student/${record.key}`)}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
      <Table<DataTypes>
        dataSource={data}
        columns={columns}
        rowKey="key"
        bordered={false}
        className="min-w-full bg-gray-100 dark:bg-gray-800"
        rowClassName={() =>
          "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        } // rows background
        components={{
          header: {
            row: (props) => (
              <tr
                {...props}
                className="bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-100 text-left"
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default EditableTable;
