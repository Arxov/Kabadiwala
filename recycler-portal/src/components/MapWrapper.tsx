"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js/Webpack
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MapWrapper({ lots }: { lots: any[] }) {
  return (
    <div className="h-[450px] w-full rounded-2xl overflow-hidden glass-panel border border-slate-700/50 relative z-0 mb-12 shadow-xl shadow-black/50">
      <MapContainer 
        center={[18.5204, 73.8567]} // Pune center point
        zoom={11} 
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ background: '#0f172a' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        {lots.map((lot, idx) => {
          // If no coords exist, use random coords around Pune for SIH prototype
          const lat = lot.location_lat || 18.5204 + (Math.random() - 0.5) * 0.15;
          const lng = lot.location_lng || 73.8567 + (Math.random() - 0.5) * 0.15;
          
          return (
            <Marker key={lot.id || idx} position={[lat, lng]} icon={icon}>
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-base mb-1 text-slate-800">{lot.material_type || 'E-Waste Material'}</h3>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-semibold text-emerald-600">{lot.estimated_weight_kg} kg</span>
                    <span className="font-bold">₹{lot.estimated_value_inr?.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-1.5 rounded transition">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  );
}
