import React from "react";

const SalesTable = () => {
  const data = [
    {
      id: 1,
      product: "Laptop Pro",
      category: "Electronics",
      sales: 120,
      revenue: "$24,000",
      date: "2025-08-01",
    },
    {
      id: 2,
      product: "Wireless Mouse",
      category: "Accessories",
      sales: 350,
      revenue: "$7,000",
      date: "2025-08-02",
    },
    {
      id: 3,
      product: "Smartphone X",
      category: "Electronics",
      sales: 80,
      revenue: "$16,000",
      date: "2025-08-03",
    },
    {
      id: 4,
      product: "Headphones",
      category: "Accessories",
      sales: 200,
      revenue: "$10,000",
      date: "2025-08-04",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sales Report
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50 transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      {item.product}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                      {item.sales}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                      {item.revenue}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-right">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
