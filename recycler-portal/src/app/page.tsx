export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-green-800 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Waste Connect | Recycler Portal</h1>
        <div className="space-x-4">
          <button className="hover:text-green-200">Dashboard</button>
          <button className="hover:text-green-200">Lots Browser</button>
          <button className="hover:text-green-200">Handovers</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 mt-8">
        <h2 className="text-3xl font-semibold mb-6">Available Lots in your Area</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">PCB / Motherboard</h3>
                  <p className="text-gray-500 text-sm">Pune, 4.2 km away</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">12.5 kg</span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-700">Estimated value: ₹1600 - ₹2200</p>
                <p className="text-sm text-gray-700">Condition: Good</p>
              </div>
              
              <button className="w-full bg-green-600 text-white py-2 rounded shadow hover:bg-green-700 transition">
                Send Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
