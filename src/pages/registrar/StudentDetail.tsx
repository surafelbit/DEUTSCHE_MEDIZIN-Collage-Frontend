// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ImageModal } from "@/hooks/ImageModal";
// import { useModal } from "../../hooks/Modal";

// const StudentProfile: React.FC = () => {
//   const navigate = useNavigate();
//   const { openModal } = useModal();
//   const student = {
//     admissionType: "Regular",
//     // Personal Data
//     firstName: "Abebe",
//     firstNameAMH: "አበበ",
//     middleName: "Kebede",
//     middleNameAMH: "ከበደ",
//     lastName: "Demeke",
//     lastNameAMH: "ደምሴ",
//     sex: "Male",
//     age: "21",
//     visionImpairment: "None",
//     hearingImpairment: "None",
//     otherImpairment: "None",

//     // Birth Info
//     birthWoreda: "Adds Ababa",
//     birthZone: "Addis Ketema",
//     birthRegion: "Addis Ababa",
//     birthDateEC: "15",
//     birthMonthEC: "Yekatit",
//     birthYearEC: "2014",
//     birthDateGC: "23",
//     birthMonthGC: "February",
//     birthYearGC: "2022",

//     // Current Address
//     currentRegion: "Addis Ababa",
//     currentZone: "Bole",
//     currentWoreda: "06",
//     email: "abebe@example.com",
//     phoneNo: "+251912345678",

//     // Marital Status
//     maritalStatus: "Single",

//     // Emergency Contact
//     emergencyFirstNameENG: "Tesfaye ",
//     emergencyLastNameENG: "something ",
//     emergencyRelation: "Father",
//     emergencyLastName: "someone",
//     emergencyFirstNameAMH: "",
//     emergencyLastNameAMH: "",
//     emergencyMobile: "+251911223344",

//     // Family Background
//     fatherName: "Kebede Demeke",
//     fatherZone: "Bole",
//     fatherWoreda: "06",
//     fatherSubCity: "Bole",
//     fatherKebele: "12",
//     fatherHouseNo: "34",
//     motherName: "Mulu Habte",
//     motherRegion: "Addis Ababa",
//     motherZone: "Bole",
//     motherWoreda: "06",
//     motherKifleKetema: "Bole",
//     motherKebele: "12",
//     photo: "https://randomuser.me/api/portraits/men/32.jpg",
//     certificate:
//       "https://img.freepik.com/free-vector/diploma-certificate-template_23-2148823004.jpg",
//   };

//   const renderField = (label: string, value: string) => (
//     <div className="flex justify-between items-center border-b border-blue-100 py-3 transition-all duration-200 hover:bg-blue-50/50">
//       <span className="font-semibold text-blue-700">{label}:</span>
//       <span className="text-gray-800">{value}</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-12">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
//         >
//           ← Back
//         </button>
//         <h1 className="text-3xl font-bold text-blue-800">Student Profile</h1>
//         <div></div>
//       </div>

//       {/* Profile + Certificate */}
//       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//         <div className="flex justify-center">
//           <img
//             src={student.photo}
//             onClick={() =>
//               openModal(
//                 <ImageModal
//                   imageSrc={student.photo}
//                   title={`${student.firstName} ${student.middleName} ${student.lastName}`}
//                 />
//               )
//             }
//             alt="Student"
//             className="w-48 h-48 rounded-full shadow-xl object-cover hover:scale-105 transition-transform duration-300 cursor-pointer border-4 border-blue-200"
//           />
//         </div>
//         <div className="flex justify-center">
//           <img
//             src={student.certificate}
//             onClick={() =>
//               openModal(<ImageModal imageSrc={student.certificate} />)
//             }
//             alt="Certificate"
//             className="w-72 h-48 rounded-xl shadow-xl object-cover hover:scale-105 transition-transform duration-300 cursor-pointer border-4 border-blue-200"
//           />
//         </div>
//       </div>

//       {/* Student Details */}
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
//         {/* Personal Data */}
//         <Section title="Personal Data">
//           {renderField(
//             "First Name",
//             `${student.firstName} (${student.firstNameACMH})`
//           )}
//           {renderField(
//             "Middle Name",
//             `${student.middleName} (${student.middleNameAMH})`
//           )}
//           {renderField(
//             "Last Name",
//             `${student.lastName} (${student.lastNameAMH})`
//           )}
//           {renderField("Sex", student.sex)}
//           {renderField("Age", student.age)}
//           {renderField(
//             "Impairments",
//             `${student.visionImpairment}, ${student.hearingImpairment}, ${student.otherImpairment}`
//           )}
//         </Section>

//         {/* Birth Info */}
//         <Section title="Birth Information">
//           {renderField("Town", student.birthTown)}
//           {renderField("Woreda", student.birthWoreda)}
//           {renderField("Zone", student.birthZone)}
//           {renderField("Region", student.birthRegion)}
//           {renderField(
//             "Date (EC)",
//             `${student.birthDateEC}-${student.birthMonthEC}-${student.birthYearEC}`
//           )}
//           {renderField(
//             "Date (GC)",
//             `${student.birthDateGC}-${student.birthMonthGC}-${student.birthYearGC}`
//           )}
//         </Section>

//         {/* Current Address */}
//         <Section title="Current Address">
//           {renderField("Region", student.currentRegion)}
//           {renderField("Zone", student.currentZone)}
//           {renderField("Woreda", student.currentWoreda)}
//           {renderField("Sub City", student.currentSubCity)}
//           {renderField("Kebele", student.currentKebele)}
//           {renderField("House No", student.currentHouseNo)}
//           {renderField("PO Box", student.poBox)}
//           {renderField("Email", student.email)}
//           {renderField("Phone", student.phoneNo)}
//         </Section>

//         {/* Emergency Contact */}
//         <Section title="Emergency Contact">
//           {renderField("Name", student.emergencyName)}
//           {renderField("Relation", student.emergencyRelation)}
//           {renderField("Home Phone", student.emergencyHomePhone)}
//           {renderField("Office Phone", student.emergencyOfficePhone)}
//           {renderField("Mobile", student.emergencyMobile)}
//           {renderField("Region", student.emergencyRegion)}
//           {renderField("Zone", student.emergencyZone)}
//           {renderField("Woreda", student.emergencyWoreda)}
//           {renderField("Sub City", student.emergencySubCity)}
//           {renderField("Kebele", student.emergencyKebele)}
//           {renderField("House No", student.emergencyHouseNo)}
//         </Section>

//         {/* Family */}
//         <Section title="Family Background">
//           {renderField("Father Name", student.fatherName)}
//           {renderField(
//             "Father Address",
//             `${student.fatherRegion}, ${student.fatherZone}, ${student.fatherWoreda}, ${student.fatherSubCity}, Kebele ${student.fatherKebele}, House ${student.fatherHouseNo}`
//           )}
//           {renderField("Mother Name", student.motherName)}
//           {renderField(
//             "Mother Address",
//             `${student.motherRegion}, ${student.motherZone}, ${student.motherWoreda}, ${student.motherKifleKetema}, Kebele ${student.motherKebele}`
//           )}
//         </Section>
//       </div>
//     </div>
//   );
// };

// const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
//   title,
//   children,
// }) => (
//   <div className="space-y-4 bg-blue-50/30 p-6 rounded-xl shadow-sm">
//     <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-2">
//       {title}
//     </h2>
//     <div className="space-y-2">{children}</div>
//   </div>
// );

// export default StudentProfile;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const StudentProfile = () => {
  const navigate = useNavigate();

  const studentData = {
    firstNameAMH: "አበበ",
    firstNameENG: "Abebe",
    fatherNameAMH: "ከበደ",
    fatherNameENG: "Kebede",
    grandfatherNameAMH: "ወልደ",
    grandfatherNameENG: "Welde",
    motherNameAMH: "ልደት",
    motherNameENG: "Lidet",
    motherFatherNameAMH: "ታደሰ",
    motherFatherNameENG: "Tadesse",
    gender: "Male",
    age: 20,
    phoneNumber: "+251912345678",
    dateOfBirthEC: "15/06/2005",
    dateOfBirthGC: "1997-02-22",
    placeOfBirthWoreda: "Yeka",
    placeOfBirthZone: "Addis Ababa",
    placeOfBirthRegion: "Addis Ababa",
    currentAddressWoreda: "Bole",
    currentAddressZone: "Addis Ababa",
    currentAddressRegion: "Addis Ababa",
    email: "abebe.kebede@example.com",
    maritalStatus: "Single",
    impairment: "None",
    schoolBackground: "Public",
    studentPhoto:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIOJj4kLCIuNDIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy",
    contactPersonFirstNameAMH: "ሰለሞን",
    contactPersonFirstNameENG: "Solomon",
    contactPersonLastNameAMH: "ገብረ",
    contactPersonLastNameENG: "Gebre",
    contactPersonPhoneNumber: "+251987654321",
    contactPersonRelation: "Brother",
    departmentEnrolled: "Computer Science",
    programModality: "Regular",
    grade12ExamResult:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIOJj4kLCIuNDIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4"
        >
          <Link
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="mr-2">&larr;</span>
            <span>Back to Student List</span>
          </Link>
        </motion.div>
        <div className="bg-blue-600 dark:bg-blue-500 p-6 text-white flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Student Profile
            </h1>
            <p className="mt-2 text-blue-100 dark:text-blue-200">
              Detailed Information
            </p>
          </div>
        </div>

        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div className="bg-blue-50/80 dark:bg-gray-700/80 backdrop-blur-md p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      First Name (Amharic):
                    </span>{" "}
                    {studentData.firstNameAMH}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      First Name (English):
                    </span>{" "}
                    {studentData.firstNameENG}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Father's Name (Amharic):
                    </span>{" "}
                    {studentData.fatherNameAMH}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Father's Name (English):
                    </span>{" "}
                    {studentData.fatherNameENG}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Grandfather's Name (Amharic):
                    </span>{" "}
                    {studentData.grandfatherNameAMH}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Grandfather's Name (English):
                    </span>{" "}
                    {studentData.grandfatherNameENG}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Mother's Name (Amharic):
                    </span>{" "}
                    {studentData.motherNameAMH}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Mother's Name (English):
                    </span>{" "}
                    {studentData.motherNameENG}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Mother's Father Name (Amharic):
                    </span>{" "}
                    {studentData.motherFatherNameAMH}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Mother's Father Name (English):
                    </span>{" "}
                    {studentData.motherFatherNameENG}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Gender:
                    </span>{" "}
                    {studentData.gender}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Age:
                    </span>{" "}
                    {studentData.age}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Phone Number:
                    </span>{" "}
                    {studentData.phoneNumber}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Date of Birth (EC):
                    </span>{" "}
                    {studentData.dateOfBirthEC}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Date of Birth (GC):
                    </span>{" "}
                    {studentData.dateOfBirthGC}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50/80 dark:bg-gray-700/80 backdrop-blur-md p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
                  Address & Contact Information
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Place of Birth (Woreda):
                    </span>{" "}
                    {studentData.placeOfBirthWoreda}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Place of Birth (Zone):
                    </span>{" "}
                    {studentData.placeOfBirthZone}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Place of Birth (Region):
                    </span>{" "}
                    {studentData.placeOfBirthRegion}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Current Address (Woreda):
                    </span>{" "}
                    {studentData.currentAddressWoreda}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Current Address (Zone):
                    </span>{" "}
                    {studentData.currentAddressZone}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Current Address (Region):
                    </span>{" "}
                    {studentData.currentAddressRegion}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Email:
                    </span>{" "}
                    {studentData.email}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Marital Status:
                    </span>{" "}
                    {studentData.maritalStatus}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Impairment:
                    </span>{" "}
                    {studentData.impairment}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      School Background:
                    </span>{" "}
                    {studentData.schoolBackground}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/80 dark:bg-gray-700/80 backdrop-blur-md p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
                  Contact Person
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      First Name (Amharic):
                    </span>{" "}
                    {studentData.contactPersonFirstNameAMH}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      First Name (English):
                    </span>{" "}
                    {studentData.contactPersonFirstNameENG}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Last Name (Amharic):
                    </span>{" "}
                    {studentData.contactPersonLastNameAMH}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Last Name (English):
                    </span>{" "}
                    {studentData.contactPersonLastNameENG}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Phone Number:
                    </span>{" "}
                    {studentData.contactPersonPhoneNumber}
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Relation:
                    </span>{" "}
                    {studentData.contactPersonRelation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 bg-blue-50/80 dark:bg-gray-700/80 backdrop-blur-md p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
              Academic Information
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Department Enrolled:
                </span>{" "}
                {studentData.departmentEnrolled}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Program Modality:
                </span>{" "}
                {studentData.programModality}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8 bg-blue-50/80 dark:bg-gray-700/80 backdrop-blur-md p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
              Academic Progress
            </h2>
            <div className="overflow-x-auto">
              <table
                className="w-full table-auto border border-gray-200 dark:border-gray-700"
                role="grid"
                aria-label="Student Academic Progress"
              >
                <thead className="bg-blue-100 dark:bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-blue-600 dark:text-blue-400 font-semibold">
                      Semester
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-blue-600 dark:text-blue-400 font-semibold">
                      Course
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-blue-600 dark:text-blue-400 font-semibold">
                      Grade
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-blue-600 dark:text-blue-400 font-semibold">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      semester: "Fall 2023",
                      course: "Introduction to Programming",
                      grade: "A",
                      credits: 3,
                    },
                    {
                      semester: "Fall 2023",
                      course: "Calculus I",
                      grade: "B+",
                      credits: 4,
                    },
                    {
                      semester: "Spring 2024",
                      course: "Data Structures",
                      grade: "A-",
                      credits: 3,
                    },
                    {
                      semester: "Spring 2024",
                      course: "Physics I",
                      grade: "B",
                      credits: 4,
                    },
                    {
                      semester: "Fall 2024",
                      course: "Algorithms",
                      grade: "A",
                      credits: 3,
                    },
                    {
                      semester: "Spring 2025",
                      course: "Database Systems",
                      grade: "B+",
                      credits: 3,
                    },
                  ].map((progress, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                        {progress.semester}
                      </td>
                      <td className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                        {progress.course}
                      </td>
                      <td className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                        {progress.grade}
                      </td>
                      <td className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                        {progress.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-8 bg-blue-50/80 dark:bg-gray-700/80 backdrop-blur-md p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
              Documents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 dark:text-gray-200 font-medium text-blue-600 dark:text-blue-400 mb-2">
                  Student Photo
                </p>
                <img
                  src={studentData.studentPhoto}
                  alt="Student Photo"
                  className="w-40 h-40 object-cover rounded-lg border-2 border-blue-200 dark:border-blue-600/30 shadow-sm hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-200 font-medium text-blue-600 dark:text-blue-400 mb-2">
                  Grade 12 Exam Result
                </p>
                <img
                  src={studentData.grade12ExamResult}
                  alt="Grade 12 Exam Result"
                  className="w-64 h-36 object-cover rounded-lg border-2 border-blue-200 dark:border-blue-600/30 shadow-sm hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-blue-100/80 dark:bg-gray-900/80 backdrop-blur-md p-4 text-center">
          <p className="text-blue-600 dark:text-blue-400 text-sm">
            © 2025 Student Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
