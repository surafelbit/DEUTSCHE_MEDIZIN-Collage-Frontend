import React from 'react';
import ReportHeader from './ReportHeader';
import GradeTable from './GradeTable';
import { ReportSummary } from './types';

interface GradeReportProps {
  summary: ReportSummary;
}

const GradeReport: React.FC<GradeReportProps> = ({ summary }) => {
  return (
    <div className="flex flex-col mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <ReportHeader headerData={summary.header} />
      <GradeTable students={summary.students} />
      
      {/* Footer / Signature Section */}
      <div className="mt-12 flex justify-between px-12 text-sm text-gray-800 dark:text-gray-200">
        <div className="flex flex-col items-center">
          <div className="border-b border-gray-400 dark:border-gray-600 w-48 mb-2"></div>
          <span className="font-semibold">Prepared By</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="border-b border-gray-400 dark:border-gray-600 w-48 mb-2"></div>
          <span className="font-semibold">Registrar Head Signature</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="border-b border-gray-400 dark:border-gray-600 w-48 mb-2"></div>
          <span className="font-semibold">Date & Seal</span>
        </div>
      </div>
    </div>
  );
};

export default GradeReport;
