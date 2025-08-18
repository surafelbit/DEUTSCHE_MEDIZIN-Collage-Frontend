// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Checkbox } from "@/components/ui/checkbox"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { GraduationCap, ArrowLeft } from "lucide-react"
// import { Link } from "react-router-dom"

// export default function RegisterPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Home
//           </Link>
//           <ThemeToggle />
//         </div>

//         <Card>
//           <CardHeader className="text-center">
//             <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
//               <GraduationCap className="h-8 w-8 text-white" />
//             </div>
//             <CardTitle className="text-2xl">Student Registration</CardTitle>
//             <CardDescription>Apply to DEUTSCHE HOCHSCHULE FÜR MEDIZIN COLLEGE</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Personal Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Personal Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input id="firstName" placeholder="Enter your first name" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="lastName">Last Name</Label>
//                   <Input id="lastName" placeholder="Enter your last name" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address</Label>
//                   <Input id="email" type="email" placeholder="your.email@example.com" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input id="phone" placeholder="+49 123 456 7890" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="dateOfBirth">Date of Birth</Label>
//                   <Input id="dateOfBirth" type="date" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="nationality">Nationality</Label>
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select nationality" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="german">German</SelectItem>
//                       <SelectItem value="eu">EU Citizen</SelectItem>
//                       <SelectItem value="international">International</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>

//             {/* Academic Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Academic Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="program">Desired Program</Label>
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select program" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="medicine">Medicine (MD)</SelectItem>
//                       <SelectItem value="dentistry">Dentistry</SelectItem>
//                       <SelectItem value="pharmacy">Pharmacy</SelectItem>
//                       <SelectItem value="nursing">Nursing</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="startYear">Intended Start Year</Label>
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select year" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="2024">2024</SelectItem>
//                       <SelectItem value="2025">2025</SelectItem>
//                       <SelectItem value="2026">2026</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="previousEducation">Previous Education</Label>
//                 <Input id="previousEducation" placeholder="High School / University Name" />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="gpa">GPA / Grade Average</Label>
//                   <Input id="gpa" placeholder="e.g., 3.8 or 1.5 (German system)" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="graduationYear">Graduation Year</Label>
//                   <Input id="graduationYear" placeholder="e.g., 2023" />
//                 </div>
//               </div>
//             </div>

//             {/* Address Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Address Information</h3>
//               <div className="space-y-2">
//                 <Label htmlFor="address">Street Address</Label>
//                 <Input id="address" placeholder="Enter your street address" />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="city">City</Label>
//                   <Input id="city" placeholder="City" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="state">State/Province</Label>
//                   <Input id="state" placeholder="State" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="zipCode">ZIP Code</Label>
//                   <Input id="zipCode" placeholder="ZIP Code" />
//                 </div>
//               </div>
//             </div>

//             {/* Personal Statement */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Personal Statement</h3>
//               <div className="space-y-2">
//                 <Label htmlFor="statement">Why do you want to study at DHFM College?</Label>
//                 <Textarea
//                   id="statement"
//                   placeholder="Tell us about your motivation, goals, and why you chose our college..."
//                   className="min-h-32"
//                 />
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="space-y-4">
//               <div className="flex items-center space-x-2">
//                 <Checkbox id="terms" />
//                 <Label htmlFor="terms" className="text-sm">
//                   I agree to the{" "}
//                   <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
//                     Terms and Conditions
//                   </a>{" "}
//                   and{" "}
//                   <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
//                     Privacy Policy
//                   </a>
//                 </Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox id="newsletter" />
//                 <Label htmlFor="newsletter" className="text-sm">
//                   I would like to receive updates about my application and college news
//                 </Label>
//               </div>
//             </div>

//             <Button className="w-full" size="lg">
//               Submit Application
//             </Button>

//             <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
//                 Sign in here
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    // Application type
    admissionType: "",

    // Personal Data
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    age: "",
    visionImpairment: "",
    hearingImpairment: "",
    otherImpairment: "",

    // Birth Information
    birthTown: "",
    birthWoreda: "",
    birthZone: "",
    birthRegion: "",
    birthDateEC: "",
    birthMonthEC: "",
    birthYearEC: "",
    birthDateGC: "",
    birthMonthGC: "",
    birthYearGC: "",

    // Current Address
    currentRegion: "",
    currentZone: "",
    currentWoreda: "",
    currentSubCity: "",
    currentKebele: "",
    currentHouseNo: "",
    poBox: "",
    email: "",
    phoneNo: "",

    // Marital Status
    maritalStatus: "",

    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyHomePhone: "",
    emergencyOfficePhone: "",
    emergencyMobile: "",
    emergencyRegion: "",
    emergencyZone: "",
    emergencyWoreda: "",
    emergencySubCity: "",
    emergencyKebele: "",
    emergencyHouseNo: "",

    // Family Background
    fatherName: "",
    fatherRegion: "",
    fatherZone: "",
    fatherWoreda: "",
    fatherSubCity: "",
    fatherKebele: "",
    fatherHouseNo: "",
    motherName: "",
    motherRegion: "",
    motherZone: "",
    motherWoreda: "",
    motherKifleKetema: "",
    motherKebele: "",
    motherHouseNo: "",

    // Educational Information
    schools: [
      {
        name: "",
        town: "",
        year: "",
        grades: { 9: false, 10: false, 11: false, 12: false },
      },
      {
        name: "",
        town: "",
        year: "",
        grades: { 9: false, 10: false, 11: false, 12: false },
      },
      {
        name: "",
        town: "",
        year: "",
        grades: { 9: false, 10: false, 11: false, 12: false },
      },
    ],
    prepStream: "",
    studyChoice: "",

    // EHEECE Information
    subjects: [
      { name: "", regNo: "", year: "", grade: "" },
      { name: "", regNo: "", year: "", grade: "" },
      { name: "", regNo: "", year: "", grade: "" },
      { name: "", regNo: "", year: "", grade: "" },
      { name: "", regNo: "", year: "", grade: "" },
      { name: "", regNo: "", year: "", grade: "" },
      { name: "", regNo: "", year: "", grade: "" },
    ],

    // Post Secondary Education
    hasPostSecondary: "",
    institutions: [
      { name: "", country: "", yearFrom: "", yearTo: "", gpa: "", awarded: "" },
      { name: "", country: "", yearFrom: "", yearTo: "", gpa: "", awarded: "" },
    ],

    // Employment
    currentlyEmployed: "",
    currentEmployer: "",
    currentJobType: "",
    currentEmployerAddress: "",
    currentEmployerPhone: "",
    employmentHistory: [
      {
        type: "",
        employer: "",
        poBox: "",
        telephone: "",
        yearFrom: "",
        yearTo: "",
      },
      {
        type: "",
        employer: "",
        poBox: "",
        telephone: "",
        yearFrom: "",
        yearTo: "",
      },
      {
        type: "",
        employer: "",
        poBox: "",
        telephone: "",
        yearFrom: "",
        yearTo: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleGradeChange = (schoolIndex, grade, checked) => {
    setFormData((prev) => ({
      ...prev,
      schools: prev.schools.map((school, i) =>
        i === schoolIndex
          ? { ...school, grades: { ...school.grades, [grade]: checked } }
          : school
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Registrar Office
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          LIFE HISTORY FORM, UNDERGRADUATE PROGRAM
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          This form, completed and accompanied by all necessary education
          documents, must be returned to the Registrar's Office on or before the
          end of the registration date declared by the Registrar of the College.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. APPLICATION */}
        <section className="border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            1. APPLICATION
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admission:
            </label>
            <div className="flex gap-6">
              {["Regular", "Extension", "Summer"].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="admissionType"
                    value={type}
                    checked={formData.admissionType === type}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* 2. PERSONAL DATA */}
        <section className="border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">2.</h3>

          {/* Full Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name (English):
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sex and Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sex:
              </label>
              <div className="flex gap-4">
                {["Male", "Female"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value={gender}
                      checked={formData.sex === gender}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age:
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Impairment Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Information about Impairment (if any):
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Vision:
                </label>
                <input
                  type="text"
                  name="visionImpairment"
                  value={formData.visionImpairment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Hearing:
                </label>
                <input
                  type="text"
                  name="hearingImpairment"
                  value={formData.hearingImpairment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Any other:
                </label>
                <input
                  type="text"
                  name="otherImpairment"
                  value={formData.otherImpairment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Place of Birth */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place of Birth:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Town</label>
                <input
                  type="text"
                  name="birthTown"
                  value={formData.birthTown}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Woreda
                </label>
                <input
                  type="text"
                  name="birthWoreda"
                  value={formData.birthWoreda}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Zone</label>
                <input
                  type="text"
                  name="birthZone"
                  value={formData.birthZone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Region
                </label>
                <input
                  type="text"
                  name="birthRegion"
                  value={formData.birthRegion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth:
            </label>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Ethiopian Calendar (E.C)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="birthDateEC"
                    placeholder="Date"
                    value={formData.birthDateEC}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="birthMonthEC"
                    placeholder="Month"
                    value={formData.birthMonthEC}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="birthYearEC"
                    placeholder="Year"
                    value={formData.birthYearEC}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Gregorian Calendar (G.C)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="birthDateGC"
                    placeholder="Date"
                    value={formData.birthDateGC}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="birthMonthGC"
                    placeholder="Month"
                    value={formData.birthMonthGC}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="birthYearGC"
                    placeholder="Year"
                    value={formData.birthYearGC}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Current Residential Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Residential Address:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Region
                </label>
                <input
                  type="text"
                  name="currentRegion"
                  value={formData.currentRegion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Zone</label>
                <input
                  type="text"
                  name="currentZone"
                  value={formData.currentZone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Woreda(Town)
                </label>
                <input
                  type="text"
                  name="currentWoreda"
                  value={formData.currentWoreda}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Sub-City
                </label>
                <input
                  type="text"
                  name="currentSubCity"
                  value={formData.currentSubCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Kebele
                </label>
                <input
                  type="text"
                  name="currentKebele"
                  value={formData.currentKebele}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  House No.
                </label>
                <input
                  type="text"
                  name="currentHouseNo"
                  value={formData.currentHouseNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  P.O Box
                </label>
                <input
                  type="text"
                  name="poBox"
                  value={formData.poBox}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Phone No.
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Marital Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marital Status:
            </label>
            <div className="flex flex-wrap gap-4">
              {["Single", "Married", "Divorced", "Separated"].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={status}
                    checked={formData.maritalStatus === status}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person in case of Emergency:
            </label>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Relations
                  </label>
                  <input
                    type="text"
                    name="emergencyRelation"
                    value={formData.emergencyRelation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Telephone:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="tel"
                    name="emergencyHomePhone"
                    placeholder="Home"
                    value={formData.emergencyHomePhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="emergencyOfficePhone"
                    placeholder="Office"
                    value={formData.emergencyOfficePhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="emergencyMobile"
                    placeholder="Mobile"
                    value={formData.emergencyMobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Address:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="emergencyRegion"
                    placeholder="Region"
                    value={formData.emergencyRegion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="emergencyZone"
                    placeholder="Zone"
                    value={formData.emergencyZone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="emergencyWoreda"
                    placeholder="Woreda/Town"
                    value={formData.emergencyWoreda}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="emergencySubCity"
                    placeholder="Sub-City"
                    value={formData.emergencySubCity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="emergencyKebele"
                    placeholder="Kebele"
                    value={formData.emergencyKebele}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="emergencyHouseNo"
                    placeholder="House No."
                    value={formData.emergencyHouseNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FAMILY BACKGROUND */}
        <section className="border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            3. FAMILY BACKGROUND
          </h3>

          {/* Father Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father Full Name:
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <label className="block text-xs text-gray-500 mb-1">Address:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="fatherRegion"
                placeholder="Region"
                value={formData.fatherRegion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="fatherZone"
                placeholder="Zone"
                value={formData.fatherZone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="fatherWoreda"
                placeholder="Woreda/Town"
                value={formData.fatherWoreda}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="fatherSubCity"
                placeholder="Sub-City"
                value={formData.fatherSubCity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="fatherKebele"
                placeholder="Kebele"
                value={formData.fatherKebele}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="fatherHouseNo"
                placeholder="House No."
                value={formData.fatherHouseNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Mother Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother Full Name:
            </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <label className="block text-xs text-gray-500 mb-1">Address:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="motherRegion"
                placeholder="Region"
                value={formData.motherRegion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="motherZone"
                placeholder="Zone"
                value={formData.motherZone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="motherWoreda"
                placeholder="Woreda/Town"
                value={formData.motherWoreda}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="motherKifleKetema"
                placeholder="Kifle Ketema"
                value={formData.motherKifleKetema}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="motherKebele"
                placeholder="Kebele"
                value={formData.motherKebele}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="motherHouseNo"
                placeholder="House No."
                value={formData.motherHouseNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* 4. EDUCATIONAL INFORMATION */}
        <section className="border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            4. EDUCATIONAL INFORMATION
          </h3>

          {/* Secondary Schools */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary School(s) Attended (List last three Schools):
            </label>
            {formData.schools.map((school, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-200 rounded-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      School
                    </label>
                    <input
                      type="text"
                      value={school.name}
                      onChange={(e) =>
                        handleNestedChange(
                          "schools",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Town
                    </label>
                    <input
                      type="text"
                      value={school.town}
                      onChange={(e) =>
                        handleNestedChange(
                          "schools",
                          index,
                          "town",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Attended Year (E.C)
                    </label>
                    <input
                      type="text"
                      value={school.year}
                      onChange={(e) =>
                        handleNestedChange(
                          "schools",
                          index,
                          "year",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Last Grade Complete:
                  </label>
                  <div className="flex gap-4">
                    {[9, 10, 11, 12].map((grade) => (
                      <label key={grade} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={school.grades[grade]}
                          onChange={(e) =>
                            handleGradeChange(index, grade, e.target.checked)
                          }
                          className="mr-1"
                        />
                        {grade}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preparatory Stream */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Indicate Your Preparatory School Stream:
            </label>
            <div className="flex flex-wrap gap-4">
              {["Natural Science", "Social Science"].map((stream) => (
                <label key={stream} className="flex items-center">
                  <input
                    type="radio"
                    name="prepStream"
                    value={stream}
                    checked={formData.prepStream === stream}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {stream}
                </label>
              ))}
              <div className="flex items-center">
                <input
                  type="radio"
                  name="prepStream"
                  value="Other"
                  checked={formData.prepStream === "Other"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="mr-2">Others Specify:</span>
                <input
                  type="text"
                  className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={formData.prepStream !== "Other"}
                />
              </div>
            </div>
          </div>

          {/* Study Choice */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Indicate Your Choice of Study:
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                "Medicine",
                "MRT",
                "Nursing",
                "Accounting & Finance",
                "Management",
              ].map((choice) => (
                <label key={choice} className="flex items-center">
                  <input
                    type="radio"
                    name="studyChoice"
                    value={choice}
                    checked={formData.studyChoice === choice}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {choice}
                </label>
              ))}
            </div>
          </div>

          {/* EHEECE Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ethiopian Higher Education Entrance Certificate Examination
              (EHEECE) information (write five/seven subjects with the best
              grade earned. Math's & English must be included):
            </label>
            <div className="space-y-3">
              {formData.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) =>
                        handleNestedChange(
                          "subjects",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      EHEECE Reg. No.
                    </label>
                    <input
                      type="text"
                      value={subject.regNo}
                      onChange={(e) =>
                        handleNestedChange(
                          "subjects",
                          index,
                          "regNo",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Year (E.C)
                    </label>
                    <input
                      type="text"
                      value={subject.year}
                      onChange={(e) =>
                        handleNestedChange(
                          "subjects",
                          index,
                          "year",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Grade (Mark)
                    </label>
                    <input
                      type="text"
                      value={subject.grade}
                      onChange={(e) =>
                        handleNestedChange(
                          "subjects",
                          index,
                          "grade",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Post Secondary Education */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Have you ever been enrolled in any post-secondary education
              (University or College level) institution in Ethiopia or Abroad?
            </label>
            <div className="flex gap-4 mb-4">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="hasPostSecondary"
                    value={option}
                    checked={formData.hasPostSecondary === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            {formData.hasPostSecondary === "Yes" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If your answer is yes, give the detail below:
                </label>
                <div className="space-y-4">
                  {formData.institutions.map((institution, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 rounded-md"
                    >
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Name of Institution
                        </label>
                        <input
                          type="text"
                          value={institution.name}
                          onChange={(e) =>
                            handleNestedChange(
                              "institutions",
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          value={institution.country}
                          onChange={(e) =>
                            handleNestedChange(
                              "institutions",
                              index,
                              "country",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Years Attended
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="From"
                            value={institution.yearFrom}
                            onChange={(e) =>
                              handleNestedChange(
                                "institutions",
                                index,
                                "yearFrom",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="To"
                            value={institution.yearTo}
                            onChange={(e) =>
                              handleNestedChange(
                                "institutions",
                                index,
                                "yearTo",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          GPA Earned
                        </label>
                        <input
                          type="text"
                          value={institution.gpa}
                          onChange={(e) =>
                            handleNestedChange(
                              "institutions",
                              index,
                              "gpa",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Awarded
                        </label>
                        <input
                          type="text"
                          value={institution.awarded}
                          onChange={(e) =>
                            handleNestedChange(
                              "institutions",
                              index,
                              "awarded",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. EMPLOYMENT */}
        <section className="border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            5. EMPLOYMENT
          </h3>

          {/* Current Employment */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are You Currently Employed?
            </label>
            <div className="flex gap-4 mb-4">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="currentlyEmployed"
                    value={option}
                    checked={formData.currentlyEmployed === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            {formData.currentlyEmployed === "Yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Employer
                  </label>
                  <input
                    type="text"
                    name="currentEmployer"
                    value={formData.currentEmployer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Type of Job
                  </label>
                  <input
                    type="text"
                    name="currentJobType"
                    value={formData.currentJobType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="currentEmployerAddress"
                    value={formData.currentEmployerAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    name="currentEmployerPhone"
                    value={formData.currentEmployerPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Employment History */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              List at least three employments:
            </label>
            <div className="space-y-4">
              {formData.employmentHistory.map((employment, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-md"
                >
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Type of work
                    </label>
                    <input
                      type="text"
                      value={employment.type}
                      onChange={(e) =>
                        handleNestedChange(
                          "employmentHistory",
                          index,
                          "type",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Employer
                    </label>
                    <input
                      type="text"
                      value={employment.employer}
                      onChange={(e) =>
                        handleNestedChange(
                          "employmentHistory",
                          index,
                          "employer",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      P.O Box
                    </label>
                    <input
                      type="text"
                      value={employment.poBox}
                      onChange={(e) =>
                        handleNestedChange(
                          "employmentHistory",
                          index,
                          "poBox",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      value={employment.telephone}
                      onChange={(e) =>
                        handleNestedChange(
                          "employmentHistory",
                          index,
                          "telephone",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Service Year
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="From"
                        value={employment.yearFrom}
                        onChange={(e) =>
                          handleNestedChange(
                            "employmentHistory",
                            index,
                            "yearFrom",
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="To"
                        value={employment.yearTo}
                        onChange={(e) =>
                          handleNestedChange(
                            "employmentHistory",
                            index,
                            "yearTo",
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. STATEMENT BY THE APPLICANT */}
        <section className="border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            6. STATEMENT BY THE APPLICANT
          </h3>
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              I hereby certify that all information given in this form is
              complete, correct and accurate. I fully realize that the college
              is entitled to take any action on me including dismissal if the
              information given by me here is found incorrect or misleading at
              any time. I also realize that I will not be entitled to any
              reimbursement of whatever fee I might have paid in case where the
              college takes any action on me as a result of any incorrect or
              misleading information given by me. I further undertake to observe
              all the rules and regulations of the college and refrain from any
              activity which may be contrary to the interest of the Ethiopian
              broad masses. I shall also take full responsibility for reading
              and abiding by the rules and regulations of the college student
              hand book deposited at the college Library system and that of my
              department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Applicant's Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Applicant's Signature
              </label>
              <input
                type="text"
                placeholder="Digital signature or type name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Office Use Only */}
        <section className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
          <div className="border-t-2 border-red-400 pt-4">
            <h3 className="text-lg font-semibold text-red-800 mb-4">
              DO NOT WRITE BELOW THIS LINE
            </h3>
            <p className="text-sm font-medium text-red-700 mb-4">
              Office personnel accepting this form:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-red-600 mb-1">Name:</label>
                <div className="w-full h-10 border-b-2 border-red-300"></div>
              </div>
              <div>
                <label className="block text-xs text-red-600 mb-1">
                  Signature:
                </label>
                <div className="w-full h-10 border-b-2 border-red-300"></div>
              </div>
              <div>
                <label className="block text-xs text-red-600 mb-1">Date:</label>
                <div className="w-full h-10 border-b-2 border-red-300"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Registration Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
