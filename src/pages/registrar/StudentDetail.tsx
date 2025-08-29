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
import { Textarea } from "@/components/ui/textarea";
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
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex space-x-2">
          <Link
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="mr-2">&larr;</span>
            <span>Back to Student List</span>
          </Link>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="w-32 h-32">
                <AvatarImage src={studentData.studentPhoto} />
                <AvatarFallback className="text-2xl">
                  {studentData.firstNameENG[0]}
                  {studentData.fatherNameENG[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4">
              {studentData.firstNameENG} {studentData.fatherNameENG}
            </CardTitle>
            <CardDescription>
              {studentData.departmentEnrolled} Student
            </CardDescription>
            <Badge variant="secondary" className="mt-2">
              {studentData.programModality}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{studentData.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{studentData.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>
                {studentData.currentAddressWoreda},{" "}
                {studentData.currentAddressRegion}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Enrolled: September 2023</span>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstNameAMH">First Name (Amharic)</Label>
                <Input
                  id="firstNameAMH"
                  value={studentData.firstNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstNameENG">First Name (English)</Label>
                <Input
                  id="firstNameENG"
                  value={studentData.firstNameENG}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatherNameAMH">Father's Name (Amharic)</Label>
                <Input
                  id="fatherNameAMH"
                  value={studentData.fatherNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherNameENG">Father's Name (English)</Label>
                <Input
                  id="fatherNameENG"
                  value={studentData.fatherNameENG}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grandfatherNameAMH">
                  Grandfather's Name (Amharic)
                </Label>
                <Input
                  id="grandfatherNameAMH"
                  value={studentData.grandfatherNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grandfatherNameENG">
                  Grandfather's Name (English)
                </Label>
                <Input
                  id="grandfatherNameENG"
                  value={studentData.grandfatherNameENG}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherNameAMH">Mother's Name (Amharic)</Label>
                <Input
                  id="motherNameAMH"
                  value={studentData.motherNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherNameENG">Mother's Name (English)</Label>
                <Input
                  id="motherNameENG"
                  value={studentData.motherNameENG}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherFatherNameAMH">
                  Mother's Father Name (Amharic)
                </Label>
                <Input
                  id="motherFatherNameAMH"
                  value={studentData.motherFatherNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherFatherNameENG">
                  Mother's Father Name (English)
                </Label>
                <Input
                  id="motherFatherNameENG"
                  value={studentData.motherFatherNameENG}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirthGC">Date of Birth (GC)</Label>
                <Input
                  id="dateOfBirthGC"
                  value={studentData.dateOfBirthGC}
                  type="date"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" value={studentData.gender} readOnly />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current Address</Label>
              <Input
                id="currentAddress"
                value={`${studentData.currentAddressWoreda}, ${studentData.currentAddressZone}, ${studentData.currentAddressRegion}`}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Place of Birth</Label>
              <Input
                id="placeOfBirth"
                value={`${studentData.placeOfBirthWoreda}, ${studentData.placeOfBirthZone}, ${studentData.placeOfBirthRegion}`}
                readOnly
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Academic Information
          </CardTitle>
          <CardDescription>
            Your academic details and program information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departmentEnrolled">Department Enrolled</Label>
              <Input
                id="departmentEnrolled"
                value={studentData.departmentEnrolled}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="programModality">Program Modality</Label>
              <Input
                id="programModality"
                value={studentData.programModality}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolBackground">School Background</Label>
              <Input
                id="schoolBackground"
                value={studentData.schoolBackground}
                readOnly
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="grade12ExamResult">Grade 12 Exam Result</Label>
            <img
              src={studentData.grade12ExamResult}
              alt="Grade 12 Exam Result"
              className="w-64 h-36 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
          <CardDescription>Emergency contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPersonFirstNameAMH">
                Contact First Name (Amharic)
              </Label>
              <Input
                id="contactPersonFirstNameAMH"
                value={studentData.contactPersonFirstNameAMH}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPersonFirstNameENG">
                Contact First Name (English)
              </Label>
              <Input
                id="contactPersonFirstNameENG"
                value={studentData.contactPersonFirstNameENG}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPersonLastNameAMH">
                Contact Last Name (Amharic)
              </Label>
              <Input
                id="contactPersonLastNameAMH"
                value={studentData.contactPersonLastNameAMH}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPersonLastNameENG">
                Contact Last Name (English)
              </Label>
              <Input
                id="contactPersonLastNameENG"
                value={studentData.contactPersonLastNameENG}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPersonPhoneNumber">Phone Number</Label>
              <Input
                id="contactPersonPhoneNumber"
                value={studentData.contactPersonPhoneNumber}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPersonRelation">Relationship</Label>
              <Input
                id="contactPersonRelation"
                value={studentData.contactPersonRelation}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Progress</CardTitle>
          <CardDescription>
            Your academic performance and course history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Semester
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Course
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Grade
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
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
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
        </CardContent>
      </Card>
    </div>
  );
}
