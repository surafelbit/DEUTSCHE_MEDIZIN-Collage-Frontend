import React from "react";
import ReportHeader from "./ReportHeader";
import GradeTable from "./GradeTable";
import type { ReportSummary } from "./types";

interface GradeReportProps {
  summary: ReportSummary;
}

const GradeReport: React.FC<GradeReportProps> = ({ summary }) => {
  return (
    <div className="flex flex-col mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <ReportHeader headerData={summary.header} />
      <GradeTable students={summary.students} />

      {/* Footer / Signature Section - Single wrapping row */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-gray-800 dark:text-gray-200">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-semibold text-xs">REGISTRAR:</span>
          <div className="border-b border-gray-400 dark:border-gray-600 w-32"></div>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-semibold text-xs">SIGN:</span>
          <div className="border-b border-gray-400 dark:border-gray-600 w-32"></div>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-semibold text-xs">DATE:</span>
          <div className="border-b border-gray-400 dark:border-gray-600 w-32"></div>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-semibold text-xs">DEAN:</span>
          <div className="border-b border-gray-400 dark:border-gray-600 w-32"></div>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-semibold text-xs">SIGN:</span>
          <div className="border-b border-gray-400 dark:border-gray-600 w-32"></div>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-semibold text-xs">DATE:</span>
          <div className="border-b border-gray-400 dark:border-gray-600 w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default GradeReport;
