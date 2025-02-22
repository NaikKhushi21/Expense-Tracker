import { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const API_URL = "http://localhost:5001";

export default function Summary() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthlyTotal, setMonthlyTotal] = useState(null);

  const fetchSummary = async () => {
    if (!selectedMonth) return;
    const response = await axios.get(`${API_URL}/summary/${selectedMonth}`);
    setMonthlyTotal(response.data.total);
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>
      
      <select className="border p-2 w-full" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Select Month</option>
        {[...Array(12).keys()].map(i => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={fetchSummary}>
        View Summary
      </button>

      {monthlyTotal !== null && (
        <div className="mt-6">
          <h4 className="text-lg font-bold">Total: ${monthlyTotal}</h4>
          <BarChart width={300} height={200} data={[{ month: selectedMonth, total: monthlyTotal }]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </div>
      )}
    </div>
  );
}
