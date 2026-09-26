"use client";
import { useState, useEffect } from 'react'

interface DashboardStats {
  totalHandoverVolume: number;
  activeRecyclers: number;
  anomaliesDetected: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/admin/dashboard/stats')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-green-700">E-Waste Admin</h1>
        </div>
        <nav className="mt-6">
          <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white bg-green-500 text-white" href="#">
            Dashboard
          </a>
          <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white" href="#">
            Recyclers
          </a>
          <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white" href="#">
            Price Board
          </a>
          <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:text-white" href="#">
            Anomalies
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin User</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
              Logout
            </button>
          </div>
        </header>

        {loading ? (
          <p>Loading stats...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Total Handover Volume</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.totalHandoverVolume.toLocaleString()} kg</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Active Recyclers</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.activeRecyclers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Anomalies Detected</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats?.anomaliesDetected}</p>
              <p className="text-sm text-red-500 mt-1">Requires review</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
