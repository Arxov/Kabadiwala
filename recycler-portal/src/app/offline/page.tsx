export default function OfflineFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center p-8 bg-white rounded-lg shadow max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">You are Offline</h1>
        <p className="text-gray-600 mb-6">
          It looks like your internet connection is patchy. But don't worry! 
          You can still view cached lots and prepare quotes offline. 
          Your actions will sync automatically when you reconnect.
        </p>
        <a 
          href="/" 
          className="inline-block bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
