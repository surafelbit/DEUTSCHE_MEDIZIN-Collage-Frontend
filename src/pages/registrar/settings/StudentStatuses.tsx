import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaSearch } from "react-icons/fa";
import endPoints from "@/components/api/endPoints";
import apiService from "@/components/api/apiService";
import { clearCacheForUrl } from "@/components/api/cacheService";

interface StudentStatus {
  id: number;
  statusName: string;
}

const StudentStatuses = () => {
  const [statuses, setStatuses] = useState<StudentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all student statuses on mount
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.get(endPoints.studentStatus);
        console.log(response, "response");
        // Handle both array and object response formats
        const statusesData = Array.isArray(response) ? response : response?.data || [];
        setStatuses(statusesData);
      } catch (err: any) {
        setError(err.response?.data?.message || err.response?.data?.error || "Failed to load student statuses");
      } finally {
        setLoading(false);
      }
    };
    fetchStatuses();
  }, []);

  // Create single status
  const createStatus = async (statusName: string): Promise<StudentStatus> => {
    const trimmed = statusName.trim();
    if (!trimmed) throw new Error("Status name is required");

    setSaving(true);
    setError(null);
    try {
      const response = await apiService.post(`${endPoints.studentStatus}/single`, {
        id: null,
        statusName: trimmed,
      });
      
      // Fetch the updated list after creating
      const fetchResponse = await apiService.get(endPoints.studentStatus);
      const updatedStatuses = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];
      setStatuses(updatedStatuses);
      
      // Return the newly created status (find it by name)
      const newStatus = updatedStatuses.find((s: StudentStatus) => s.statusName === trimmed);
      await clearCacheForUrl(endPoints.studentStatus);
      return newStatus || { id: Date.now(), statusName: trimmed };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Failed to create status";
      setError(msg);
      throw new Error(msg);
    } finally {
      setSaving(false);
    }
  };

  // Update
  const updateStatus = async (id: number, statusName: string): Promise<void> => {
    const trimmed = statusName.trim();
    if (!trimmed) throw new Error("Status name is required");

    setSaving(true);
    setError(null);
    try {
      await apiService.put(`${endPoints.studentStatus}/${id}`, {
        id: id,
        statusName: trimmed,
      });
      
      // Update local state
      setStatuses((prev) => prev.map((s) => (s.id === id ? { ...s, statusName: trimmed } : s)));
      await clearCacheForUrl(endPoints.studentStatus);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Failed to update status";
      setError(msg);
      throw new Error(msg);
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const deleteStatus = async (id: number): Promise<void> => {
    setSaving(true);
    setError(null);
    try {
      await apiService.delete(`${endPoints.studentStatus}/${id}`);
      setStatuses((prev) => prev.filter((s) => s.id !== id));
      await clearCacheForUrl(endPoints.studentStatus);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Failed to delete student status";
      setError(msg);
      throw new Error(msg);
    } finally {
      setSaving(false);
    }
  };

  // Fixed search - handle null/undefined values safely
  const filteredStatuses = (statuses ?? []).filter((s) => {
    if (!s) return false;
    const nameMatch = s.statusName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const idMatch = s.id?.toString().includes(searchTerm) || false;
    return nameMatch || idMatch;
  });

  return (
    <div className="min-h-screen p-6 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Student Statuses
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Manage student status types ({statuses.length} total)
            </p>
          </div>

          <button
            onClick={() => {
              const modal = document.getElementById("add-modal") as HTMLDialogElement;
              if (modal) modal.showModal();
            }}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlus />
            Add New Status
          </button>
        </div>
      </header>

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100/80 dark:bg-red-900/40 border border-red-300 dark:border-red-700 rounded-xl text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="mb-8 max-w-lg">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or ID..."
            className="w-full pl-12 pr-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-5xl text-indigo-600" />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-8 py-5 text-left font-semibold text-base">
                    ID
                  </th>
                  <th className="px-8 py-5 text-left font-semibold text-base">
                    Status Name
                  </th>
                  <th className="px-8 py-5 text-right font-semibold text-base">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStatuses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-16 text-center text-gray-500 dark:text-gray-400"
                    >
                      {searchTerm
                        ? "No matching statuses found"
                        : "No student statuses yet"}
                    </td>
                  </tr>
                ) : (
                  filteredStatuses.map((status) => (
                    <tr
                      key={status.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                      <td className="px-8 py-5 font-mono font-bold text-indigo-700 dark:text-indigo-400">
                        {status.id}
                      </td>
                      <td className="px-8 py-5 font-medium max-w-xl truncate">
                        {status.statusName}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => {
                              const modal = document.getElementById(`edit-modal-${status.id}`) as HTMLDialogElement;
                              if (modal) modal.showModal();
                            }}
                            className="p-2.5 rounded-lg text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition"
                            title="Edit status"
                          >
                            <FaEdit size={20} />
                          </button>
                          <button
                            onClick={async () => {
                              if (
                                !confirm(
                                  `Delete "${status.statusName}"? This cannot be undone.`
                                )
                              )
                                return;
                              try {
                                await deleteStatus(status.id);
                              } catch (err) {
                                // Error is already set in state
                              }
                            }}
                            disabled={saving}
                            className="p-2.5 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 transition disabled:opacity-50"
                            title="Delete status"
                          >
                            <FaTrash size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Modal - Centered */}
      <dialog 
        id="add-modal" 
        className="fixed inset-0 w-full h-full backdrop:bg-black/60 backdrop-blur-sm bg-transparent"
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <AddEditModalContent
          title="Add New Student Status"
          initialValue=""
          onSubmit={createStatus}
          onClose={() => {
            const modal = document.getElementById("add-modal") as HTMLDialogElement;
            if (modal) modal.close();
          }}
          saving={saving}
        />
      </dialog>

      {/* Edit Modals – one per status */}
      {statuses.map((status) => (
        <dialog
          key={status.id}
          id={`edit-modal-${status.id}`}
          className="fixed inset-0 w-full h-full backdrop:bg-black/60 backdrop-blur-sm bg-transparent"
          style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <AddEditModalContent
            title="Edit Student Status"
            initialValue={status.statusName}
            idInfo={`ID: ${status.id}`}
            onSubmit={(name) => updateStatus(status.id, name)}
            onClose={() => {
              const modal = document.getElementById(`edit-modal-${status.id}`) as HTMLDialogElement;
              if (modal) modal.close();
            }}
            saving={saving}
          />
        </dialog>
      ))}
    </div>
  );
};

// Reusable modal form component
interface ModalProps {
  title: string;
  initialValue: string;
  idInfo?: string;
  onSubmit: (name: string) => Promise<any>;
  onClose: () => void;
  saving: boolean;
}

const AddEditModalContent = ({
  title,
  initialValue,
  idInfo,
  onSubmit,
  onClose,
  saving,
}: ModalProps) => {
  const [name, setName] = useState(initialValue);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      await onSubmit(name);
      onClose();
      setName("");
    } catch (err: any) {
      setFormError(err.message || "Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-center mb-6">
          {title}
        </h3>

        {idInfo && (
          <p className="text-center text-sm font-mono text-gray-600 dark:text-gray-400 mb-6">
            {idInfo}
          </p>
        )}

        {formError && (
          <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700 rounded-lg text-red-800 dark:text-red-200 text-center">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Active, Inactive, Graduated, Suspended"
            className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            maxLength={100}
            required
            autoFocus
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-semibold transition text-gray-900 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving && <FaSpinner className="animate-spin" />}
              {saving ? "Saving..." : title.includes("Add") ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentStatuses;