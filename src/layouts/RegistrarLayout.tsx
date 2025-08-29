"use client";

import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  LogOut,
  Layers,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function RegistrarLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Initial check: if large screen (≥ 1024px), open sidebar
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    // Update when resizing
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigation = [
    { name: "Dashboard", href: "/registrar/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/registrar/applications", icon: FileText },
    { name: "Students", href: "/registrar/students", icon: Users },
    { name: "Departments", href: "/registrar/departments", icon: Layers },
    // { name: "Courses", href: "/registrar/courses", icon: BookOpen },
    {
      name: "Scores",
      href: "/registrar/scores",
      icon: ClipboardList,
    },
    { name: "Batches", href: "/registrar/batches", icon: Calendar },
    { name: "Customize Tables", href: "/registrar/tables", icon: Calendar },
  ];
  const [extra, setExtra] = useState(false);

  return (
    <div className=" flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 
              bg-white dark:bg-gray-800 shadow-xl 
              transform transition-transform duration-300 ease-in-out
              border-r border-gray-200 dark:border-gray-700
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-blue-600 shadow-md">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/companylogo.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="text-white">
              <div className="text-sm font-bold">DHFM COLLEGE</div>
              <div className="text-xs opacity-75">Registrar Portal</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded hover:bg-blue-500 transition"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
              <g>
                <path d="M32.6,22.6a1.9,1.9,0,0,0,0,2.8l5.9,6a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L38.8,26H44a2,2,0,0,0,0-4H38.8l2.6-2.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2Z" />
                <path d="M15.4,25.4a1.9,1.9,0,0,0,0-2.8l-5.9-6a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L9.2,22H4a2,2,0,0,0,0,4H9.2L6.6,28.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2Z" />
                <path d="M26,6V42a2,2,0,0,0,4,0V6a2,2,0,0,0-4,0Z" />
                <path d="M22,42V6a2,2,0,0,0-4,0V42a2,2,0,0,0,4,0Z" />
              </g>
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 overflow-y-auto">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname.includes(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={() =>
                    window.innerWidth <= 1024 && setSidebarOpen(false)
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}

            {/* Extra collapsible section */}
            <div className="mt-2 space-y-1">
              <button
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  extra
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => {
                  setExtra(!extra);
                  window.innerWidth <= 1024 && setSidebarOpen(false);
                }}
              >
                <svg
                  className={`mr-3 h-5 w-5 transition-transform duration-200 ${
                    extra ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Something
              </button>

              {extra && (
                <div className="pl-6 space-y-1">
                  <Link
                    to="/something/a1"
                    className={`flex items-center px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      location.pathname.includes("/something/a1")
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-100"
                        : "text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
                    }`}
                    onClick={() =>
                      window.innerWidth <= 1024 && setSidebarOpen(false)
                    }
                  >
                    A1
                  </Link>
                  <Link
                    to="/something/a2"
                    className={`flex items-center px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      location.pathname.includes("/something/a2")
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-100"
                        : "text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
                    }`}
                    onClick={() =>
                      window.innerWidth <= 1024 && setSidebarOpen(false)
                    }
                  >
                    A2
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Footer Sign Out */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 dark:text-gray-300"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      {/* <div className={`inset-0 w-full ${sidebarOpen ? "ml-64 " : "ml-0"}`}> */}
      <div
        className={`inset-0 w-full transition-all duration-300 ${
          sidebarOpen && window.innerWidth >= 1024 ? "ml-64" : "ml-0"
        }`}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className=""
            onClick={() => setSidebarOpen(true)}
          >
            {!sidebarOpen && <Menu className="h-6 w-6" />}{" "}
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Registrar Portal
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">RG</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Registrar
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Academic Records
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
          <div className="mx-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

// import { Outlet, Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/theme-toggle";
// import {
//   GraduationCap,
//   LayoutDashboard,
//   FileText,
//   Users,
//   BookOpen,
//   ClipboardList,
//   Calendar,
//   LogOut,
//   Menu,
// } from "lucide-react";
// import { useState } from "react";

// export default function RegistrarLayout() {
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const navigation = [
//     { name: "Dashboard", href: "/registrar/dashboard", icon: LayoutDashboard },
//     { name: "Applications", href: "/registrar/applications", icon: FileText },
//     { name: "Students", href: "/registrar/students", icon: Users },
//     { name: "Courses", href: "/registrar/courses", icon: BookOpen },
//     {
//       name: "Assessments",
//       href: "/registrar/assessments",
//       icon: ClipboardList,
//     },
//     { name: "Batches", href: "/registrar/batches", icon: Calendar },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 "
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:transform-none lg:flex lg:flex-col`}
//       >
//         <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
//           <div className="flex items-center space-x-2">
//             <GraduationCap className="h-8 w-8 text-white" />
//             <div className="text-white">
//               <div className="text-sm font-bold">DHFM COLLEGE</div>
//               <div className="text-xs opacity-75">Registrar Portal</div>
//             </div>
//           </div>
//         </div>

//         <nav className="mt-8 flex-1">
//           <div className="px-4 space-y-2">
//             {navigation.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                     isActive
//                       ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
//                       : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <item.icon className="mr-3 h-5 w-5" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>
//         </nav>

//         <div className="p-4">
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-gray-600 dark:text-gray-300"
//           >
//             <LogOut className="mr-3 h-5 w-5" />
//             Sign Out
//           </Button>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1">
//         {/* Top bar */}
//         <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:gap-x-6 sm:px-6 lg:px-8">
//           <Button
//             variant="ghost"
//             size="icon"
//             className=""
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//           </Button>

//           <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
//             <div className="flex flex-1 items-center">
//               <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Registrar Portal
//               </h1>
//             </div>
//             <div className="flex items-center gap-x-4 lg:gap-x-6">
//               <ThemeToggle />
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">RG</span>
//                 </div>
//                 <div className="hidden sm:block">
//                   <div className="text-sm font-medium text-gray-900 dark:text-white">
//                     Registrar
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     Academic Records
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Page content */}
//         <main className="py-8">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
