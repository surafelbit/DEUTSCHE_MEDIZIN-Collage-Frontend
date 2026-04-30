"use client";
import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FileText,
  Loader2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Printer,
  Download,
} from "lucide-react";
import apiService from "@/components/api/apiService";
import apiClient from "@/components/api/apiClient";
import endPoints from "@/components/api/endPoints";
import { useToast } from "@/hooks/use-toast";

interface FormTemplate {
  id: number;
  name: string;
  description: string;
  forRoles: string[];
  createdAt: string;
  updatedAt: string;
  isDownloadable?: boolean; 
}

// Academic policies 
const policies = [
  {
    section: "1. Readmission",
    rules: [
      "A student who has been dismissed for good due to academic deficiencies cannot seek readmission into the programme from which he has been dismissed",
      "A student who is subject to academic dismissal cannot claim readmission as a matter of right",
      "A student may apply for re-admission at least after one semester following withdrawal from the College except for CEP students who may apply for readmission at any time",
      "A student may be readmitted after academic dismissal only when all of the following are fulfilled:",
      " • A student whose academic status is dismissed but allowed to repeat deficient modules/courses may be readmitted following withdrawal from the College",
      " • Space is available in the programme and there exists a likelihood that the student will raise his grade point to the required level after removing any deficiencies which should not take more than two consecutive semesters",
      " • If the maximum duration of stay in the programme has not expired or is not likely to expire before the completion of the remaining courses of study",
      "A student who officially withdraws due to personal reasons can be readmitted if the maximum duration of stay in the programme has not expired or is not likely to expire before the completion of the remaining courses of study",
      "An academically dismissed student, who is re-admitted and allowed to repeat a course or courses in a given semester or, in case of part-time regular and CEP a maximum of two consecutive semesters, shall be dismissed for good for not attaining good academic standing upon determination of status",
      "Readmission is permitting a student dismissed for academic reasons or withdrew for non-academic reasons to attend a program for the second time. Readmission will be allowed subject to the availability of space",
      "No students, who has withdrawn for academic and non-academic reasons, shall claim readmission as a matter of right",
      "Student who drop out or withdraw officially without earning grade report for the registered courses or who have not completed courses may request for readmission to the department they withdrew from",
      "All cases of readmission are possible if the previous records of the student fit with the present curriculum. Readmission case shall be screened by the respective departments",
      "When there are changes in curricula, the status of a student has to be determined in accordance with the curriculum that is in use at the time of his/her application for readmission",
    ],
  },
  {
    section: "2. Course ADD/DROP and REPEAT",
    rules: [
      "In accordance with the permission of the concerned department, a student may be allowed to add and/or drop courses indicated on his/her original registration form within the time period specified on the academic calendar of the college",
      "Adding and/or dropping of courses shall be treated as per the College's academic calendar and shall be processed and finalized by the student in consultation with the academic advisor or course team leader, or Department Head before the deadline set on the academic calendar of the respective year",
      "Adding courses shall be allowed if the class in which the student would like to enroll is not full upon adding of courses",
      "The student should complete add and/or drop procedure not greater than a time period of one week after the first day of classes",
      "A student should go through discussions with his/her department head and concerned college deans with regard to the repercussions or consequences of dropping and/or adding of a course(s) on the load of his/her studying and the impact on the duration of training, etc",
      "Students may be forced to drop courses in case of exigencies preventing the programme/Department to offer the course provided the Office of Registrar is duly communicated",
      "Students in good academic standing shall repeat only courses with 'F' or 'FAIL' grades",
      "A student shall not be allowed to repeat a course which has not been used for status determination. However, a course with 'FAIL' grade may be repeated at any semester",
      "Any readmitted student may be allowed to repeat courses in which he scored 'C-' or 'D' or 'F' grades, except first year first semester student who may be allowed to repeat courses in which he scored 'D' or 'F' grades",
    ],
  },
];

export default function FormsCenter() {
  const [forms, setForms] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewForm, setPreviewForm] = useState<FormTemplate | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMyFormTemplates();
  }, []);

  useEffect(() => {
    const blockPrintAndSave = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
        e.preventDefault();
        e.stopPropagation();
        toast({
          title: "Action Disabled",
          description: "Printing and saving are not allowed in read-only mode.",
          variant: "destructive",
        });
        return false;
      }
    };
    
    if (previewForm) {
      window.addEventListener('keydown', blockPrintAndSave);
      return () => window.removeEventListener('keydown', blockPrintAndSave);
    }
  }, [previewForm]);

  const fetchMyFormTemplates = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(endPoints.myFormTemplates);
      setForms(response);
    } catch (error: any) {
      console.error("Error fetching form templates:", error);

      if (error.response) {
        const errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          "Failed to load form templates";

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (error.request) {
        toast({
          title: "Network Error",
          description:
            "Unable to connect to the server. Please check your internet connection.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewForm = async (form: FormTemplate) => {
    try {
      setPreviewForm(form);
      setPreviewLoading(true);

      const response = await apiClient.get(
        endPoints.downloadFormTemplate(form.id),
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error: any) {
      console.error("Error previewing form:", error);

      if (error.response?.status === 403) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to view this form",
          variant: "destructive",
        });
      } else if (error.response?.status === 404) {
        toast({
          title: "Not Found",
          description: "The requested form could not be found.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Preview Failed",
          description: "An error occurred while loading the form for preview.",
          variant: "destructive",
        });
      }
      setPreviewForm(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const closePreview = () => {
    if (previewUrl) {
      window.URL.revokeObjectURL(previewUrl);
    }
    setPreviewForm(null);
    setPreviewUrl(null);
  };

  const formatFormName = (name: string) => {
    return name
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleDownloadForm = async (form: FormTemplate) => {
  try {
    const response = await apiClient.get(
      endPoints.downloadFormTemplate(form.id),
      {
        responseType: "blob",
      },
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formatFormName(form.name)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your form is being downloaded.",
    });
  } catch (error: any) {
    console.error("Error downloading form:", error);
    toast({
      title: "Download Failed",
      description: "An error occurred while downloading the form.",
      variant: "destructive",
    });
  }
};

const handlePrintForm = () => {
  if (previewUrl) {
    const printWindow = window.open(previewUrl, '_blank');
    printWindow?.focus();
    toast({
      title: "Print Window Opened",
      description: "Please use the print dialog in the new window.",
    });
  }
};

  // Disable keyboard shortcuts for print and save
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Disable Ctrl+P, Cmd+P (Print)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      toast({
        title: "Printing Disabled",
        description: "Printing is not allowed for this form. Please contact the administration if you need a physical copy.",
        variant: "destructive",
      });
    }
    // Disable Ctrl+S, Cmd+S (Save)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      toast({
        title: "Saving Disabled",
        description: "Saving is not allowed for this form.",
        variant: "destructive",
      });
    }
  };

  // Prevent context menu (right-click)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Actions Disabled",
      description: "Download, save, and print options are disabled for this form.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Forms Center</h1>
          <p className="text-muted-foreground mt-2">
            View and access all student service forms in one place.
          </p>
        </div>

        {/* Help Button and Policies Section */}
        <Button
          variant="outline"
          onClick={() => setShowPolicies(!showPolicies)}
          className="flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          {showPolicies ? "Hide Policies" : "View Academic Policies"}
          {showPolicies ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {showPolicies && (
        <Card>
          <CardHeader>
            <CardTitle>Academic Policies</CardTitle>
              <CardDescription>
                {loading
                  ? "Loading your available forms..."
                  : forms.length === 0
                    ? "No forms are currently available"
                    : "Click Preview to view the form"}
              </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {policies.map((policy, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-lg mb-3">{policy.section}</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {policy.rules.map((rule, ruleIdx) => (
                      <li
                        key={ruleIdx}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Available Forms</CardTitle>
          <CardDescription>
            {loading
              ? "Loading your available forms..."
              : forms.length === 0
                ? "No forms are currently available"
                : "Click Preview to view the form (Download and printing are disabled)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="mt-2 text-muted-foreground">Loading forms...</p>
            </div>
          ) : forms.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">
                No forms available at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {forms.map((form) => (
                <div
                  key={form.id}
                  className="rounded-lg border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{formatFormName(form.name)}</h3>
                    <Badge variant="default">Available</Badge>
                    <Badge variant={form.isDownloadable ? "secondary" : "outline"} className="text-xs">
                      {form.isDownloadable ? "📥 Downloadable" : "🔒 Read Only"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {form.description || "No description"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For: {form.forRoles.join(", ")} • Updated:{" "}
                    {new Date(form.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                  <Button
                    className="w-full sm:w-auto"
                    variant="outline"
                    onClick={() => handlePreviewForm(form)}
                    disabled={previewLoading}
                  >
                    {previewLoading && previewForm?.id === form.id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Eye className="h-4 w-4 mr-2" />
                    )}
                    Preview
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog - Compatible with Microsoft Edge */}
      <Dialog open={!!previewForm} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent
          className="max-w-[95vw] w-full h-[95vh] p-0 sm:p-6"
          onKeyDown={previewForm?.isDownloadable ? undefined : handleKeyDown}
          onContextMenu={previewForm?.isDownloadable ? undefined : handleContextMenu}
          aria-describedby="preview-description"
        >
          <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-0">
            <DialogTitle>
              Preview: {previewForm ? formatFormName(previewForm.name) : ""}
            </DialogTitle>
            <DialogDescription id="preview-description" className="flex items-center gap-2">
              <span>{previewForm?.isDownloadable ? "You can download and print this form." : "Read-only mode. No downloads or printing allowed."}</span>
              <Badge variant={previewForm?.isDownloadable ? "default" : "destructive"} className="text-xs">
                {previewForm?.isDownloadable ? "Downloadable" : "Read Only"}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 min-h-0 mt-2 px-1 sm:px-2">
            {previewLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="mt-2 text-muted-foreground">Loading preview...</p>
              </div>
            ) : previewUrl ? (
              <iframe
                src={`${previewUrl}${previewForm?.isDownloadable ? '' : '#toolbar=0&navpanes=0&statusbar=0'}`}
                className="w-full h-full rounded-lg"
                style={{ 
                  minHeight: "calc(95vh - 140px)",
                  ...(previewForm?.isDownloadable ? {} : { userSelect: "none", WebkitUserSelect: "none" })
                }}
                title={previewForm?.name}
              >
                <p className="text-muted-foreground text-center p-4">
                  Your browser cannot display PDFs. Please contact support for assistance.
                </p>
              </iframe>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Unable to load preview</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center gap-2 p-4 sm:p-6 pt-2">
            <div className="flex gap-2">
              {previewForm?.isDownloadable && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => previewForm && handleDownloadForm(previewForm)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handlePrintForm}
                    className="flex items-center gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                </>
              )}
            </div>
            <Button variant="default" onClick={closePreview}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}