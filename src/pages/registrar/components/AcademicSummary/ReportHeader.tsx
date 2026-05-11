import React from 'react';
import type { ReportHeaderData } from './types';

interface ReportHeaderProps {
  headerData: ReportHeaderData;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ headerData }) => {
  return (
    <div className="w-full flex flex-col mb-4">
      {/* Top Gold Title Strip */}
      <div className="bg-yellow-600 dark:bg-yellow-700 text-white font-bold text-center py-1 uppercase text-sm">
        Official Academic Summary Report
      </div>

      {/* School Info Section */}
      <div className="flex flex-col items-center py-3 border-x border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold uppercase text-gray-900 dark:text-gray-100">DHMC College</h2>
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">Office of the Registrar</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Academic Summary</p>
      </div>

      {/* Academic Info Row */}
      <div className="flex flex-wrap justify-between items-center py-2 px-4 bg-gray-50 dark:bg-gray-900 border-x border-b border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200">
        <div>
          <span className="text-gray-500 dark:text-gray-400 mr-2">Academic Year:</span>
          {headerData.academicYear?.yearGC || '-'} ({headerData.academicYear?.yearCode || '-'})
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400 mr-2">Class Year:</span>
          {headerData.classYearName || '-'}
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400 mr-2">Semester:</span>
          {headerData.semesterName || '-'}
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400 mr-2">Program:</span>
          {headerData.departmentBcysDisplay || '-'}
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
