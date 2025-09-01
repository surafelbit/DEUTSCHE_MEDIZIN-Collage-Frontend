import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Edit,
  Camera,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function StudentProfile() {
  const navigate = useNavigate();
  const [passwordForm, setPasswordForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [editableData, setEditableData] = useState({
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
    contactPersonFirstNameAMH: "ሰለሞን",
    contactPersonFirstNameENG: "Solomon",
    contactPersonLastNameAMH: "ገብረ",
    contactPersonLastNameENG: "Gebre",
    contactPersonPhoneNumber: "+251987654321",
    contactPersonRelation: "Brother",
    departmentEnrolled: "Computer Science",
    programModality: "Regular",
  });

  const originalData = {
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
    contactPersonFirstNameAMH: "ሰለሞን",
    contactPersonFirstNameENG: "Solomon",
    contactPersonLastNameAMH: "ገብረ",
    contactPersonLastNameENG: "Gebre",
    contactPersonPhoneNumber: "+251987654321",
    contactPersonRelation: "Brother",
    departmentEnrolled: "Computer Science",
    programModality: "Regular",
  };

  const studentData = {
    ...editableData,
    studentPhoto:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIOJj4kLCIuNDIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy",
    grade12ExamResult:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIOJj4kLCIuNDIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    console.log("Password change request:", {
      ...formData,
      studentId: studentData.firstNameENG,
    });
    alert(
      `Password change request submitted for Student: ${studentData.firstNameENG}`
    );
    setFormData({ studentId: "", newPassword: "", confirmPassword: "" });
    setPasswordForm(false);
  };

  const handleSave = () => {
    console.log("Updated student data:", editableData);
    alert(`Profile updated for ${editableData.firstNameENG}`);
    setEditMode(false);
  };
  const [openYear, setOpenYear] = useState({ index: null });
  const [openYears, setOpenYears] = useState({});
  const [openSemesters, setOpenSemesters] = useState({});
  const [selectedGradingSystem, setSelectedGradingSystem] = useState("system1");

  const handleCancel = () => {
    setEditableData(originalData);
    setEditMode(false);
  };
  const initialResult = [
    {
      year: 1,
      semseters: [
        {
          id: "1",
          courses: [
            {
              name: "Mathematics",
              result: 95,
              grade: "A",
              credit: 4,
              courseId: "MATH101",
            },
            {
              name: "Physics",
              result: 88,
              grade: "B",
              credit: 3,
              courseId: "PHYS101",
            },
            {
              name: "Chemistry",
              result: 78,
              grade: "C",
              credit: 3,
              courseId: "CHEM101",
            },
            {
              name: "English",
              result: 62,
              grade: "D",
              credit: 2,
              courseId: "ENG101",
            },
          ],
        },
        {
          id: "2",
          courses: [
            {
              name: "Advanced Mathematics",
              result: 92,
              grade: "A",
              credit: 4,
              courseId: "MATH102",
            },
            {
              name: "Mechanics",
              result: 85,
              grade: "B",
              credit: 4,
              courseId: "PHYS102",
            },
            {
              name: "Organic Chemistry",
              result: 70,
              grade: "C",
              credit: 3,
              courseId: "CHEM102",
            },
          ],
        },
        {
          id: "3",
          courses: [
            {
              name: "Statistics",
              result: 99,
              grade: "A",
              credit: 3,
              courseId: "STAT101",
            },
            {
              name: "Electronics",
              result: 82,
              grade: "B",
              credit: 4,
              courseId: "PHYS103",
            },
            {
              name: "Literature",
              result: 55,
              grade: "F",
              credit: 2,
              courseId: "ENG102",
            },
          ],
        },
      ],
    },
    {
      year: 2,
      semseters: [
        {
          id: "1",
          courses: [
            {
              name: "Calculus",
              result: 90,
              grade: "A",
              credit: 4,
              courseId: "MATH201",
            },
            {
              name: "Quantum Physics",
              result: 84,
              grade: "B",
              credit: 4,
              courseId: "PHYS201",
            },
            {
              name: "Inorganic Chemistry",
              result: 75,
              grade: "C",
              credit: 3,
              courseId: "CHEM201",
            },
          ],
        },
        {
          id: "2",
          courses: [
            {
              name: "Linear Algebra",
              result: 87,
              grade: "B",
              credit: 4,
              courseId: "MATH202",
            },
            {
              name: "Thermodynamics",
              result: 80,
              grade: "B",
              credit: 3,
              courseId: "PHYS202",
            },
            {
              name: "Writing Composition",
              result: 68,
              grade: "D",
              credit: 2,
              courseId: "ENG201",
            },
          ],
        },
      ],
    },
    {
      year: 3,
      semseters: [
        {
          id: "1",
          courses: [
            {
              name: "Differential Equations",
              result: 100,
              grade: "A",
              credit: 5,
              courseId: "MATH301",
            },
            {
              name: "Electromagnetism",
              result: 83,
              grade: "B",
              credit: 4,
              courseId: "PHYS301",
            },
            {
              name: "Biochemistry",
              result: 72,
              grade: "C",
              credit: 3,
              courseId: "CHEM301",
            },
            {
              name: "Technical Writing",
              result: 60,
              grade: "D",
              credit: 2,
              courseId: "ENG301",
            },
          ],
        },
        {
          id: "2",
          courses: [
            {
              name: "Probability",
              result: 97,
              grade: "A",
              credit: 4,
              courseId: "MATH302",
            },
            {
              name: "Optics",
              result: 79,
              grade: "C",
              credit: 3,
              courseId: "PHYS302",
            },
            {
              name: "Analytical Chemistry",
              result: 65,
              grade: "D",
              credit: 3,
              courseId: "CHEM302",
            },
          ],
        },
      ],
    },
  ];
  const [displayedResult, setDisplayedResult] = useState(initialResult);

  const gradingSystems = {
    system1: (score) => {
      if (score >= 90) return "A";
      if (score >= 80) return "B";
      if (score >= 70) return "C";
      if (score >= 60) return "D";
      return "F";
    },
    system2: (score) => {
      if (score >= 90) return "A";
      if (score >= 85) return "A-";
      if (score >= 80) return "B+";
      if (score >= 75) return "B";
      if (score >= 70) return "B-";
      if (score >= 65) return "C";
      return "F";
    },
    system3: (score) => {
      if (score >= 85) return "A";
      if (score >= 75) return "B";
      if (score >= 65) return "C";
      if (score >= 60) return "D";
      return "F";
    },
  };
  useEffect(() => {
    const updatedResult = initialResult.map((year) => ({
      ...year,
      semseters: year.semseters.map((semester) => ({
        ...semester,
        courses: semester.courses.map((course) => ({
          ...course,
          grade: gradingSystems[selectedGradingSystem](course.result),
        })),
      })),
    }));
    setDisplayedResult(updatedResult);
  }, [selectedGradingSystem]);
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-gray-100">
          Student Profile
        </h1>
        <div className="flex space-x-2">
          <Link
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-blue-600 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="mr-2">&larr;</span>
            <span>Back to Student List</span>
          </Link>
          {editMode ? (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="w-32 h-32">
                <AvatarImage src={studentData.studentPhoto} />
                <AvatarFallback className="text-2xl bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-gray-300">
                  {studentData.firstNameENG[0]}
                  {studentData.fatherNameENG[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4 text-blue-600 dark:text-gray-100">
              {studentData.firstNameENG} {studentData.fatherNameENG}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {studentData.departmentEnrolled} Student
            </CardDescription>
            <Badge
              variant="secondary"
              className="mt-2 bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-gray-300"
            >
              {studentData.programModality}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="h-4 w-4 text-blue-600 dark:text-gray-300" />
              <span>{studentData.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="h-4 w-4 text-blue-600 dark:text-gray-300" />
              <span>{studentData.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-gray-300" />
              <span>
                {studentData.currentAddressWoreda},{" "}
                {studentData.currentAddressRegion}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-gray-300" />
              <span>Enrolled: September 2023</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-gray-100">
              Personal Information
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstNameAMH"
                  className="text-gray-700 dark:text-gray-300"
                >
                  First Name (Amharic)
                </Label>
                <Input
                  id="firstNameAMH"
                  name="firstNameAMH"
                  value={editableData.firstNameAMH}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="firstNameENG"
                  className="text-gray-700 dark:text-gray-300"
                >
                  First Name (English)
                </Label>
                <Input
                  id="firstNameENG"
                  name="firstNameENG"
                  value={editableData.firstNameENG}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="fatherNameAMH"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Father's Name (Amharic)
                </Label>
                <Input
                  id="fatherNameAMH"
                  name="fatherNameAMH"
                  value={editableData.fatherNameAMH}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="fatherNameENG"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Father's Name (English)
                </Label>
                <Input
                  id="fatherNameENG"
                  name="fatherNameENG"
                  value={editableData.fatherNameENG}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="grandfatherNameAMH"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Grandfather's Name (Amharic)
                </Label>
                <Input
                  id="grandfatherNameAMH"
                  name="grandfatherNameAMH"
                  value={editableData.grandfatherNameAMH}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="grandfatherNameENG"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Grandfather's Name (English)
                </Label>
                <Input
                  id="grandfatherNameENG"
                  name="grandfatherNameENG"
                  value={editableData.grandfatherNameENG}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="motherNameAMH"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Mother's Name (Amharic)
                </Label>
                <Input
                  id="motherNameAMH"
                  name="motherNameAMH"
                  value={editableData.motherNameAMH}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="motherNameENG"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Mother's Name (English)
                </Label>
                <Input
                  id="motherNameENG"
                  name="motherNameENG"
                  value={editableData.motherNameENG}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="motherFatherNameAMH"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Mother's Father Name (Amharic)
                </Label>
                <Input
                  id="motherFatherNameAMH"
                  name="motherFatherNameAMH"
                  value={editableData.motherFatherNameAMH}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="motherFatherNameENG"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Mother's Father Name (English)
                </Label>
                <Input
                  id="motherFatherNameENG"
                  name="motherFatherNameENG"
                  value={editableData.motherFatherNameENG}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="dateOfBirthGC"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Date of Birth (GC)
                </Label>
                <Input
                  id="dateOfBirthGC"
                  name="dateOfBirthGC"
                  value={editableData.dateOfBirthGC}
                  onChange={handleEditChange}
                  type="date"
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Gender
                </Label>
                <Input
                  id="gender"
                  name="gender"
                  value={editableData.gender}
                  onChange={handleEditChange}
                  readOnly={!editMode}
                  className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <Separator className="bg-blue-200 dark:bg-gray-700" />

            <div className="space-y-2">
              <Label
                htmlFor="currentAddressWoreda"
                className="text-gray-700 dark:text-gray-300"
              >
                Current Address (Woreda)
              </Label>
              <Input
                id="currentAddressWoreda"
                name="currentAddressWoreda"
                value={editableData.currentAddressWoreda}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="currentAddressZone"
                className="text-gray-700 dark:text-gray-300"
              >
                Current Address (Zone)
              </Label>
              <Input
                id="currentAddressZone"
                name="currentAddressZone"
                value={editableData.currentAddressZone}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="currentAddressRegion"
                className="text-gray-700 dark:text-gray-300"
              >
                Current Address (Region)
              </Label>
              <Input
                id="currentAddressRegion"
                name="currentAddressRegion"
                value={editableData.currentAddressRegion}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="placeOfBirthWoreda"
                className="text-gray-700 dark:text-gray-300"
              >
                Place of Birth (Woreda)
              </Label>
              <Input
                id="placeOfBirthWoreda"
                name="placeOfBirthWoreda"
                value={editableData.placeOfBirthWoreda}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="placeOfBirthZone"
                className="text-gray-700 dark:text-gray-300"
              >
                Place of Birth (Zone)
              </Label>
              <Input
                id="placeOfBirthZone"
                name="placeOfBirthZone"
                value={editableData.placeOfBirthZone}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="placeOfBirthRegion"
                className="text-gray-700 dark:text-gray-300"
              >
                Place of Birth (Region)
              </Label>
              <Input
                id="placeOfBirthRegion"
                name="placeOfBirthRegion"
                value={editableData.placeOfBirthRegion}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Academic Information */}
      <Card className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600 dark:text-gray-100">
            <GraduationCap className="mr-2 h-5 w-5" />
            Academic Information
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Your academic details and program information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="departmentEnrolled"
                className="text-gray-700 dark:text-gray-300"
              >
                Department Enrolled
              </Label>
              <Input
                id="departmentEnrolled"
                name="departmentEnrolled"
                value={editableData.departmentEnrolled}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="programModality"
                className="text-gray-700 dark:text-gray-300"
              >
                Program Modality
              </Label>
              <Input
                id="programModality"
                name="programModality"
                value={editableData.programModality}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="schoolBackground"
                className="text-gray-700 dark:text-gray-300"
              >
                School Background
              </Label>
              <Input
                id="schoolBackground"
                name="schoolBackground"
                value={editableData.schoolBackground}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <Separator className="bg-blue-200 dark:bg-gray-700" />

          <div className="space-y-2">
            <Label
              htmlFor="grade12ExamResult"
              className="text-gray-700 dark:text-gray-300"
            >
              Grade 12 Exam Result
            </Label>
            <img
              src={studentData.grade12ExamResult}
              alt="Grade 12 Exam Result"
              className="w-64 h-36 object-cover rounded-lg border-2 border-blue-200 dark:border-gray-700"
            />
          </div>
        </CardContent>
      </Card>
      {/* Emergency Contact */}
      <Card className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-600 dark:text-gray-100">
            Emergency Contact
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Emergency contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="contactPersonFirstNameAMH"
                className="text-gray-700 dark:text-gray-300"
              >
                Contact First Name (Amharic)
              </Label>
              <Input
                id="contactPersonFirstNameAMH"
                name="contactPersonFirstNameAMH"
                value={editableData.contactPersonFirstNameAMH}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contactPersonFirstNameENG"
                className="text-gray-700 dark:text-gray-300"
              >
                Contact First Name (English)
              </Label>
              <Input
                id="contactPersonFirstNameENG"
                name="contactPersonFirstNameENG"
                value={editableData.contactPersonFirstNameENG}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="contactPersonLastNameAMH"
                className="text-gray-700 dark:text-gray-300"
              >
                Contact Last Name (Amharic)
              </Label>
              <Input
                id="contactPersonLastNameAMH"
                name="contactPersonLastNameAMH"
                value={editableData.contactPersonLastNameAMH}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contactPersonLastNameENG"
                className="text-gray-700 dark:text-gray-300"
              >
                Contact Last Name (English)
              </Label>
              <Input
                id="contactPersonLastNameENG"
                name="contactPersonLastNameENG"
                value={editableData.contactPersonLastNameENG}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="contactPersonPhoneNumber"
                className="text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </Label>
              <Input
                id="contactPersonPhoneNumber"
                name="contactPersonPhoneNumber"
                value={editableData.contactPersonPhoneNumber}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contactPersonRelation"
                className="text-gray-700 dark:text-gray-300"
              >
                Relationship
              </Label>
              <Input
                id="contactPersonRelation"
                name="contactPersonRelation"
                value={editableData.contactPersonRelation}
                onChange={handleEditChange}
                readOnly={!editMode}
                className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={() => setPasswordForm(!passwordForm)}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
      >
        {passwordForm ? "Cancel" : "Change Password"}
      </Button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: passwordForm ? "auto" : 0,
          opacity: passwordForm ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <Card className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-gray-100">
              Change Password
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Update the student's password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    New Password
                  </Label>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="Enter new password"
                    className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="Confirm new password"
                    className="border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              {error && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
              >
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-blue-600 dark:text-gray-100">
            Student's Academic Results
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Academic performance by year and semester
          </CardDescription>
        </CardHeader>

        <div className="flex lg:justify-start flex-col sm:flex-row justify-center mb-6 gap-2 sm:gap-4 items-center">
          <label
            htmlFor="gradingSystem"
            className="flex items-center text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium"
          >
            Grading System:
          </label>
          <select
            id="gradingSystem"
            value={selectedGradingSystem}
            onChange={(e) => {
              setSelectedGradingSystem(e.target.value);
            }}
            className="w-full max-w-[180px] sm:max-w-[200px] px-3 py-1.5 border border-blue-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors duration-200 text-xs sm:text-sm"
          >
            <option value="system1">Grading System 1</option>
            <option value="system2">Grading System 2</option>
            <option value="system3">Grading System 3</option>
          </select>
        </div>
        {displayedResult.map((ele, index) => (
          <div key={ele.year} className="mb-4">
            <button
              onClick={() =>
                setOpenYears((prev) => ({ ...prev, [index]: !prev[index] }))
              }
              className={`w-full px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-200 flex items-center justify-between border border-blue-300 dark:border-gray-600 ${
                openYears[index]
                  ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              <span className="flex items-center">
                {openYears[index] ? (
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                Year {ele.year}
              </span>
            </button>
            {openYears[index] && (
              <div className="mt-3 space-y-3 pl-0 sm:pl-4">
                {ele.semseters.map((e, idx) => (
                  <div key={`${index}-${idx}`} className="mb-3">
                    <button
                      onClick={() =>
                        setOpenSemesters((prev) => ({
                          ...prev,
                          [`${index}-${idx}`]: !prev[`${index}-${idx}`],
                        }))
                      }
                      className={`w-full px-3 py-1.5 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-200 flex items-center border border-blue-300 dark:border-gray-600 ${
                        openSemesters[`${index}-${idx}`]
                          ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      <span className="flex items-center">
                        {openSemesters[`${index}-${idx}`] ? (
                          <svg
                            className="w-3 h-3 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3 h-3 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                        Semester {e.id}
                      </span>
                    </button>
                    {openSemesters[`${index}-${idx}`] && (
                      <div className="overflow-x-auto mt-2">
                        <table className="min-w-full bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg">
                          <thead className="bg-blue-50 dark:bg-gray-700">
                            <tr>
                              <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-blue-200 dark:border-gray-600 whitespace-normal break-words">
                                Subject Name
                              </th>
                              <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-blue-200 dark:border-gray-600 whitespace-normal break-words">
                                Grade
                              </th>
                              <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-blue-200 dark:border-gray-600 whitespace-normal break-words">
                                Course ID
                              </th>
                              <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-blue-200 dark:border-gray-600 whitespace-normal break-words">
                                Credit
                              </th>
                              <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b border-blue-200 dark:border-gray-600 whitespace-normal break-words">
                                Result
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-blue-200 dark:divide-gray-700">
                            {e.courses.map((course, courseIdx) => (
                              <tr
                                key={courseIdx}
                                className="hover:bg-blue-50 dark:hover:bg-gray-700"
                              >
                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 whitespace-normal break-words">
                                  {course.name}
                                </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 whitespace-normal break-words">
                                  {course.grade}
                                </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 whitespace-normal break-words">
                                  {course.courseId}
                                </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 whitespace-normal break-words">
                                  {course.credit}
                                </td>
                                <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100 whitespace-normal break-words">
                                  {course.result}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
