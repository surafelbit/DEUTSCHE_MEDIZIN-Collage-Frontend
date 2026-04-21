import { useState, useEffect, useRef } from "react";

interface Course {
  id: number;
  ccode: string;
  ctitle: string;
}

interface PrerequisiteSelectorProps {
  availableCourses: Course[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export default function PrerequisiteSelector({
  availableCourses,
  selectedIds,
  onChange,
}: PrerequisiteSelectorProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter courses based on search
  const filteredCourses = availableCourses.filter(
    (c) =>
      c.ccode.toLowerCase().includes(search.toLowerCase()) ||
      c.ctitle.toLowerCase().includes(search.toLowerCase()),
  );

  // Toggle a course selection
  const toggleCourse = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Input area with selected badges */}
      <div
        className="border-2 border-gray-200 dark:border-gray-600 rounded-lg p-2 min-h-[80px] bg-white dark:bg-gray-800 cursor-text"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-wrap gap-1">
          {selectedIds.map((id) => {
            const course = availableCourses.find((c) => c.id === id);
            if (!course) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
              >
                {course.ccode} – {course.ctitle}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCourse(id);
                  }}
                  className="hover:text-blue-600 ml-1"
                >
                  ×
                </button>
              </span>
            );
          })}
          <input
            type="text"
            placeholder="Add Pre-requisite courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[100px] outline-none bg-transparent text-sm"
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCourses.length === 0 ? (
            <div className="p-2 text-gray-500 text-sm">No courses found</div>
          ) : (
            filteredCourses.map((course) => (
              <label
                key={course.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(course.id)}
                  onChange={() => toggleCourse(course.id)}
                  className="rounded"
                />
                <span className="text-sm">
                  <span className="font-mono font-bold">{course.ccode}</span> –{" "}
                  {course.ctitle}
                </span>
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
}
