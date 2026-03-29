"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, AlertCircle, Loader2, RefreshCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/components/api/apiClient";
import endPoints from "@/components/api/endPoints";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface RegistrarListItem {
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
  photo?: string | null;
}

// Sub-component to handle individual photo fetching
function RegistrarAvatar({
  id,
  fullName,
  initials,
}: {
  id: number;
  fullName: string;
  initials: string;
}) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentUrl: string | null = null;
    const fetchPhoto = async () => {
      try {
        const response = await apiClient.get(
          endPoints.getRegistrarPhoto.replace(":id", id.toString()),
          {
            responseType: "blob",
            headers: {
              Accept: "*/*"
            }
          }
        );
        // Creating an Object URL from the binary blob
        currentUrl = URL.createObjectURL(response.data);
        setPhotoUrl(currentUrl);
      } catch (err) {
        console.error(`Failed to fetch photo for registrar ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();

    // Cleanup: Revoke the Object URL to avoid memory leaks
    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
  }, [id]);

  return (
    <Avatar className="w-24 h-24 mx-auto border-4 border-blue-100 dark:border-blue-900 shadow-md">
      {loading ? (
        <AvatarFallback className="animate-pulse bg-gray-200" />
      ) : photoUrl ? (
        <AvatarImage src={photoUrl} alt={fullName} />
      ) : (
        <AvatarFallback className="text-2xl bg-blue-600 text-white font-bold">
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export default function RegistrarProfile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [registrars, setRegistrars] = useState<RegistrarListItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States for National ID Modal
  const [idModalId, setIdModalId] = useState<number | null>(null);
  const [idPhotoUrl, setIdPhotoUrl] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState(false);
  const [idModalOpen, setIdModalOpen] = useState(false);

  const fetchRegistrars = async () => {
    try {
      setLoadingList(true);
      setError(null);
      const response = await apiClient.get<RegistrarListItem[]>(
        endPoints.getRegistrar
      );
      setRegistrars(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to load registrars");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchRegistrars();
  }, []);

  const fetchNationalId = async (id: number) => {
    // Cleanup previous ID photo URL if it exists
    if (idPhotoUrl) URL.revokeObjectURL(idPhotoUrl);

    setLoadingId(true);
    setIdPhotoUrl(null);
    setIdModalId(id);
    setIdModalOpen(true);

    try {
      const response = await apiClient.get(
        endPoints.getRegistrarNationalID.replace(":id", id.toString()),
        {
          responseType: "blob",
          headers: {
            Accept: "*/*"
          }
        }
      );
      const url = URL.createObjectURL(response.data);
      setIdPhotoUrl(url);
    } catch (err) {
      console.error(`Failed to fetch national ID for registrar ${id}:`, err);
    } finally {
      setLoadingId(false);
    }
  };

  // Cleanup: Ensure the ID photo URL is revoked when modal changes or closes
  useEffect(() => {
    return () => {
      if (idPhotoUrl) URL.revokeObjectURL(idPhotoUrl);
    };
  }, [idPhotoUrl]);

  const filteredRegistrars = registrars.filter((registrar) => {
    const fullNameENG =
      `${registrar.firstNameEnglish} ${registrar.lastNameEnglish}`.toLowerCase();
    const fullNameAMH =
      `${registrar.firstNameAmharic} ${registrar.lastNameAmharic}`.toLowerCase();
    const search = searchQuery.toLowerCase();
    return (
      fullNameENG.includes(search) ||
      fullNameAMH.includes(search) ||
      registrar.email.toLowerCase().includes(search) ||
      registrar.phoneNumber.includes(search) ||
      registrar.username.toLowerCase().includes(search)
    );
  });

  if (loadingList) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Loading registrars...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <AlertCircle className="h-16 w-16 text-red-500" />
        <p className="text-xl font-medium text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
        <Button
          onClick={fetchRegistrars}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-5 w-5" />
          Retry Loading
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-gray-100">
          Registrar Profiles
        </h1>
        <div className="w-full sm:w-72">
          <Label htmlFor="search" className="text-gray-700 dark:text-gray-300">
            Search registrars
          </Label>
          <Input
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Name, email, phone or username..."
            className="mt-1 border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-gray-500"
          />
        </div>
      </div>

      {filteredRegistrars.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No registrars found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegistrars.map((registrar) => {
            const fullNameENG = `${registrar.firstNameEnglish} ${registrar.lastNameEnglish}`;
            const initials = `${registrar.firstNameEnglish[0] || ""}${registrar.lastNameEnglish[0] || ""
              }`.toUpperCase();

            return (
              <Card
                key={registrar.id}
                className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <RegistrarAvatar
                    id={registrar.id}
                    fullName={fullNameENG}
                    initials={initials}
                  />
                  <CardTitle className="mt-4 text-xl text-blue-600 dark:text-gray-100">
                    {fullNameENG}
                  </CardTitle>
                  <CardDescription className="text-base mt-1 text-gray-600 dark:text-gray-400">
                    {registrar.firstNameAmharic} {registrar.lastNameAmharic}
                  </CardDescription>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <Badge variant={registrar.enabled ? "secondary" : "destructive"}>
                      {registrar.enabled ? "Active" : "Disabled"}
                    </Badge>
                    {registrar.hasNationalId && (
                      <Badge variant="outline" className="border-blue-300 text-blue-600">
                        ID Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="truncate">{registrar.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>{registrar.phoneNumber}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-50 dark:border-gray-700">
                    <div className="flex justify-center flex-wrap gap-2">
                      <p className="text-xs font-medium text-gray-500 w-full mb-2">
                        Username: {registrar.username}
                      </p>
                      {registrar.hasNationalId && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 h-8 text-xs border-blue-200"
                          onClick={() => fetchNationalId(registrar.id)}
                        >
                          <FileText className="h-3 w-3" />
                          View National ID
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* National ID Visualization Modal */}
      <Dialog open={idModalOpen} onOpenChange={setIdModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-blue-600">National ID Document</DialogTitle>
            <DialogDescription>
              Displaying the uploaded national ID for registrar ID: {idModalId}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-blue-100 rounded-lg p-4 bg-gray-50">
            {loadingId ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-sm font-medium text-gray-600">Fetching document...</p>
              </div>
            ) : idPhotoUrl ? (
              <img
                src={idPhotoUrl}
                alt="National ID"
                className="max-w-full max-h-[60vh] object-contain shadow-md rounded"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-gray-400">
                <AlertCircle className="h-12 w-12" />
                <p className="text-sm font-medium">Failed to load ID document</p>
                <Button variant="outline" size="sm" onClick={() => idModalId && fetchNationalId(idModalId)}>
                  Retry
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="secondary" onClick={() => setIdModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
