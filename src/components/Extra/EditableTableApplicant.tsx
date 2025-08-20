// Table component
import React from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface DataTypes {
  key: string;
  name: string;
  year: number;
  id: string;
  status: string;
  AdmissionType: string;
  photo?: string;
}

interface EditableTableProps {
  initialData: DataTypes[];
}

const EditableTableApplicant: React.FC<EditableTableProps> = ({
  initialData,
}) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<{ [key: string]: boolean }>({});
  const columns = [
    { title: "ID", dataIndex: "id", width: "15%" },
    { title: "Name", dataIndex: "name", width: "15%" },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (text: string) => (
        <span
          className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${
              text === "M"
                ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                : ""
            }
            ${
              text === "F"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                : ""
            }
          `}
        >
          {text}
        </span>
      ),
    },
    { title: "AdmissionType", dataIndex: "AdmissionType", width: "15%" },
    {
      title: "Photo",
      dataIndex: "photo",
      width: "16%",
      render: (text: string) =>
        text ? (
          <img
            src={text}
            alt="student"
            className="w-25 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
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
    {
      title: "Activity",
      dataIndex: "action",
      render: (_: any, record: DataTypes) => (
        <span
          onClick={() =>
            setToggle((prev) => ({ ...prev, [record.key]: !prev[record.key] }))
          }
        >
          {toggle[record.key] ? (
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 1024 1024"
              class="icon"
              version="1.1"
              //  xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M511.501463 1023.000976C229.476878 1023.000976 0.000976 793.525073 0.000976 511.500488S229.476878 0 511.501463 0s511.500488 229.475902 511.500488 511.500488-229.475902 511.500488-511.500488 511.500488z m0-937.784196C276.431024 85.21678 85.217756 276.430049 85.217756 511.500488S276.431024 937.784195 511.501463 937.784195 937.785171 746.570927 937.785171 511.500488 746.571902 85.21678 511.501463 85.21678z"
                fill="#3688FF"
              />
              <path
                d="M394.315902 682.033951c-23.576976 0-42.658341-19.081366-42.658341-42.658341V383.625366c0-23.576976 19.081366-42.658341 42.658341-42.658342s42.658341 19.081366 42.658342 42.658342v255.750244c-0.099902 23.576976-19.181268 42.658341-42.658342 42.658341zM628.687024 682.033951c-23.576976 0-42.658341-19.081366-42.658341-42.658341V383.625366c0-23.576976 19.081366-42.658341 42.658341-42.658342S671.345366 360.04839 671.345366 383.625366v255.750244c0 23.576976-19.081366 42.658341-42.658342 42.658341z"
                fill="#5F6379"
              />
            </svg>
          ) : (
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 117 117"
              version="1.1"
              // xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title />

              <desc />

              <defs />

              <g
                fill="none"
                fill-rule="evenodd"
                id="Page-1"
                stroke="none"
                stroke-width="1"
              >
                <g fill-rule="nonzero" id="play-button">
                  <path
                    d="M58.5,116.7 C90.6,116.7 116.7,90.6 116.7,58.5 C116.7,26.4 90.6,0.3 58.5,0.3 C26.4,0.3 0.3,26.4 0.3,58.5 C0.3,90.6 26.4,116.7 58.5,116.7 Z M58.5,8.5 C86.1,8.5 108.5,30.9 108.5,58.5 C108.5,86.1 86.1,108.5 58.5,108.5 C30.9,108.5 8.5,86 8.5,58.5 C8.5,31 30.9,8.5 58.5,8.5 Z"
                    fill="#4A4A4A"
                    id="Shape"
                  />

                  <path
                    d="M47.1,88.5 C47.6,88.7 48.1,88.8 48.7,88.8 C49.8,88.8 50.8,88.4 51.6,87.6 L78,61.1 C78.8,60.3 79.2,59.3 79.2,58.2 C79.2,57.1 78.8,56 78,55.3 L51.5,28.8 C50.3,27.6 48.6,27.3 47,27.9 C45.5,28.5 44.5,30 44.5,31.7 L44.5,84.7 C44.5,86.3 45.5,87.8 47.1,88.5 Z M52.7,41.6 L69.3,58.2 L52.7,74.8 L52.7,41.6 Z"
                    fill="#17AB13"
                    id="Shape"
                  />
                </g>
              </g>
            </svg>
          )}
        </span>
      ),
    },
  ];

  return (
    <Table<DataTypes>
      dataSource={initialData}
      columns={columns}
      rowKey={(record, index) => `${record.key}-${index}`}
      bordered={false}
      className="min-w-full bg-gray-100 dark:bg-gray-800"
      rowClassName={() =>
        "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      }
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
  );
};

export default EditableTableApplicant;
