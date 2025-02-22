import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const API_URL = "http://localhost:5001";

// Dashboard component: Landing page with navigation links
function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker Dashboard</h1>
      <div className="space-x-4">
        <Link to="/expenses" className="px-4 py-2 bg-blue-500 text-white rounded">
          Manage Expenses
        </Link>
        <Link to="/summary" className="px-4 py-2 bg-green-500 text-white rounded">
          View Summary
        </Link>
      </div>
    </div>
  );
}

// Expenses component: Add, view, edit, and delete expenses
function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/expenses`);
      setExpenses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addExpense = async () => {
    if (!description || !amount || !category) return;
    try {
      await axios.post(`${API_URL}/expense`, { description, amount, category });
      setDescription("");
      setAmount("");
      setCategory("");
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/expense/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const updateExpense = async (id) => {
    try {
      await axios.put(`${API_URL}/expense/${id}`, {
        description: editDescription,
        amount: editAmount,
        category: editCategory,
      });
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Expenses</h2>
      <div className="space-y-4">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addExpense}
        >
          Add Expense
        </button>
      </div>

      <h3 className="text-xl font-bold mt-6">Expense List</h3>
      <ul className="mt-4 space-y-2">
        {expenses.map((expense) => (
          <li key={expense._id} className="p-4 bg-gray-100 flex justify-between items-center">
            {editingId === expense._id ? (
              <div className="flex flex-col space-y-2 w-full">
                <input
                  className="border p-2"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <input
                  className="border p-2"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
                <select
                  className="border p-2"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Bills">Bills</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => updateExpense(expense._id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span>
                  {expense.description} - ${expense.amount} - {expense.category}
                </span>
                <div className="space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setEditingId(expense._id);
                      setEditDescription(expense.description);
                      setEditAmount(expense.amount);
                      setEditCategory(expense.category);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteExpense(expense._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link to="/" className="text-blue-500 underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

// Summary component: View the monthly expense summary
function Summary() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthlyTotal, setMonthlyTotal] = useState(null);

  const fetchSummary = async () => {
    if (!selectedMonth) return;
    try {
      const response = await axios.get(`${API_URL}/summary/${selectedMonth}`);
      setMonthlyTotal(response.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Monthly Summary</h2>
      <select
        className="border p-2 w-full"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Select Month</option>
        {[...Array(12).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={fetchSummary}
      >
        View Summary
      </button>
      {monthlyTotal !== null && (
        <div className="mt-6">
          <h4 className="text-xl font-bold">Total: ${monthlyTotal}</h4>
        </div>
      )}
      <div className="mt-6">
        <Link to="/" className="text-blue-500 underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

// App component: Sets up the routing with a basename for GitHub Pages
function App() {
  return (
    <Router basename="/Expense-Tracker">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
