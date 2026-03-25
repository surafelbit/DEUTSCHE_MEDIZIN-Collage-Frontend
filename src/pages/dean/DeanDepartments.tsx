import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Calculator,
  Stethoscope,
  HeartPulse,
  BookOpen,
  Pill,
  FlaskConical,
  Building,
  Loader2,
  Download,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import apiService from "@/components/api/apiService";
import endPoints from "@/components/api/endPoints";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Department {
  dptID: number;
  deptName: string;
  totalCrHr: number | null;
  departmentCode: string;
  programModality: {
    modalityCode: string;
    modality: string;
    programLevel: {
      code: string;
      name: string;
      active: boolean;
    };
  };
  programLevel: {
    code: string;
    name: string;
    active: boolean;
  };
}

const getDepartmentTheme = (departmentCode: string) => {
  const themes: Record<string, { icon: any; bg: string; color: string; gradient: string }> = {
    MRT: { icon: Calculator, bg: "bg-blue-50 dark:bg-blue-900/20", color: "text-blue-600 dark:text-blue-400", gradient: "from-blue-600 to-blue-700" },
    MED: { icon: Stethoscope, bg: "bg-red-50 dark:bg-red-900/20", color: "text-red-600 dark:text-red-400", gradient: "from-red-500 to-pink-600" },
    NUR: { icon: HeartPulse, bg: "bg-rose-50 dark:bg-rose-900/20", color: "text-rose-600 dark:text-rose-400", gradient: "from-rose-500 to-rose-600" },
    CS: { icon: BookOpen, bg: "bg-indigo-50 dark:bg-indigo-900/20", color: "text-indigo-600 dark:text-indigo-400", gradient: "from-indigo-600 to-indigo-700" },
    PHARM: { icon: Pill, bg: "bg-emerald-50 dark:bg-emerald-900/20", color: "text-emerald-600 dark:text-emerald-400", gradient: "from-emerald-600 to-emerald-700" },
    BIO: { icon: FlaskConical, bg: "bg-cyan-50 dark:bg-cyan-900/20", color: "text-cyan-600 dark:text-cyan-400", gradient: "from-cyan-600 to-cyan-700" },
    default: { icon: Building, bg: "bg-gray-50 dark:bg-gray-800/40", color: "text-gray-600 dark:text-gray-400", gradient: "from-gray-600 to-gray-700" },
  };
  return themes[departmentCode] || themes.default;
};

const DepartmentCard = ({ dept, onClick }: { dept: Department; onClick: () => void }) => {
  const theme = getDepartmentTheme(dept.departmentCode);
  const Icon = theme.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-700/30 opacity-50 -mr-8 -mt-8 rounded-full" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3 ${theme.bg} ${theme.color} rounded-xl shadow-sm`}>
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900/50 px-2 py-1 rounded-md">
          {dept.departmentCode}
        </span>
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {dept.deptName}
        </h3>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Dept ID: {dept.dptID}
        </p>

        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center text-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Credits</span>
            <span className="font-bold text-gray-900 dark:text-gray-100">{dept.totalCrHr || 0} CrHr</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Modality</span>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-bold rounded">
              {dept.programModality?.modality || "Regular"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Level</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{dept.programLevel?.name || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
      </div>
    </motion.div>
  );
};

export default function DeanDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modality, setModality] = useState("all");
  const [level, setLevel] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get(endPoints.departments);
      setDepartments(response);
    } catch (err: any) {
      console.error("Error fetching departments:", err);
      setError("Failed to load departments. Please try again.");
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return departments.filter((d: Department) => {
      const matchesSearch =
        !search ||
        d.deptName.toLowerCase().includes(search.toLowerCase()) ||
        d.departmentCode.toLowerCase().includes(search.toLowerCase()) ||
        d.dptID.toString().includes(search);
      const matchesModality = modality === "all" || d.programModality?.modality === modality;
      const matchesLevel = level === "all" || d.programLevel?.name === level;
      return matchesSearch && matchesModality && matchesLevel;
    });
  }, [search, modality, level, departments]);

  const levels = useMemo(() => [...new Set(departments.map((d: Department) => d.programLevel?.name).filter(Boolean))], [departments]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 rounded-full"
          />
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
            Loading Departments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <section className="px-8 pt-12 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50" />

        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6 relative z-10">
          <span className="hover:text-blue-600 transition-colors cursor-pointer">German Medicine College</span>
          <ChevronRight className="w-3 h-3" strokeWidth={2} />
          <span className="text-gray-900 dark:text-gray-100">Departments</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                Department Management
              </h1>
              <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                {filtered.length} Departments
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl font-medium leading-relaxed">
              Manage all academic departments, faculty oversight, and course tracking through our centralized curatorial interface.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toast.info("Report export feature coming soon")}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Department
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-8 mb-10 relative z-10">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400 dark:text-gray-100"
              placeholder="Search by name, code or ID..."
              type="text"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl pl-4 pr-10 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 appearance-none min-w-[160px] cursor-pointer"
              >
                <option value="all">All Modalities</option>
                <option value="Regular">Regular</option>
                <option value="Evening">Evening</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            </div>

            <div className="relative">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl pl-4 pr-10 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 appearance-none min-w-[180px] cursor-pointer"
              >
                <option value="all">All Levels</option>
                {levels.map((l: string) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            </div>

            <button className="p-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm">
              <SlidersHorizontal className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      {/* Department Grid */}
      <section className="px-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-20 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6">
                <Building className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                No Departments Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm text-center font-medium">
                We couldn't find any departments matching your current filters. Try adjusting your search or filters.
              </p>
              <button
                onClick={() => { setSearch(""); setModality("all"); setLevel("all"); }}
                className="mt-8 text-blue-600 font-bold uppercase tracking-widest text-[10px] hover:underline"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((dept: Department) => (
                <DepartmentCard
                  key={dept.dptID}
                  dept={dept}
                  onClick={() => navigate(`/dean/departments/${dept.dptID}`)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
