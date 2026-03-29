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
import { Mail, Phone, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import apiClient from "@/components/api/apiClient";
import endPoints from "@/components/api/endPoints";

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

export default function RegistrarProfile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [registrars, setRegistrars] = useState<RegistrarListItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-700"
              >
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-blue-100 dark:border-blue-900">
                    {registrar.photo ? (
                      <AvatarImage
                        src={`data:image/jpeg;base64,${registrar.photo}`}
                        alt={fullNameENG}
                      />
                    ) : (
                      <AvatarFallback className="text-2xl bg-blue-600 text-white">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
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
                      <Badge variant="outline">ID Verified</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>{registrar.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>{registrar.phoneNumber}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-50 dark:border-gray-700 text-xs">
                    <span className="font-medium">Username: {registrar.username}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
