import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageModal } from "@/hooks/ImageModal";
import { useModal } from "../../hooks/Modal";
const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { closeModal } = useModal();
  const student = {
    admissionType: "Regular",
    // Personal Data
    firstName: "Abebe",
    firstNameAMH: "አበበ",
    middleName: "Kebede",
    middleNameAMH: "ከበደ",
    lastName: "Demeke",
    lastNameAMH: "ደምሴ",
    sex: "Male",
    age: "21",
    visionImpairment: "None",
    hearingImpairment: "None",
    otherImpairment: "None",

    // Birth Info
    birthTown: "Addis Ababa",
    birthWoreda: "01",
    birthZone: "Addis Ketema",
    birthRegion: "Addis Ababa",
    birthDateEC: "15",
    birthMonthEC: "Yekatit",
    birthYearEC: "2014",
    birthDateGC: "23",
    birthMonthGC: "February",
    birthYearGC: "2022",

    // Current Address
    currentRegion: "Addis Ababa",
    currentZone: "Bole",
    currentWoreda: "06",
    currentSubCity: "Bole",
    currentKebele: "12",
    currentHouseNo: "34",
    poBox: "12345",
    email: "abebe@example.com",
    phoneNo: "+251912345678",

    // Marital Status
    maritalStatus: "Single",

    // Emergency Contact
    emergencyName: "Tesfaye Kebede",
    emergencyRelation: "Father",
    emergencyHomePhone: "0111222333",
    emergencyOfficePhone: "0111333444",
    emergencyMobile: "+251911223344",
    emergencyRegion: "Addis Ababa",
    emergencyZone: "Lideta",
    emergencyWoreda: "05",
    emergencySubCity: "Lideta",
    emergencyKebele: "09",
    emergencyHouseNo: "44",

    // Family Background
    fatherName: "Kebede Demeke",
    fatherRegion: "Addis Ababa",
    fatherZone: "Bole",
    fatherWoreda: "06",
    fatherSubCity: "Bole",
    fatherKebele: "12",
    fatherHouseNo: "34",
    motherName: "Mulu Habte",
    motherRegion: "Addis Ababa",
    motherZone: "Bole",
    motherWoreda: "06",
    motherKifleKetema: "Bole",
    motherKebele: "12",

    // Images
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    certificate:
      "https://img.freepik.com/free-vector/diploma-certificate-template_23-2148823004.jpg",
  };

  const renderField = (label: string, value: string) => (
    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2">
      <span className="font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <span className="text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Student Profile
        </h1>
        <div></div>
      </div>

      {/* Profile + Certificate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex justify-center">
          <img
            src={student.photo}
            onClick={() =>
              openModal(
                <ImageModal
                  imageSrc={student.photo}
                  title={`${student.firstName} ${student.middleName} ${student.lastName}`}
                />
              )
            }
            alt="Student"
            className="rounded-full shadow-lg object-cover"
          />
        </div>
        <div className="flex justify-center">
          <img
            src={student.certificate}
            onClick={() =>
              openModal(<ImageModal imageSrc={student.certificate} />)
            }
            alt="Certificate"
            className="w-64 h-44 rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* Student Details */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
        {/* Personal Data */}
        <Section title="Personal Data">
          {renderField(
            "First Name",
            `${student.firstName} (${student.firstNameAMH})`
          )}
          {renderField(
            "Middle Name",
            `${student.middleName} (${student.middleNameAMH})`
          )}
          {renderField(
            "Last Name",
            `${student.lastName} (${student.lastNameAMH})`
          )}
          {renderField("Sex", student.sex)}
          {renderField("Age", student.age)}
          {renderField(
            "Impairments",
            `${student.visionImpairment}, ${student.hearingImpairment}, ${student.otherImpairment}`
          )}
        </Section>

        {/* Birth Info */}
        <Section title="Birth Information">
          {renderField("Town", student.birthTown)}
          {renderField("Woreda", student.birthWoreda)}
          {renderField("Zone", student.birthZone)}
          {renderField("Region", student.birthRegion)}
          {renderField(
            "Date (EC)",
            `${student.birthDateEC}-${student.birthMonthEC}-${student.birthYearEC}`
          )}
          {renderField(
            "Date (GC)",
            `${student.birthDateGC}-${student.birthMonthGC}-${student.birthYearGC}`
          )}
        </Section>

        {/* Current Address */}
        <Section title="Current Address">
          {renderField("Region", student.currentRegion)}
          {renderField("Zone", student.currentZone)}
          {renderField("Woreda", student.currentWoreda)}
          {renderField("Sub City", student.currentSubCity)}
          {renderField("Kebele", student.currentKebele)}
          {renderField("House No", student.currentHouseNo)}
          {renderField("PO Box", student.poBox)}
          {renderField("Email", student.email)}
          {renderField("Phone", student.phoneNo)}
        </Section>

        {/* Emergency Contact */}
        <Section title="Emergency Contact">
          {renderField("Name", student.emergencyName)}
          {renderField("Relation", student.emergencyRelation)}
          {renderField("Home Phone", student.emergencyHomePhone)}
          {renderField("Office Phone", student.emergencyOfficePhone)}
          {renderField("Mobile", student.emergencyMobile)}
          {renderField("Region", student.emergencyRegion)}
          {renderField("Zone", student.emergencyZone)}
          {renderField("Woreda", student.emergencyWoreda)}
          {renderField("Sub City", student.emergencySubCity)}
          {renderField("Kebele", student.emergencyKebele)}
          {renderField("House No", student.emergencyHouseNo)}
        </Section>

        {/* Family */}
        <Section title="Family Background">
          {renderField("Father Name", student.fatherName)}
          {renderField(
            "Father Address",
            `${student.fatherRegion}, ${student.fatherZone}, ${student.fatherWoreda}, ${student.fatherSubCity}, Kebele ${student.fatherKebele}, House ${student.fatherHouseNo}`
          )}
          {renderField("Mother Name", student.motherName)}
          {renderField(
            "Mother Address",
            `${student.motherRegion}, ${student.motherZone}, ${student.motherWoreda}, ${student.motherKifleKetema}, Kebele ${student.motherKebele}`
          )}
        </Section>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="space-y-2">
    <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
      {title}
    </h2>
    <div className="space-y-1">{children}</div>
  </div>
);

export default StudentProfile;
