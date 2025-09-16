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
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import apiService from "@/components/api/apiService";
import endPoints from "@/components/api/endPoints";
import LoadingSpinner from "@/designs/LoadingSpinner";
import UserNotFound from "@/designs/UserNotFound";

// Define the full ApplicantType interface matching your data
interface ApplicantType {
  firstNameAMH: string;
  firstNameENG: string;
  fatherNameAMH: string;
  fatherNameENG: string;
  grandfatherNameAMH: string;
  grandfatherNameENG: string;
  motherNameAMH: string;
  motherNameENG: string;
  motherFatherNameAMH: string;
  motherFatherNameENG: string;
  gender: string;
  age: number;
  phoneNumber: string;
  dateOfBirthEC: string;
  dateOfBirthGC: string;
  placeOfBirthWoreda: string;
  placeOfBirthZone: string;
  placeOfBirthRegion: string;
  currentAddressWoreda: string;
  currentAddressZone: string;
  currentAddressRegion: string;
  email: string;
  maritalStatus: string;
  impairment: string;
  schoolBackground: string;
  studentPhoto: string;
  contactPersonFirstNameAMH: string;
  contactPersonFirstNameENG: string;
  contactPersonLastNameAMH: string;
  contactPersonLastNameENG: string;
  contactPersonPhoneNumber: string;
  contactPersonRelation: string;
  departmentEnrolled: string;
  programModality: string;
  grade12ExamResult: string;
}

export default function ApplicantDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Type useParams to ensure id is string
  const [status, setStatus] = useState<"accepted" | "rejected" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [applicant, setApplicant] = useState<ApplicantType | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchApplicant() {
      try {
        setIsLoading(true);
        const url = endPoints.applicantDetail.replace(":id", id ?? ""); // Fallback for undefined id
        const response = await apiService.get<ApplicantType>(url); // Type the API response
        setApplicant(response.data); // Adjust based on your apiService response structure
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) {
      fetchApplicant();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  // Remove duplicate useEffect (it was empty and redundant)
  const handleStatusChange = (newStatus: "accepted" | "rejected") => {
    // Uncomment if remarks are required
    // if (remarks.trim() === "") {
    //   alert("Please provide remarks before submitting.");
    //   return;
    // }
    setStatus(newStatus);
  };

  const handlePasswordSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }
    setPasswordError("");
    alert("Password successfully set!");
    // Add API call here to send password to backend
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!applicant) {
    return <UserNotFound />;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Applicant Details</h1>
        <div className="flex space-x-2">
          <Link
            to="#"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="mr-2">&larr;</span>
            <span>Back to Applicant List</span>
          </Link>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Applicant
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="w-32 h-32">
                <AvatarImage src={applicant.studentPhoto} alt="Student Photo" />
                <AvatarFallback className="text-2xl">
                  {applicant.firstNameENG[0]}
                  {applicant.fatherNameENG[0]}
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
              {applicant.firstNameENG} {applicant.fatherNameENG}
            </CardTitle>
            <CardDescription>
              {applicant.departmentEnrolled} Applicant
            </CardDescription>
            <Badge variant="secondary" className="mt-2">
              {applicant.programModality}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{applicant.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{applicant.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>
                {applicant.currentAddressWoreda},{" "}
                {applicant.currentAddressRegion}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Application: September 2023</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Applicant personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstNameAMH">First Name (Amharic)</Label>
                <Input
                  id="firstNameAMH"
                  value={applicant.firstNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstNameENG">First Name (English)</Label>
                <Input
                  id="firstNameENG"
                  value={applicant.firstNameENG}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatherNameAMH">Father's Name (Amharic)</Label>
                <Input
                  id="fatherNameAMH"
                  value={applicant.fatherNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherNameENG">Father's Name (English)</Label>
                <Input
                  id="fatherNameENG"
                  value={applicant.fatherNameENG}
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
                  value={applicant.grandfatherNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grandfatherNameENG">
                  Grandfather's Name (English)
                </Label>
                <Input
                  id="grandfatherNameENG"
                  value={applicant.grandfatherNameENG}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherNameAMH">Mother's Name (Amharic)</Label>
                <Input
                  id="motherNameAMH"
                  value={applicant.motherNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherNameENG">Mother's Name (English)</Label>
                <Input
                  id="motherNameENG"
                  value={applicant.motherNameENG}
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
                  value={applicant.motherFatherNameAMH}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherFatherNameENG">
                  Mother's Father Name (English)
                </Label>
                <Input
                  id="motherFatherNameENG"
                  value={applicant.motherFatherNameENG}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirthGC">Date of Birth (GC)</Label>
                <Input
                  id="dateOfBirthGC"
                  value={applicant.dateOfBirthGC}
                  type="date"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" value={applicant.gender} readOnly />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current Address</Label>
              <Input
                id="currentAddress"
                value={`${applicant.currentAddressWoreda}, ${applicant.currentAddressZone}, ${applicant.currentAddressRegion}`}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Place of Birth</Label>
              <Input
                id="placeOfBirth"
                value={`${applicant.placeOfBirthWoreda}, ${applicant.placeOfBirthZone}, ${applicant.placeOfBirthRegion}`}
                readOnly
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Academic Information
          </CardTitle>
          <CardDescription>
            Applicant academic details and program information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departmentEnrolled">Department Applied</Label>
              <Input
                id="departmentEnrolled"
                value={applicant.departmentEnrolled}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="programModality">Program Modality</Label>
              <Input
                id="programModality"
                value={applicant.programModality}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolBackground">School Background</Label>
              <Input
                id="schoolBackground"
                value={applicant.schoolBackground}
                readOnly
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="grade12ExamResult">Grade 12 Exam Result</Label>
            <img
              src={applicant.grade12ExamResult}
              alt="Grade 12 Exam Result"
              className="w-64 h-36 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
            />
          </div>
        </CardContent>
      </Card>

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
                value={applicant.contactPersonFirstNameAMH}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPersonFirstNameENG">
                Contact First Name (English)
              </Label>
              <Input
                id="contactPersonFirstNameENG"
                value={applicant.contactPersonFirstNameENG}
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
                value={applicant.contactPersonLastNameAMH}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPersonLastNameENG">
                Contact Last Name (English)
              </Label>
              <Input
                id="contactPersonLastNameENG"
                value={applicant.contactPersonLastNameENG}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPersonPhoneNumber">Phone Number</Label>
              <Input
                id="contactPersonPhoneNumber"
                value={applicant.contactPersonPhoneNumber}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPersonRelation">Relationship</Label>
              <Input
                id="contactPersonRelation"
                value={applicant.contactPersonRelation}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acceptance/Rejection</CardTitle>
          <CardDescription>
            Review and decide on applicant status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks for acceptance or rejection"
            />
          </div>
          <div className="flex space-x-4">
            <Button
              variant="default"
              onClick={() => handleStatusChange("accepted")}
              disabled={status !== null}
              className="bg-green-600 hover:bg-green-700"
            >
              Accept Applicant
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleStatusChange("rejected")}
              disabled={status !== null}
            >
              Reject Applicant
            </Button>
          </div>
          {status && (
            <Alert>
              <AlertTitle>
                {status === "accepted"
                  ? "Applicant Accepted"
                  : "Applicant Rejected"}
              </AlertTitle>
              <AlertDescription>
                Status has been set to {status}. Remarks: {remarks}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {status === "accepted" && (
        <Card>
          <CardHeader>
            <CardTitle>Create Applicant Password</CardTitle>
            <CardDescription>
              Set a new password for the accepted applicant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            {passwordError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{passwordError}</AlertDescription>
              </Alert>
            )}
            <Button onClick={handlePasswordSubmit}>Set Password</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
