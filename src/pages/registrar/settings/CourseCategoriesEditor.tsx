import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaList, FaTh } from "react-icons/fa";

const CourseCategoriesEditor = () => {
  // Initial data for Course Categories
  const initialCategories = [
    { catID: "1", catName: "Science & Technology" },
    { catID: "2", catName: "Engineering" },
    { catID: "3", catName: "Business & Economics" },
    { catID: "4", catName: "Arts & Humanities" },
    { catID: "5", catName: "Health Sciences" },
  ];

  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="min-h-screen p-6 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold bg-blue-500 dark:bg-white bg-clip-text text-transparent animate-gradient">
            DHFM Course Categories Editor
          </h1>
        </div>
      </header>
      <main>
        <CrudSection
          title="Course Categories"
          data={categories}
          setData={setCategories}
        />
      </main>
    </div>
  );
};

const CrudSection = ({ title, data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    catID: "",
    catName: "",
  });
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const itemsPerPage = showAll ? data.length : 10;

  const filteredData = data.filter(
    (item) =>
      item.catID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.catName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [filteredData.length, currentPage, totalPages, showAll]);

  const handleOpenModal = (item = null) => {
    if (item && !window.confirm(`Are you sure you want to edit this category?`))
      return;
    setEditingItem(item);
    setFormData(item ? { ...item } : { catID: "", catName: "" });
    setError("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.catID.trim() || !formData.catName.trim()) {
      setError("Category ID and Category Name are required.");
      return false;
    }
    const existing = data.find(
      (d) =>
        d.catID === formData.catID &&
        (!editingItem || d.catID !== editingItem.catID)
    );
    if (existing) {
      setError("Category ID must be unique.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (
      !editingItem &&
      !window.confirm(`Are you sure you want to add this category?`)
    )
      return;

    if (editingItem) {
      setData(
        data.map((d) => (d.catID === editingItem.catID ? { ...formData } : d))
      );
    } else {
      setData([...data, { ...formData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (catID) => {
    if (
      !window.confirm(
        `Are you sure you want to delete this category? This action cannot be undone.`
      )
    )
      return;
    setData(data.filter((d) => d.catID !== catID));
  };

  return (
    <div className="p-6 rounded-2xl shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white shadow-md"
          >
            <FaPlus /> Add Category
          </button>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800 text-white shadow-md"
          >
            {showAll ? "Paginate" : "Show All"}
          </button>
          <button
            onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
            className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-transform duration-200 transform hover:scale-105 bg-purple-500 dark:bg-purple-700 hover:bg-purple-600 dark:hover:bg-purple-800 text-white shadow-md"
          >
            {viewMode === "table" ? <FaTh /> : <FaList />}{" "}
            {viewMode === "table" ? "Grid View" : "Table View"}
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Categories by ID or name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
      />
      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  Category ID
                </th>
                <th className="p-4 text-left font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  Category Name
                </th>
                <th className="p-4 text-right font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.catID}
                  className="group transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 animate-slide-up"
                >
                  <td className="p-4">{item.catID}</td>
                  <td className="p-4">{item.catName}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 rounded-full transform hover:scale-110 transition-all duration-200 text-yellow-500 dark:text-yellow-400 hover:bg-yellow-600/50 dark:hover:bg-yellow-800/50"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.catID)}
                        className="p-2 rounded-full transform hover:scale-110 transition-all duration-200 text-red-500 dark:text-red-400 hover:bg-red-600/50 dark:hover:bg-red-800/50"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedData.map((item) => (
            <div
              key={item.catID}
              className="p-5 rounded-lg shadow-md group transition-all duration-200 transform hover:scale-105 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 animate-slide-up"
            >
              <h3 className="font-bold text-lg">{item.catID}</h3>
              <p>{item.catName}</p>
              <div className="flex justify-end gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-2 rounded-full transform hover:scale-110 transition-all duration-200 text-yellow-500 dark:text-yellow-400 hover:bg-yellow-600/50 dark:hover:bg-yellow-800/50"
                >
                  <FaEdit className="text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(item.catID)}
                  className="p-2 rounded-full transform hover:scale-110 transition-all duration-200 text-red-500 dark:text-red-400 hover:bg-red-600/50 dark:hover:bg-red-800/50"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!showAll && totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded-lg font-semibold transition-transform duration-200 transform hover:scale-105 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-5 py-2 rounded-lg font-semibold transition-transform duration-200 transform hover:scale-105 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 scale-95 animate-modal-in bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              {editingItem ? "Edit" : "Add"} Category
            </h3>
            {error && (
              <p className="text-red-500 mb-4 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg animate-pulse">
                {error}
              </p>
            )}
            <input
              type="text"
              name="catID"
              value={formData.catID}
              onChange={handleChange}
              placeholder="Category ID (e.g., 1)"
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              name="catName"
              value={formData.catName}
              onChange={handleChange}
              placeholder="Category Name (e.g., Science & Technology)"
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 rounded-lg font-semibold transition-transform duration-200 transform hover:scale-105 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg font-semibold transition-transform duration-200 transform hover:scale-105 bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800 text-white shadow-md"
              >
                {editingItem ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCategoriesEditor;
