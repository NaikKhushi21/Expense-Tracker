import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await axios.get(`${API_URL}/expenses`);
    setExpenses(response.data);
  };

  const addExpense = async () => {
    if (!description || !amount || !category) return;
    await axios.post(`${API_URL}/expense`, { description, amount, category });
    setDescription("");
    setAmount("");
    setCategory("");
    fetchExpenses();
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
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
        <select className="border p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addExpense}>
          Add Expense
        </button>
      </div>

      <h3 className="text-xl font-bold mt-6">Your Expenses</h3>
      <ul className="mt-4 space-y-2">
        {expenses.map((expense) => (
          <li key={expense._id} className="p-4 bg-gray-100 flex justify-between">
            {expense.description} - ${expense.amount} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
