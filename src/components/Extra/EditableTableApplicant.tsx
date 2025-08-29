// Table component
import React from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useModal } from "@/hooks/Modal";
import { ImageModal } from "@/hooks/ImageModal";
import { GlobalOutlined } from "@ant-design/icons";

export interface DataTypes {
  key: string;
  name: string;
  amharicName: string;
  year: number;
  id: string;
  status: string;
  department: string;
  photo?: string;
  batch: string;
}

interface EditableTableProps {
  initialData: DataTypes[];
}

const EditableTableApplicant: React.FC<EditableTableProps> = ({
  initialData,
}) => {
  const { openModal } = useModal();
  const [showAmharic, setShowAmharic] = useState(false);

  const navigate = useNavigate();
  const [toggle, setToggle] = useState<{ [key: string]: boolean }>({});
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      width: "16%",
      render: (text: string) =>
        text ? (
          <img
            src={text}
            onClick={(e) => {
              openModal(<ImageModal imageSrc={text} />);
              e.stopPropagation();
            }}
            alt="student"
            className="w-25 h-20 hover:cursor-pointer object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 text-sm">
            No Photo
          </div>
        ),
    },
    { title: "ID", dataIndex: "id", width: "12%" },
    {
      title: (
        <div className="flex items-center gap-2">
          Name
          <svg
            onClick={() => setShowAmharic((prev) => !prev)}
            width="30px"
            height="30px"
            className="hover:cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.58 19.37L17.59 11.01C17.38 10.46 16.91 10.12 16.37 10.12C15.83 10.12 15.37 10.46 15.14 11.03L12.16 19.37C12.02 19.76 12.22 20.19 12.61 20.33C13 20.47 13.43 20.27 13.57 19.88L14.19 18.15H18.54L19.16 19.88C19.27 20.19 19.56 20.38 19.87 20.38C19.95 20.38 20.04 20.37 20.12 20.34C20.51 20.2 20.71 19.77 20.57 19.38L20.58 19.37ZM14.74 16.64L16.38 12.05L18.02 16.64H14.74ZM12.19 7.85C9.92999 11.42 7.89 13.58 5.41 15.02C5.29 15.09 5.16 15.12 5.04 15.12C4.78 15.12 4.53 14.99 4.39 14.75C4.18 14.39 4.3 13.93 4.66 13.73C6.75999 12.51 8.48 10.76 10.41 7.86H4.12C3.71 7.86 3.37 7.52 3.37 7.11C3.37 6.7 3.71 6.36 4.12 6.36H7.87V4.38C7.87 3.97 8.21 3.63 8.62 3.63C9.02999 3.63 9.37 3.97 9.37 4.38V6.36H13.12C13.53 6.36 13.87 6.7 13.87 7.11C13.87 7.52 13.53 7.86 13.12 7.86H12.18L12.19 7.85ZM12.23 15.12C12.1 15.12 11.97 15.09 11.85 15.02C11.2 14.64 10.57 14.22 9.97999 13.78C9.64999 13.53 9.58 13.06 9.83 12.73C10.08 12.4 10.55 12.33 10.88 12.58C11.42 12.99 12.01 13.37 12.61 13.72C12.97 13.93 13.09 14.39 12.88 14.75C12.74 14.99 12.49 15.12 12.23 15.12Z"
              fill="#000000"
            />
          </svg>
        </div>
      ),
      dataIndex: "name",
      width: "10%",
      render: (_: any, record: DataTypes) =>
        showAmharic ? record.amharicName : record.name,
    },

    {
      title: "Status",
      dataIndex: "status",
      width: "1%",
      render: (text: string) => (
        <span
          className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${
              text === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                : ""
            }
            ${
              text === "Graduated"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                : ""
            }
            ${
              text === "Suspended"
                ? "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                : ""
            }
            ${
              text === "Inactive"
                ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                : ""
            }
          `}
        >
          {text}
        </span>
      ),
    },
    { title: "Batch", dataIndex: "batch", width: "12%" },
    { title: "Department", dataIndex: "department", width: "11%" },

    // {
    //   title: "Action",
    //   dataIndex: "action",

    //   render: (_: any, record: DataTypes) => (
    //     <Button
    //       type="primary"
    //       onClick={() => navigate(`/student/${record.key}`)}
    //       className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    //     >
    //       Details
    //     </Button>
    //   ),
    // },
    {
      title: "Regulate Activity",
      dataIndex: "action",
      width: "7%",
      render: (_: any, record: DataTypes) => (
        <span
          onClick={(e) => {
            e.stopPropagation();

            // setToggle((prev) => ({ ...prev, [record.key]: !prev[record.key] }));
            openModal(
              <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-96">
                <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
                <p className="mb-6">
                  Do you really want to deactivate this user? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => console.log("Cancelled")}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => console.log("Deactivated")}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            );
          }}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            id="three-dots"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="_20x20_three-dots--grey"
              data-name="20x20/three-dots--grey"
              transform="translate(24) rotate(90)"
            >
              <rect id="Rectangle" width="24" height="24" fill="none" />
              <circle
                id="Oval"
                cx="1"
                cy="1"
                r="1"
                transform="translate(5 11)"
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="0.5"
              />
              <circle
                id="Oval-2"
                data-name="Oval"
                cx="1"
                cy="1"
                r="1"
                transform="translate(11 11)"
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="0.5"
              />
              <circle
                id="Oval-3"
                data-name="Oval"
                cx="1"
                cy="1"
                r="1"
                transform="translate(17 11)"
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="0.5"
              />
            </g>
          </svg>
        </span>
      ),
    },
  ];
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });
  return (
    <div>
      <Table<DataTypes>
        dataSource={initialData}
        columns={columns}
        rowKey={(record, index) => `${record.key}-${index}`}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, current: page, pageSize });
          },
          onShowSizeChange: (current, size) => {
            setPagination({ ...pagination, current, pageSize: size });
          },
        }}
        bordered={false}
        className="min-w-full bg-gray-100 dark:bg-gray-800"
        rowClassName={() =>
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        }
        onRow={(record) => {
          return {
            onClick: () => navigate(`/registrar/students/${record.key}`),
          };
        }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                className="
            bg-white dark:bg-gray-900 
            text-gray-900 dark:text-gray-100
            px-4 py-2 text-left
          "
              />
            ),
          },
          body: {
            row: (props) => (
              <tr
                {...props}
                className="
            bg-white dark:bg-gray-900 
            text-gray-900 dark:text-gray-100
            hover:bg-blue-200 dark:hover:bg-gray-600 
            transition-colors
            cursor-pointer
          "
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default EditableTableApplicant;
