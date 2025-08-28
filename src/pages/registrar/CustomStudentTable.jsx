// import React, { useState, useEffect } from "react";

// const CustomStudentTable = () => {
//   // Fake student data with many fields and nested entities
//   const fakeStudents = [
//     {
//       userId: 1,
//       firstNameENG: "John",
//       firstNameAMH: "ዮሐንስ",
//       fatherNameENG: "Michael",
//       fatherNameAMH: "ሚካኤል",
//       grandfatherNameENG: "David",
//       grandfatherNameAMH: "ዳቪድ",
//       motherNameENG: "Anna",
//       motherNameAMH: "አና",
//       motherFatherNameENG: "Samuel",
//       motherFatherNameAMH: "ሳሙኤል",
//       gender: "MALE",
//       age: 20,
//       phoneNumber: "0912345678",
//       dateOfBirthEC: "2014-05-10",
//       dateOfBirthGC: "2005-01-15",
//       placeOfBirthWoreda: { id: 1, name: "Woreda A" },
//       placeOfBirthZone: { id: 1, name: "Zone A" },
//       placeOfBirthRegion: { id: 1, name: "Region A" },
//       currentAddressWoreda: { id: 2, name: "Woreda B" },
//       currentAddressZone: { id: 2, name: "Zone B" },
//       currentAddressRegion: { id: 2, name: "Region B" },
//       email: "john@example.com",
//       maritalStatus: "SINGLE",
//       impairment: { id: 1, name: "None" },
//       schoolBackground: { id: 1, name: "High School" },
//       contactPersonFirstNameENG: "Peter",
//       contactPersonFirstNameAMH: "ፒተር",
//       contactPersonLastNameENG: "Smith",
//       contactPersonLastNameAMH: "ስሚት",
//       contactPersonPhoneNumber: "0911122233",
//       contactPersonRelation: "Uncle",
//       dateEnrolledEC: "2018-09-01",
//       dateEnrolledGC: "2018-09-11",
//       batchClassYearSemester: { id: 1, name: "2023 Fall" },
//       studentRecentBatch: { id: 1, name: "2023 Fall" },
//       studentRecentStatus: "ACTIVE",
//       departmentEnrolled: { id: 1, name: "Computer Science" },
//       studentRecentDepartment: { id: 1, name: "Computer Science" },
//       programModality: { id: 1, name: "Regular" },
//       isTransfer: false,
//       exitExamUserID: null,
//       exitExamScore: null,
//       isStudentPassExitExam: false,
//       documentStatus: "INCOMPLETE",
//       remark: "Missing some documents",
//     },
//     {
//       userId: 2,
//       firstNameENG: "Sara",
//       firstNameAMH: "ሳራ",
//       fatherNameENG: "Daniel",
//       fatherNameAMH: "ዳንኤል",
//       grandfatherNameENG: "Abel",
//       grandfatherNameAMH: "አቤል",
//       motherNameENG: "Martha",
//       motherNameAMH: "ማርታ",
//       motherFatherNameENG: "Joseph",
//       motherFatherNameAMH: "ጆሴፍ",
//       gender: "FEMALE",
//       age: 22,
//       phoneNumber: "0923456789",
//       dateOfBirthEC: "2012-11-15",
//       dateOfBirthGC: "2003-03-20",
//       placeOfBirthWoreda: { id: 2, name: "Woreda C" },
//       placeOfBirthZone: { id: 2, name: "Zone C" },
//       placeOfBirthRegion: { id: 2, name: "Region C" },
//       currentAddressWoreda: { id: 3, name: "Woreda D" },
//       currentAddressZone: { id: 3, name: "Zone D" },
//       currentAddressRegion: { id: 3, name: "Region D" },
//       email: "sara@example.com",
//       maritalStatus: "MARRIED",
//       impairment: { id: 1, name: "None" },
//       schoolBackground: { id: 1, name: "High School" },
//       contactPersonFirstNameENG: "Mary",
//       contactPersonFirstNameAMH: "ማሪ",
//       contactPersonLastNameENG: "Johnson",
//       contactPersonLastNameAMH: "ጆንሰን",
//       contactPersonPhoneNumber: "0922233344",
//       contactPersonRelation: "Mother",
//       dateEnrolledEC: "2017-09-01",
//       dateEnrolledGC: "2017-09-11",
//       batchClassYearSemester: { id: 2, name: "2023 Spring" },
//       studentRecentBatch: { id: 2, name: "2023 Spring" },
//       studentRecentStatus: "ACTIVE",
//       departmentEnrolled: { id: 2, name: "Mathematics" },
//       studentRecentDepartment: { id: 2, name: "Mathematics" },
//       programModality: { id: 2, name: "Distance" },
//       isTransfer: true,
//       exitExamUserID: "EX12345",
//       exitExamScore: 87.5,
//       isStudentPassExitExam: true,
//       documentStatus: "COMPLETE",
//       remark: "",
//     },
//     // You can add more students similarly...
//   ];

//   const [students, setStudents] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [selectedColumns, setSelectedColumns] = useState([]);

//   useEffect(() => {
//     setStudents(fakeStudents);

//     if (fakeStudents.length > 0) {
//       const keys = Object.keys(fakeStudents[0]);
//       setColumns(keys);
//       setSelectedColumns(keys); // default: show all
//     }
//   }, []);

//   const toggleColumn = (col) => {
//     if (selectedColumns.includes(col)) {
//       setSelectedColumns(selectedColumns.filter((c) => c !== col));
//     } else {
//       setSelectedColumns([...selectedColumns, col]);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Customizable Student Table</h1>

//       {/* Column Selection Panel */}
//       <div className="mb-6 border rounded-lg p-4 max-h-60 overflow-y-auto bg-gray-50">
//         <h2 className="font-semibold mb-2">Select Columns</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {columns.map((col) => (
//             <label
//               key={col}
//               className="flex items-center gap-2 p-2 bg-white rounded shadow-sm hover:bg-gray-100"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedColumns.includes(col)}
//                 onChange={() => toggleColumn(col)}
//                 className="form-checkbox h-4 w-4"
//               />
//               <span className="capitalize text-gray-700">{col}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 rounded-lg">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               {selectedColumns.map((col) => (
//                 <th
//                   key={col}
//                   className="border p-2 text-left uppercase text-sm tracking-wide"
//                 >
//                   {col.replace(/([A-Z])/g, " $1")}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.userId} className="hover:bg-gray-100">
//                 {selectedColumns.map((col) => (
//                   <td key={col} className="border p-2 text-sm">
//                     {student[col] === null || student[col] === undefined
//                       ? "-"
//                       : typeof student[col] === "object"
//                       ? student[col].name || JSON.stringify(student[col])
//                       : student[col]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CustomStudentTable;
import React, { useState } from "react";
import { motion } from "framer-motion";

const fakeStudents = [
  {
    userId: 1,
    firstNameENG: "John",
    firstNameAMH: "ዮሐንስ",
    fatherNameENG: "Michael",
    fatherNameAMH: "ሚካኤል",
    grandfatherNameENG: "David",
    grandfatherNameAMH: "ዳቪድ",
    motherNameENG: "Anna",
    motherNameAMH: "አና",
    motherFatherNameENG: "Samuel",
    motherFatherNameAMH: "ሳሙኤል",
    gender: "MALE",
    age: 20,
    phoneNumber: "0912345678",
    dateOfBirthEC: "2014-05-10",
    dateOfBirthGC: "2005-01-15",
    placeOfBirthWoreda: { id: 1, name: "Woreda A" },
    placeOfBirthZone: { id: 1, name: "Zone A" },
    placeOfBirthRegion: { id: 1, name: "Region A" },
    currentAddressWoreda: { id: 2, name: "Woreda B" },
    currentAddressZone: { id: 2, name: "Zone B" },
    currentAddressRegion: { id: 2, name: "Region B" },
    email: "john@example.com",
    maritalStatus: "SINGLE",
    impairment: { id: 1, name: "None" },
    schoolBackground: { id: 1, name: "High School" },
    contactPersonFirstNameENG: "Peter",
    contactPersonFirstNameAMH: "ፒተር",
    contactPersonLastNameENG: "Smith",
    contactPersonLastNameAMH: "ስሚት",
    contactPersonPhoneNumber: "0911122233",
    contactPersonRelation: "Uncle",
    dateEnrolledEC: "2018-09-01",
    dateEnrolledGC: "2018-09-11",
    batchClassYearSemester: { id: 1, name: "2023 Fall" },
    studentRecentBatch: { id: 1, name: "2023 Fall" },
    studentRecentStatus: "ACTIVE",
    departmentEnrolled: { id: 1, name: "Computer Science" },
    studentRecentDepartment: { id: 1, name: "Computer Science" },
    programModality: { id: 1, name: "Regular" },
    isTransfer: false,
    exitExamUserID: null,
    exitExamScore: null,
    isStudentPassExitExam: false,
    documentStatus: "INCOMPLETE",
    remark: "Missing some documents",
  },
  {
    userId: 2,
    firstNameENG: "Sara",
    firstNameAMH: "ሳራ",
    fatherNameENG: "Daniel",
    fatherNameAMH: "ዳንኤል",
    grandfatherNameENG: "Abel",
    grandfatherNameAMH: "አቤል",
    motherNameENG: "Martha",
    motherNameAMH: "ማርታ",
    motherFatherNameENG: "Joseph",
    motherFatherNameAMH: "ጆሴፍ",
    gender: "FEMALE",
    age: 22,
    phoneNumber: "0923456789",
    dateOfBirthEC: "2012-11-15",
    dateOfBirthGC: "2003-03-20",
    placeOfBirthWoreda: { id: 2, name: "Woreda C" },
    placeOfBirthZone: { id: 2, name: "Zone C" },
    placeOfBirthRegion: { id: 2, name: "Region C" },
    currentAddressWoreda: { id: 3, name: "Woreda D" },
    currentAddressZone: { id: 3, name: "Zone D" },
    currentAddressRegion: { id: 3, name: "Region D" },
    email: "sara@example.com",
    maritalStatus: "MARRIED",
    impairment: { id: 1, name: "None" },
    schoolBackground: { id: 1, name: "High School" },
    contactPersonFirstNameENG: "Mary",
    contactPersonFirstNameAMH: "ማሪ",
    contactPersonLastNameENG: "Johnson",
    contactPersonLastNameAMH: "ጆንሰን",
    contactPersonPhoneNumber: "0922233344",
    contactPersonRelation: "Mother",
    dateEnrolledEC: "2017-09-01",
    dateEnrolledGC: "2017-09-11",
    batchClassYearSemester: { id: 2, name: "2023 Spring" },
    studentRecentBatch: { id: 2, name: "2023 Spring" },
    studentRecentStatus: "ACTIVE",
    departmentEnrolled: { id: 2, name: "Mathematics" },
    studentRecentDepartment: { id: 2, name: "Mathematics" },
    programModality: { id: 2, name: "Distance" },
    isTransfer: true,
    exitExamUserID: "EX12345",
    exitExamScore: 87.5,
    isStudentPassExitExam: true,
    documentStatus: "COMPLETE",
    remark: "",
  },
];

const CustomStudentTable = () => {
  const allKeys = Object.keys(fakeStudents[0]);

  // Default visible columns (only a few)
  const defaultColumns = [
    "userId",
    "firstNameENG",
    "fatherNameENG",
    "gender",
    "age",
    "phoneNumber",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);

  // Collapse state
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchTerm, setSearchTerm] = useState();

  const toggleColumn = (key) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderCell = (student, key) => {
    const value = student[key];
    if (value && typeof value === "object") {
      return value.name || JSON.stringify(value);
    }
    return value?.toString() || "-";
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Customizable Student Table
      </h1>

      {/* Collapse toggle button */}
      <motion.button
        onClick={() => setIsCollapsed((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
      >
        {isCollapsed ? "Show Filters" : "Hide Filters"}
      </motion.button>

      {/* Info + checkboxes */}
      {!isCollapsed && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Select the columns below to filter what is shown in the table.
            </p>
            <div className="mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allKeys.map((key) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(key)}
                    onChange={() => toggleColumn(key)}
                    className="h-5 w-5 text-blue-600 dark:text-blue-400 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <span className="capitalize text-gray-700 dark:text-gray-300">
                    {key}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        </>
      )}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        />

        {/* Dropdowns */}
        <select
          // value={filters.impairment}
          // onChange={(e) =>
          //   setFilters((prev) => ({ ...prev, impairment: e.target.value }))
          // }
          className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="">All Impairments</option>
          <option value="visual">Visual</option>
          <option value="hearing">Hearing</option>
          <option value="physical">Physical</option>
        </select>

        <select
          // value={filters.batch}
          // onChange={(e) =>
          //   setFilters((prev) => ({ ...prev, batch: e.target.value }))
          // }
          className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="">All Batches</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>

        <select
          // value={filters.class}
          // onChange={(e) =>
          //   setFilters((prev) => ({ ...prev, class: e.target.value }))
          // }
          className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="">All Classes</option>
          <option value="A">Class A</option>
          <option value="B">Class B</option>
          <option value="C">Class C</option>
        </select>

        <select
          // value={filters.semester}
          // onChange={(e) =>
          //   setFilters((prev) => ({ ...prev, semester: e.target.value }))
          // }
          className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="">All Semesters</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
        </select>

        <select
          // value={filters.maritalStatus}
          // onChange={(e) =>
          //   setFilters((prev) => ({ ...prev, maritalStatus: e.target.value }))
          // }
          className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="">All Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>

      <div className="overflow-x-auto max-w-[960px] mx-auto">
        <table
          className="w-full table-auto border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg"
          role="grid"
          aria-label="Customizable Student Table"
        >
          <thead className="bg-blue-50 dark:bg-gray-700">
            <tr>
              {visibleColumns.map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-blue-600 dark:text-blue-400 font-semibold"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fakeStudents.map((student) => (
              <tr
                key={student.userId}
                className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                {visibleColumns.map((key) => (
                  <td
                    key={key}
                    className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {renderCell(student, key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomStudentTable;
