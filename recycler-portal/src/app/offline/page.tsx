"use client";

export default function OfflineFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="gradient-card p-12 rounded-2xl text-center max-w-md w-full animate-fade-in-scale">
        {/* Animated wifi-off icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/10 flex items-center justify-center animate-float">
          <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a5 5 0 01-.354-7.005L12 12m0 0l-4.95-4.95M12 12l4.95 4.95M2 2l20 20" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-extrabold text-white mb-3">You&apos;re Offline</h1>
        <p className="text-slate-400 text-base leading-relaxed mb-8">
          Your internet connection is patchy — but don&apos;t worry! 
          You can still view cached lots and prepare quotes offline. 
          Everything syncs automatically when you reconnect.
        </p>
        
        <div className="flex flex-col gap-3">
          <a 
            href="/" 
            className="glass-button text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return Home
          </a>
          <button 
            onClick={() => window.location.reload()}
            className="glass-button-outline py-3 rounded-xl font-semibold text-sm"
          >
            Try Again
          </button>
        </div>

        {/* Offline indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-xs font-medium text-slate-600">Offline Mode Active</span>
        </div>
      </div>
    </div>
  );
}
