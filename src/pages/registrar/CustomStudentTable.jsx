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
import * as XLSX from "xlsx";

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

  const filter = fakeStudents.map((el) => {
    return Object.fromEntries(
      Object.entries(el).filter(([key]) => visibleColumns.includes(key))
    );
  });
  console.log(filter);
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
  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(filter);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DynamicTable.xlsx");
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Customizable Student Table
      </h1>

      {/* Collapse toggle button */}
      <div className="flex justify-between">
        <motion.button
          onClick={() => setIsCollapsed((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          {isCollapsed ? "Show Filters" : "Hide Filters"}
        </motion.button>
        <motion.button
          onClick={exportToExcel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          {"Export Excel"}
        </motion.button>
      </div>
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

// import React, { useMemo, useState } from "react";

// // Full-page demo: Dynamic table with single-row edit & bulk edit
// // Tailwind CSS recommended for styling

// const initialStudents = [
//   {
//     userId: 1,
//     firstNameENG: "John",
//     firstNameAMH: "ዮሐንስ",
//     fatherNameENG: "Michael",
//     fatherNameAMH: "ሚካኤል",
//     grandfatherNameENG: "David",
//     grandfatherNameAMH: "ዳቪድ",
//     motherNameENG: "Anna",
//     motherNameAMH: "አና",
//     motherFatherNameENG: "Samuel",
//     motherFatherNameAMH: "ሳሙኤል",
//     gender: "MALE",
//     age: 20,
//     phoneNumber: "0912345678",
//     dateOfBirthEC: "2014-05-10",
//     dateOfBirthGC: "2005-01-15",
//     placeOfBirthWoreda: { id: 1, name: "Woreda A" },
//     placeOfBirthZone: { id: 1, name: "Zone A" },
//     placeOfBirthRegion: { id: 1, name: "Region A" },
//     currentAddressWoreda: { id: 2, name: "Woreda B" },
//     currentAddressZone: { id: 2, name: "Zone B" },
//     currentAddressRegion: { id: 2, name: "Region B" },
//     email: "john@example.com",
//     maritalStatus: "SINGLE",
//     impairment: { id: 1, name: "None" },
//     schoolBackground: { id: 1, name: "High School" },
//     contactPersonFirstNameENG: "Peter",
//     contactPersonFirstNameAMH: "ፒተር",
//     contactPersonLastNameENG: "Smith",
//     contactPersonLastNameAMH: "ስሚት",
//     contactPersonPhoneNumber: "0911122233",
//     contactPersonRelation: "Uncle",
//     dateEnrolledEC: "2018-09-01",
//     dateEnrolledGC: "2018-09-11",
//     batchClassYearSemester: { id: 1, name: "2023 Fall" },
//     studentRecentBatch: { id: 1, name: "2023 Fall" },
//     studentRecentStatus: "ACTIVE",
//     departmentEnrolled: { id: 1, name: "Computer Science" },
//     studentRecentDepartment: { id: 1, name: "Computer Science" },
//     programModality: { id: 1, name: "Regular" },
//     isTransfer: false,
//     exitExamUserID: null,
//     exitExamScore: null,
//     isStudentPassExitExam: false,
//     documentStatus: "INCOMPLETE",
//     remark: "Missing some documents",
//   },
//   {
//     userId: 2,
//     firstNameENG: "Sara",
//     firstNameAMH: "ሳራ",
//     fatherNameENG: "Daniel",
//     fatherNameAMH: "ዳንኤል",
//     grandfatherNameENG: "Abel",
//     grandfatherNameAMH: "አቤል",
//     motherNameENG: "Martha",
//     motherNameAMH: "ማርታ",
//     motherFatherNameENG: "Joseph",
//     motherFatherNameAMH: "ጆሴፍ",
//     gender: "FEMALE",
//     age: 22,
//     phoneNumber: "0923456789",
//     dateOfBirthEC: "2012-11-15",
//     dateOfBirthGC: "2003-03-20",
//     placeOfBirthWoreda: { id: 2, name: "Woreda C" },
//     placeOfBirthZone: { id: 2, name: "Zone C" },
//     placeOfBirthRegion: { id: 2, name: "Region C" },
//     currentAddressWoreda: { id: 3, name: "Woreda D" },
//     currentAddressZone: { id: 3, name: "Zone D" },
//     currentAddressRegion: { id: 3, name: "Region D" },
//     email: "sara@example.com",
//     maritalStatus: "MARRIED",
//     impairment: { id: 1, name: "None" },
//     schoolBackground: { id: 1, name: "High School" },
//     contactPersonFirstNameENG: "Mary",
//     contactPersonFirstNameAMH: "ማሪ",
//     contactPersonLastNameENG: "Johnson",
//     contactPersonLastNameAMH: "ጆንሰን",
//     contactPersonPhoneNumber: "0922233344",
//     contactPersonRelation: "Mother",
//     dateEnrolledEC: "2017-09-01",
//     dateEnrolledGC: "2017-09-11",
//     batchClassYearSemester: { id: 2, name: "2023 Spring" },
//     studentRecentBatch: { id: 2, name: "2023 Spring" },
//     studentRecentStatus: "ACTIVE",
//     departmentEnrolled: { id: 2, name: "Mathematics" },
//     studentRecentDepartment: { id: 2, name: "Mathematics" },
//     programModality: { id: 2, name: "Distance" },
//     isTransfer: true,
//     exitExamUserID: "EX12345",
//     exitExamScore: 87.5,
//     isStudentPassExitExam: true,
//     documentStatus: "COMPLETE",
//     remark: "",
//   },
// ];

// // Column configuration for the new dataset
// const ALL_COLUMNS = [
//   { key: "userId", label: "ID", type: "text", width: "80px" },
//   { key: "firstNameENG", label: "First Name (ENG)", type: "text" },
//   { key: "firstNameAMH", label: "First Name (AMH)", type: "text" },
//   { key: "fatherNameENG", label: "Father Name (ENG)", type: "text" },
//   { key: "fatherNameAMH", label: "Father Name (AMH)", type: "text" },
//   { key: "grandfatherNameENG", label: "Grandfather Name (ENG)", type: "text" },
//   { key: "grandfatherNameAMH", label: "Grandfather Name (AMH)", type: "text" },
//   { key: "motherNameENG", label: "Mother Name (ENG)", type: "text" },
//   { key: "motherNameAMH", label: "Mother Name (AMH)", type: "text" },
//   {
//     key: "motherFatherNameENG",
//     label: "Mother's Father Name (ENG)",
//     type: "text",
//   },
//   {
//     key: "motherFatherNameAMH",
//     label: "Mother's Father Name (AMH)",
//     type: "text",
//   },
//   {
//     key: "gender",
//     label: "Gender",
//     type: "select",
//     options: ["MALE", "FEMALE"],
//   },
//   { key: "age", label: "Age", type: "number" },
//   { key: "phoneNumber", label: "Phone Number", type: "text" },
//   { key: "dateOfBirthEC", label: "DOB (EC)", type: "text" },
//   { key: "dateOfBirthGC", label: "DOB (GC)", type: "text" },
//   { key: "placeOfBirthWoreda.name", label: "Birth Woreda", type: "text" },
//   { key: "placeOfBirthZone.name", label: "Birth Zone", type: "text" },
//   { key: "placeOfBirthRegion.name", label: "Birth Region", type: "text" },
//   { key: "currentAddressWoreda.name", label: "Current Woreda", type: "text" },
//   { key: "currentAddressZone.name", label: "Current Zone", type: "text" },
//   { key: "currentAddressRegion.name", label: "Current Region", type: "text" },
//   { key: "email", label: "Email", type: "text" },
//   {
//     key: "maritalStatus",
//     label: "Marital Status",
//     type: "select",
//     options: ["SINGLE", "MARRIED"],
//   },
//   { key: "impairment.name", label: "Impairment", type: "text" },
//   { key: "schoolBackground.name", label: "School Background", type: "text" },
//   {
//     key: "contactPersonFirstNameENG",
//     label: "Contact First Name (ENG)",
//     type: "text",
//   },
//   {
//     key: "contactPersonFirstNameAMH",
//     label: "Contact First Name (AMH)",
//     type: "text",
//   },
//   {
//     key: "contactPersonLastNameENG",
//     label: "Contact Last Name (ENG)",
//     type: "text",
//   },
//   {
//     key: "contactPersonLastNameAMH",
//     label: "Contact Last Name (AMH)",
//     type: "text",
//   },
//   { key: "contactPersonPhoneNumber", label: "Contact Phone", type: "text" },
//   { key: "contactPersonRelation", label: "Contact Relation", type: "text" },
//   { key: "dateEnrolledEC", label: "Enrolled (EC)", type: "text" },
//   { key: "dateEnrolledGC", label: "Enrolled (GC)", type: "text" },
//   { key: "batchClassYearSemester.name", label: "Batch Semester", type: "text" },
//   { key: "studentRecentBatch.name", label: "Recent Batch", type: "text" },
//   {
//     key: "studentRecentStatus",
//     label: "Status",
//     type: "select",
//     options: ["ACTIVE", "INACTIVE"],
//   },
//   {
//     key: "departmentEnrolled.name",
//     label: "Department Enrolled",
//     type: "text",
//   },
//   {
//     key: "studentRecentDepartment.name",
//     label: "Recent Department",
//     type: "text",
//   },
//   { key: "programModality.name", label: "Program Modality", type: "text" },
//   { key: "isTransfer", label: "Is Transfer", type: "boolean" },
//   { key: "exitExamUserID", label: "Exit Exam ID", type: "text" },
//   { key: "exitExamScore", label: "Exit Exam Score", type: "number" },
//   { key: "isStudentPassExitExam", label: "Passed Exit Exam", type: "boolean" },
//   {
//     key: "documentStatus",
//     label: "Document Status",
//     type: "select",
//     options: ["COMPLETE", "INCOMPLETE"],
//   },
//   { key: "remark", label: "Remark", type: "text" },
// ];

// function BulkEditModal({ open, onClose, onApply, visibleColumns }) {
//   const columnOptions = ALL_COLUMNS.filter((c) =>
//     visibleColumns.includes(c.key)
//   );
//   const [field, setField] = useState(columnOptions[0]?.key || "");
//   const selectedCol = useMemo(
//     () => ALL_COLUMNS.find((c) => c.key === field),
//     [field]
//   );
//   const [value, setValue] = useState("");

//   if (!open) return null;

//   const handleApply = () => {
//     let v = value;
//     if (selectedCol?.type === "number") v = Number(value || 0);
//     if (selectedCol?.type === "boolean") v = value === "true" || value === true;
//     onApply(field, v);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 shadow-xl p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold">Bulk Edit</h3>
//           <button
//             onClick={onClose}
//             className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm mb-1">Field</label>
//             <select
//               value={field}
//               onChange={(e) => setField(e.target.value)}
//               className="w-full rounded border px-3 py-2"
//             >
//               {columnOptions.map((c) => (
//                 <option key={c.key} value={c.key}>
//                   {c.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {selectedCol?.type === "select" && (
//             <div>
//               <label className="block text-sm mb-1">Value</label>
//               <select
//                 value={String(value)}
//                 onChange={(e) => setValue(e.target.value)}
//                 className="w-full rounded border px-3 py-2"
//               >
//                 <option value="">-- choose --</option>
//                 {selectedCol.options?.map((opt) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {selectedCol?.type === "boolean" && (
//             <div>
//               <label className="block text-sm mb-1">Value</label>
//               <select
//                 value={String(value)}
//                 onChange={(e) => setValue(e.target.value)}
//                 className="w-full rounded border px-3 py-2"
//               >
//                 <option value="true">True</option>
//                 <option value="false">False</option>
//               </select>
//             </div>
//           )}

//           {(selectedCol?.type === "text" || selectedCol?.type === "number") && (
//             <div>
//               <label className="block text-sm mb-1">Value</label>
//               <input
//                 type={selectedCol?.type === "number" ? "number" : "text"}
//                 value={String(value)}
//                 onChange={(e) => setValue(e.target.value)}
//                 className="w-full rounded border px-3 py-2"
//               />
//             </div>
//           )}

//           <div className="flex justify-end gap-2 pt-2">
//             <button onClick={onClose} className="px-4 py-2 rounded border">
//               Cancel
//             </button>
//             <button
//               onClick={handleApply}
//               className="px-4 py-2 rounded bg-blue-600 text-white"
//             >
//               Apply to Selected
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function TenColumnEditableTablePage() {
//   const [students, setStudents] = useState(initialStudents);
//   const [search, setSearch] = useState("");
//   const [visibleColumns, setVisibleColumns] = useState(
//     ALL_COLUMNS.map((c) => c.key)
//   );
//   const [showFilters, setShowFilters] = useState(true);

//   // Single-row editing state
//   const [editingRowId, setEditingRowId] = useState(null);
//   const [draftRow, setDraftRow] = useState({});

//   // Selection for bulk actions
//   const [selectedIds, setSelectedIds] = useState([]);

//   const [bulkOpen, setBulkOpen] = useState(false);

//   const filtered = useMemo(() => {
//     const s = search.trim().toLowerCase();
//     if (!s) return students;
//     return students.filter((st) =>
//       Object.values(st)
//         .map((v) => {
//           if (typeof v === "object" && v?.name) return v.name;
//           return String(v);
//         })
//         .join(" ")
//         .toLowerCase()
//         .includes(s)
//     );
//   }, [students, search]);

//   const toggleColumn = (key) => {
//     setVisibleColumns((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
//     );
//   };

//   const beginEdit = (row) => {
//     setEditingRowId(row.userId);
//     setDraftRow(row);
//   };

//   const cancelEdit = () => {
//     setEditingRowId(null);
//     setDraftRow({});
//   };

//   const saveEdit = () => {
//     setStudents((prev) =>
//       prev.map((s) =>
//         s.userId === editingRowId ? { ...draftRow, userId: s.userId } : s
//       )
//     );
//     cancelEdit();
//   };

//   const updateDraft = (key, value) => {
//     setDraftRow((prev) => {
//       if (key.includes(".")) {
//         const [parent, child] = key.split(".");
//         return { ...prev, [parent]: { ...prev[parent], [child]: value } };
//       }
//       return { ...prev, [key]: value };
//     });
//   };

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     const currentIds = filtered.map((s) => s.userId);
//     const allSelectedNow = currentIds.every((id) => selectedIds.includes(id));
//     setSelectedIds(allSelectedNow ? [] : currentIds);
//   };

//   const applyBulk = (field, value) => {
//     setStudents((prev) =>
//       prev.map((s) =>
//         selectedIds.includes(s.userId)
//           ? field.includes(".")
//             ? {
//                 ...s,
//                 [field.split(".")[0]]: {
//                   ...s[field.split(".")[0]],
//                   [field.split(".")[1]]: value,
//                 },
//               }
//             : { ...s, [field]: value }
//           : s
//       )
//     );
//     setBulkOpen(false);
//     setSelectedIds([]);
//   };

//   const getNestedValue = (obj, key) => {
//     if (key.includes(".")) {
//       const [parent, child] = key.split(".");
//       return obj[parent]?.[child] ?? "-";
//     }
//     return obj[key] ?? "-";
//   };

//   const renderDisplayCell = (row, col) => {
//     const v = getNestedValue(row, col.key);
//     if (col.type === "boolean") return v === true ? "Yes" : "No";
//     return v;
//   };

//   const renderEditCell = (row, col) => {
//     const value = getNestedValue(draftRow, col.key);
//     if (col.type === "select") {
//       return (
//         <select
//           value={value ?? ""}
//           onChange={(e) => updateDraft(col.key, e.target.value)}
//           className="w-full rounded border px-2 py-1"
//         >
//           <option value="">-- choose --</option>
//           {col.options?.map((opt) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//       );
//     }
//     if (col.type === "boolean") {
//       return (
//         <input
//           type="checkbox"
//           checked={Boolean(value)}
//           onChange={(e) => updateDraft(col.key, e.target.checked)}
//           className="custom-checkbox"
//         />
//       );
//     }
//     return (
//       <input
//         type={col.type === "number" ? "number" : "text"}
//         value={value ?? ""}
//         onChange={(e) =>
//           updateDraft(
//             col.key,
//             col.type === "number" ? Number(e.target.value) : e.target.value
//           )
//         }
//         className="w-full rounded border px-2 py-1"
//       />
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
//       <style>
//         {`
//           .custom-checkbox {
//             appearance: none;
//             width: 20px;
//             height: 20px;
//             border: 2px solid #3b82f6; /* Blue border */
//             border-radius: 4px;
//             background-color: white;
//             cursor: pointer;
//             transition: all 0.2s ease-in-out;
//             position: relative;
//             outline: none;
//             display: inline-block;
//             vertical-align: middle;
//           }

//           .custom-checkbox:checked {
//             background-color: #3b82f6; /* Blue background when checked */
//             border-color: #3b82f6;
//           }

//           .custom-checkbox:checked::after {
//             content: '\\2713'; /* Checkmark */
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             color: white;
//             font-size: 14px;
//             font-weight: bold;
//           }

//           .custom-checkbox:hover:not(:disabled) {
//             box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); /* Blue glow on hover */
//           }

//           .custom-checkbox:disabled {
//             background-color: #e5e7eb;
//             border-color: #d1d5db;
//             cursor: not-allowed;
//           }

//           .custom-checkbox:focus {
//             box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3); /* Blue focus ring */
//           }
//         `}
//       </style>

//       {/* Header */}
//       <header className="max-w-7xl mx-auto mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//         <h1 className="text-2xl font-bold">Students — Dynamic Table</h1>
//         <div className="flex items-center gap-2">
//           <input
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="rounded-lg border px-3 py-2 w-64 bg-white dark:bg-gray-900"
//           />
//           <button
//             onClick={() => setBulkOpen(true)}
//             disabled={selectedIds.length === 0}
//             className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
//           >
//             Bulk Edit ({selectedIds.length})
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto">
//         {/* Collapsible Column Picker */}
//         <div className="mb-4">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//           >
//             {showFilters ? "Hide Filters" : "Show Filters"}
//           </button>
//           {showFilters && (
//             <div className="mt-4 rounded-2xl bg-white dark:bg-gray-900 shadow p-4">
//               <h2 className="font-semibold mb-3">Visible Columns</h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 {ALL_COLUMNS.map((c) => (
//                   <label key={c.key} className="flex items-center gap-3">
//                     <input
//                       type="checkbox"
//                       checked={visibleColumns.includes(c.key)}
//                       onChange={() => toggleColumn(c.key)}
//                       className="custom-checkbox"
//                     />
//                     <span>{c.label}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Table */}
//         <section className="rounded-2xl bg-white dark:bg-gray-900 shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100 dark:bg-gray-800">
//                 <tr>
//                   <th className="px-3 py-2 w-10">
//                     <input
//                       type="checkbox"
//                       onChange={toggleSelectAll}
//                       checked={
//                         filtered.length > 0 &&
//                         filtered.every((s) => selectedIds.includes(s.userId))
//                       }
//                       className="custom-checkbox"
//                     />
//                   </th>
//                   {ALL_COLUMNS.filter((c) =>
//                     visibleColumns.includes(c.key)
//                   ).map((c) => (
//                     <th
//                       key={c.key}
//                       className="px-3 py-2 text-left whitespace-nowrap"
//                     >
//                       {c.label}
//                     </th>
//                   ))}
//                   <th className="px-3 py-2 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((row) => {
//                   const isEditing = editingRowId === row.userId;
//                   return (
//                     <tr
//                       key={row.userId}
//                       className="border-t border-gray-200 dark:border-gray-800"
//                     >
//                       <td className="px-3 py-2">
//                         <input
//                           type="checkbox"
//                           checked={selectedIds.includes(row.userId)}
//                           onChange={() => toggleSelect(row.userId)}
//                           className="custom-checkbox"
//                         />
//                       </td>
//                       {ALL_COLUMNS.filter((c) =>
//                         visibleColumns.includes(c.key)
//                       ).map((col) => (
//                         <td key={col.key} className="px-3 py-2 align-top">
//                           {isEditing
//                             ? renderEditCell(row, col)
//                             : renderDisplayCell(row, col)}
//                         </td>
//                       ))}
//                       <td className="px-3 py-2 text-right whitespace-nowrap">
//                         {!isEditing ? (
//                           <button
//                             onClick={() => beginEdit(row)}
//                             className="px-3 py-1 rounded border hover:bg-gray-50 dark:hover:bg-gray-800"
//                           >
//                             Edit
//                           </button>
//                         ) : (
//                           <div className="inline-flex gap-2">
//                             <button
//                               onClick={saveEdit}
//                               className="px-3 py-1 rounded bg-green-600 text-white"
//                             >
//                               Save
//                             </button>
//                             <button
//                               onClick={cancelEdit}
//                               className="px-3 py-1 rounded border"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 {filtered.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={visibleColumns.length + 2}
//                       className="px-3 py-8 text-center text-gray-500"
//                     >
//                       No results
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>

//       {/* Bulk Edit Modal */}
//       <BulkEditModal
//         open={bulkOpen}
//         onClose={() => setBulkOpen(false)}
//         onApply={applyBulk}
//         visibleColumns={visibleColumns}
//       />
//     </div>
//   );
// }
