"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, ArrowLeft, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateTeacher() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    qualification: "",
    specialization: "",
    experience: "",
    courses: [] as string[],
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const qualifications = [
    "Bachelor's Degree",
    "Master's Degree", 
    "PhD",
    "MD",
    "Postgraduate Diploma",
    "Professional Certificate"
  ];

  const specializations = [
    "Internal Medicine",
    "Surgery",
    "Pediatrics",
    "Obstetrics & Gynecology",
    "Pharmacology",
    "Anatomy",
    "Physiology",
    "Pathology",
    "Microbiology",
    "Biochemistry",
    "Public Health",
    "Nursing",
    "Radiology",
    "Laboratory Science"
  ];

  const availableCourses = [
    "BIO101 - General Biology",
    "CHE201 - Organic Chemistry",
    "PHY110 - Physics I",
    "MAT130 - Calculus",
    "ANA101 - Human Anatomy",
    "PHY201 - Human Physiology",
    "PHM301 - Pharmacology",
    "MIC201 - Microbiology",
    "BCH201 - Biochemistry",
    "PAT301 - Pathology",
    "NUR101 - Fundamentals of Nursing",
    "RAD201 - Radiographic Techniques"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCourseToggle = (course: string) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter(c => c !== course)
        : [...prev.courses, course]
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.qualification || !formData.specialization || !formData.experience || 
        !formData.password) {
      toast({
        title: "Validation Error",
        description: "All required fields must be filled",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }

    if (formData.courses.length === 0) {
      toast({
        title: "Course Selection Required",
        description: "Please select at least one course",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Teacher created successfully",
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        qualification: "",
        specialization: "",
        experience: "",
        courses: [],
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create teacher",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/head/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create Teacher</h1>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Teacher Information
          </CardTitle>
          <CardDescription>
            Create a new teacher account with login credentials and course assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Highest Qualification</Label>
                  <Select value={formData.qualification} onValueChange={(value) => handleInputChange("qualification", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualifications.map((qual) => (
                        <SelectItem key={qual} value={qual}>
                          {qual}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select value={formData.specialization} onValueChange={(value) => handleInputChange("specialization", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="Enter years of experience"
                  required
                />
              </div>
            </div>

            {/* Course Assignment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Course Assignment</h3>
              <div className="space-y-2">
                <Label>Select Courses to Teach</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-4">
                  {availableCourses.map((course) => (
                    <label key={course} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.courses.includes(course)}
                        onChange={() => handleCourseToggle(course)}
                        className="rounded"
                      />
                      <span className="text-sm">{course}</span>
                    </label>
                  ))}
                </div>
                {formData.courses.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Selected: {formData.courses.length} course(s)
                  </div>
                )}
              </div>
            </div>

            {/* Login Credentials */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Login Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Teacher"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                qualification: "",
                specialization: "",
                experience: "",
                courses: [],
                password: "",
                confirmPassword: "",
              })}>
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
