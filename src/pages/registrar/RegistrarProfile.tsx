"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  UserCircle,
  AlertCircle,
  Shield,
  FileText,
  Loader2,
  Save,
  Edit,
  X,
  Camera,
  Key,
} from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../../components/api/apiClient";
import endPoints from "../../components/api/endPoints";

interface RegistrarProfileResponse {
  id: number;
  username: string;
  firstNameAmharic: string;
  lastNameAmharic: string;
  firstNameEnglish: string;
  lastNameEnglish: string;
  email: string;
  phoneNumber: string;
  hasPhoto: boolean;
  hasNationalId: boolean;
  enabled: boolean;
}

interface UpdateRegistrarRequest {
  firstNameAmharic?: string;
  lastNameAmharic?: string;
  firstNameEnglish?: string;
  lastNameEnglish?: string;
  email?: string;
  phoneNumber?: string;
}

export default function RegistrarProfile() {
  const [profile, setProfile] = useState<RegistrarProfileResponse | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState<UpdateRegistrarRequest>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
  const [nationalIdPreview, setNationalIdPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch registrar profile using endpoint
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get<RegistrarProfileResponse>(
        endPoints.getRegistrarProfile
      );
      const data = response.data;
      setProfile(data);

      // Initialize form data
      const initialFormData: UpdateRegistrarRequest = {
        firstNameEnglish: data.firstNameEnglish,
        firstNameAmharic: data.firstNameAmharic,
        lastNameEnglish: data.lastNameEnglish,
        lastNameAmharic: data.lastNameAmharic,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };
      setFormData(initialFormData);

      // Fetch photo if hasPhoto is true using endpoint
      if (data.hasPhoto) {
        await fetchPhoto(data.id);
      }
    } catch (err: any) {
      console.error("Failed to load registrar profile:", err);
      if (err.response?.status === 403) {
        setError("Access Denied: You do not have registrar privileges.");
      } else {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Failed to load profile. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch registrar photo using endpoint
  const fetchPhoto = async (registrarId: number) => {
    try {
      setLoadingPhoto(true);
      const response = await apiClient.get(endPoints.getRegistrarPhoto(registrarId), {
        responseType: "arraybuffer",
      });

      // Convert array buffer to base64
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const photoUrl = `data:image/jpeg;base64,${base64}`;
      setPhotoBase64(photoUrl);
      setPhotoPreview(photoUrl);
    } catch (err: any) {
      console.error("Failed to load photo:", err);
      setPhotoBase64(null);
    } finally {
      setLoadingPhoto(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Photo file size must be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("National ID file size must be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file for National ID");
        return;
      }

      setNationalIdFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNationalIdPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const jsonData: UpdateRegistrarRequest = { ...formData };
      const jsonString = JSON.stringify(jsonData);
      const formDataToSend = new FormData();
      const jsonBlob = new Blob([jsonString], { type: "application/json" });
      formDataToSend.append("data", jsonBlob);

      if (photoFile) {
        formDataToSend.append("photograph", photoFile);
      }

      if (nationalIdFile) {
        formDataToSend.append("nationalIdImage", nationalIdFile);
      }

      await apiClient.patch(endPoints.updateRegistrarProfile, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Profile updated successfully!");
      setEditing(false);
      await fetchProfile();
      setPhotoFile(null);
      setNationalIdFile(null);
    } catch (err: any) {
      console.error("Failed to update profile:", err);
      if (err.response?.status === 400) {
        if (err.response?.data?.error?.includes("Photograph must be at most 2MB")) {
          setError("Photo must be at most 2MB in size");
        } else if (err.response?.data?.error?.includes("Phone number already in use")) {
          setError("Phone number is already in use. Please use a different phone number.");
        } else if (err.response?.data?.error?.includes("Email already in use")) {
          setError("Email is already in use. Please use a different email address.");
        } else {
          setError(err.response?.data?.error || "Failed to update profile");
        }
      } else if (err.response?.status === 403) {
        setError("Access Denied: You do not have permission to update this profile.");
      } else {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Failed to update profile. Please try again."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    if (profile) {
      const resetForm: UpdateRegistrarRequest = {
        firstNameEnglish: profile.firstNameEnglish,
        firstNameAmharic: profile.firstNameAmharic,
        lastNameEnglish: profile.lastNameEnglish,
        lastNameAmharic: profile.lastNameAmharic,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
      };
      setFormData(resetForm);
      setPhotoPreview(photoBase64);
    }
    setPhotoFile(null);
    setNationalIdFile(null);
    setNationalIdPreview(null);
  };

  const handleUploadPhotoClick = () => {
    if (!editing) {
      setEditing(true);
    }
    setTimeout(() => {
      document.getElementById("photo-upload")?.click();
    }, 100);
  };

  const handleUploadNationalIdClick = () => {
    if (!editing) {
      setEditing(true);
    }
    setTimeout(() => {
      document.getElementById("national-id-upload")?.click();
    }, 100);
  };

  const getFullNameEnglish = () => {
    if (!profile) return "";
    return `${formData.firstNameEnglish || profile.firstNameEnglish} ${
      formData.lastNameEnglish || profile.lastNameEnglish
    }`;
  };

  const getFullNameAmharic = () => {
    if (!profile) return "";
    return `${formData.firstNameAmharic || profile.firstNameAmharic} ${
      formData.lastNameAmharic || profile.lastNameAmharic
    }`;
  };

  const getInitials = () => {
    const firstName = formData.firstNameEnglish || profile?.firstNameEnglish || "";
    const lastName = formData.lastNameEnglish || profile?.lastNameEnglish || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-lg">Loading registrar profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-red-600 text-center px-4">{error}</p>
        <div className="flex space-x-4 mt-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
          <Button variant="default" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const hasPhoto = profile.hasPhoto || photoBase64 || photoPreview;
  const hasNationalId = profile.hasNationalId || nationalIdPreview;

  return (
    <div className="space-y-6">
      {/* Hidden file inputs */}
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />
      <input
        id="national-id-upload"
        type="file"
        accept="image/*"
        onChange={handleNationalIdChange}
        className="hidden"
      />

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
          <svg
            className="h-5 w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {/* Top Action Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-sm">
                <Shield className="h-3 w-3 mr-1" />
                Registrar Account
              </Badge>
              <Badge
                variant={profile.enabled ? "default" : "secondary"}
                className="text-sm"
              >
                {profile.enabled ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {!editing ? (
              <Button onClick={() => setEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Avatar & Basic Info */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="w-32 h-32 border-4 border-blue-100 dark:border-blue-900">
                {loadingPhoto ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : photoPreview ? (
                  <AvatarImage
                    src={photoPreview}
                    alt={getFullNameEnglish()}
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="text-2xl bg-blue-600 text-white font-semibold">
                    {getInitials()}
                  </AvatarFallback>
                )}
              </Avatar>
              {editing && (
                <div className="absolute bottom-0 right-0">
                  <button
                    onClick={handleUploadPhotoClick}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <CardTitle className="mt-4">{getFullNameEnglish()}</CardTitle>
            <CardDescription className="text-base">
              {getFullNameAmharic()}
            </CardDescription>
            <div className="mt-4">
              <Badge variant="secondary" className="text-sm">
                Registrar
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{formData.email || profile.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{formData.phoneNumber || profile.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <UserCircle className="h-4 w-4 text-gray-500" />
              <span>Username: {profile.username}</span>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Photo
                </span>
                <Badge variant={hasPhoto ? "default" : "secondary"}>
                  {hasPhoto ? "Uploaded" : "Not uploaded"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  National ID
                </span>
                <Badge variant={hasNationalId ? "default" : "secondary"}>
                  {hasNationalId ? "Uploaded" : "Not uploaded"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name (English)</Label>
                <Input
                  name="firstNameEnglish"
                  value={formData.firstNameEnglish || ""}
                  onChange={handleInputChange}
                  readOnly={!editing}
                  className={
                    !editing
                      ? "bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      : ""
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>First Name (አማርኛ)</Label>
                <Input
                  name="firstNameAmharic"
                  value={formData.firstNameAmharic || ""}
                  onChange={handleInputChange}
                  readOnly={!editing}
                  className={
                    !editing
                      ? "bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      : ""
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Last Name (English)</Label>
                <Input
                  name="lastNameEnglish"
                  value={formData.lastNameEnglish || ""}
                  onChange={handleInputChange}
                  readOnly={!editing}
                  className={
                    !editing
                      ? "bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      : ""
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name (አማርኛ)</Label>
                <Input
                  name="lastNameAmharic"
                  value={formData.lastNameAmharic || ""}
                  onChange={handleInputChange}
                  readOnly={!editing}
                  className={
                    !editing
                      ? "bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      : ""
                  }
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  readOnly={!editing}
                  className={
                    !editing
                      ? "bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      : ""
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleInputChange}
                  readOnly={!editing}
                  className={
                    !editing
                      ? "bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                      : ""
                  }
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={profile.username} readOnly className="bg-gray-50 dark:bg-gray-800 cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <Label>Account Status</Label>
                <Input
                  value={profile.enabled ? "Active" : "Inactive"}
                  readOnly
                  className="bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                />
              </div>
            </div>

            {/* National ID Upload Section */}
            {editing && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      National ID (Optional)
                    </Label>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 dark:border-gray-600"
                      onClick={handleUploadNationalIdClick}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {nationalIdFile ? "Change National ID" : "Upload National ID"}
                    </Button>
                    <p className="text-xs text-gray-500">
                      Supports JPEG, PNG (max 2MB)
                    </p>
                  </div>

                  {nationalIdPreview && (
                    <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">National ID Preview</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setNationalIdFile(null);
                            setNationalIdPreview(null);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <img
                        src={nationalIdPreview}
                        alt="National ID Preview"
                        className="max-h-32 object-contain rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {nationalIdFile?.name}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Account Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>
            Your registrar account details and status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center">
                <UserCircle className="h-4 w-4 mr-2" />
                Account ID
              </Label>
              <Input value={profile.id.toString()} readOnly className="bg-gray-50 dark:bg-gray-800" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center">
                <UserCircle className="h-4 w-4 mr-2" />
                Account Created
              </Label>
              <Input value="Registrar Account" readOnly className="bg-gray-50 dark:bg-gray-800" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Files Preview (Edit Mode) */}
      {editing && (photoFile || nationalIdFile) && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {photoFile && (
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Camera className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Profile Photo</p>
                      <p className="text-sm text-gray-600">{photoFile.name}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPhotoFile(null);
                      setPhotoPreview(photoBase64);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                </div>
              )}

              {nationalIdFile && (
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">National ID</p>
                      <p className="text-sm text-gray-600">{nationalIdFile.name}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setNationalIdFile(null);
                      setNationalIdPreview(null);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}