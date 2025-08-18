// "use client";

// import type React from "react";

// import { useState } from "react";

// export default function SignInPage() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle signin logic here
//     console.log("Sign in attempt:", formData);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-6">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
//             Sign In
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Please enter your credentials to access your account.
//           </p>
//         </div>

//         {/* Sign In Form */}
//         <section className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
//             Account Credentials
//           </h3>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Username Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
//                 Username:
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                 placeholder="Enter your username"
//               />
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
//                 Password:
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                 placeholder="Enter your password"
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Sign In
//               </button>
//             </div>
//           </form>

//           {/* Additional Links */}
//           <div className="mt-6 text-center">
//             <a
//               href="#"
//               className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
//             >
//               Forgot your password?
//             </a>
//           </div>
//         </section>
//       </div>
//     </div>

//   );
// }
// "use client";

// import type React from "react";

// export default function SignInPage() {
//
import DarkVeil from "@/designs/DarkVeil";
import { useState } from "react";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempt:", formData);
  };

  return (
    <div className="relative min-h-screen w-screen bg-gray-50 dark:bg-gray-900 overflow-auto overflow-x-hidden">
      {/* Dark mode fixed background */}
      <div className="hidden dark:block fixed inset-0">
        <DarkVeil className="w-full h-full object-cover" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-16 pb-16 space-y-12 max-w-screen-lg px-4">
        {/* Optional page header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Welcome
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Please sign in to continue.
          </p>
        </div>

        {/* Multiple Form Sections */}

        <section className="w-full max-w-md border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Account Credentials
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <a
              href="#"
              className="block text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot your password?
            </a>
            <a
              href="/"
              className="inline-block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Back to Home
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
