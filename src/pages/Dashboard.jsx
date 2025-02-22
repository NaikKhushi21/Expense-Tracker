import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Expense Tracker</h1>
      <div className="mt-6 space-x-4">
        <Link to="/expenses" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Manage Expenses</Link>
        <Link to="/summary" className="px-4 py-2 bg-green-500 text-white rounded-lg">View Summary</Link>
      </div>
    </div>
  );
}
