export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div
          className="
            absolute border-4 rounded-full w-16 h-16 animate-spin
            border-blue-500 border-t-transparent
            dark:border-white dark:border-t-transparent
          "
        ></div>
        {/* Middle Ring */}
        <div
          className="
            absolute border-4 rounded-full w-12 h-12 top-2 left-2 animate-spin-slow
            border-blue-400 border-t-transparent
            dark:border-gray-300 dark:border-t-transparent
          "
        ></div>
        {/* Inner Ring */}
        <div
          className="
            absolute border-4 rounded-full w-8 h-8 top-4 left-4 animate-spin
            border-blue-300 border-t-transparent
            dark:border-gray-200 dark:border-t-transparent
          "
        ></div>
      </div>
    </div>
  );
}
