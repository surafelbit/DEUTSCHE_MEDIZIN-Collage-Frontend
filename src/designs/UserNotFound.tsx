export default function UserNotFound({ username }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-center px-4">
      {/* SVG Illustration */}
      <svg
        className="w-40 h-40 mb-6"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="currentColor"
          strokeWidth="4"
          className="text-red-400 dark:text-red-600"
        />
        <line
          x1="20"
          y1="20"
          x2="44"
          y2="44"
          stroke="currentColor"
          strokeWidth="4"
          className="text-red-400 dark:text-red-600"
        />
        <line
          x1="44"
          y1="20"
          x2="20"
          y2="44"
          stroke="currentColor"
          strokeWidth="4"
          className="text-red-400 dark:text-red-600"
        />
      </svg>

      {/* Text */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        User Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        We couldn’t find a user with the name{" "}
        <span className="font-semibold">User</span>.
      </p>

      {/* Go Back button */}
      <button
        className="
            px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow
            dark:bg-blue-400 dark:hover:bg-blue-500
            transition
          "
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
}
